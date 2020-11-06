import {BaseFrame, ContentFrame} from "./";
import {Pin, Jet, Jetter, Whole} from "../../modals";
import {App} from "../app";
import {DefaultNodeFrame} from "../node-frame";
import {Me} from "../../helpers";

const SPACE = " ";
const FULL_FRAME_STYLE_NAME = "full-frame";
const NODE_FRAME_STYLE_NAME = "node-frame";
const FULL_NODE_STYLE_NAMES = FULL_FRAME_STYLE_NAME + SPACE + NODE_FRAME_STYLE_NAME;

function brew({mode, model}) {
    return ContentFrame.brew({
        terms: {
            id: FULL_FRAME_STYLE_NAME + Date.now(),
            class_name: FULL_NODE_STYLE_NAMES,
            mode,
            model,
            arcs: [],
        },
        mixins: [Whole.brew]
    });
}

function assign_full_handlers({app_data, full_frame, setter}) {
    const new_full_frame = full_frame.with_name_on_input({
        name_on_input: field_on_input({full_frame, setter, method_name: "with_name", argument_name: "name"})
    }).with_content_on_input({
        content_on_input: field_on_input({full_frame, setter, method_name: "with_content", argument_name: "content"})
    });
    if (app_data.mode === App.PIN_MODE) {
        return new_full_frame.with_on_click({
            on_click: (event) => {
                Pin.full_pin_on_click({full_frame: new_full_frame, event,
                    model: BaseFrame.brew({
                        model: DefaultNodeFrame.brew(),
                        left: Jetter.left_when_middle_is({x: event.pageX, half_width: BaseFrame.HALF_BASE_WIDTH}),
                        top: Jetter.top_when_middle_is({y: event.pageY, half_height: BaseFrame.HALF_BASE_HEIGHT}),
                    }),
                    setter});
            }
        });
    } else if (app_data.mode === App.PLUCK_MODE) {
        return new_full_frame;
    } else if (app_data.mode === App.JET_MODE) {
        return new_full_frame.with_on_mouse_move({
            on_mouse_move: (event) => {
                Jet.full_jet_on_mouse_move({app_data, event})
            }})
            .with_on_mouse_up({
                on_mouse_up: () => {
                    Jet.full_jet_on_mouse_up({app_data, full_frame: new_full_frame, setter})
                }
            });
    }
}

function field_on_input({full_frame, setter, method_name, argument_name}) {
    return ({value}) => {
        const argument = {};
        argument[argument_name] = value;
        Me.return_state({
            state: full_frame.with_model({
                model: full_frame.get_model()[method_name](argument)
            }),
            setter
        });
    }
}

export {
    brew,
    assign_full_handlers,
}
