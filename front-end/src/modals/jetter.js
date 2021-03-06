const FIXED = "fixed";
const PX = "px";

function brew({terms, mixins, brewer = brew}) {
    return Object.freeze({
        jet: ({left, top}) => brewer({terms: {...terms, left, top}, mixins, brewer}),
        get_position: () => FIXED,
        get_left: () => terms.left,
        get_top: () => terms.top,
        get_width: () => terms.width,
        get_height: () => terms.height,
    });
}

function left_when_middle_is({x, half_width}) {
    return x - half_width + PX;
}

function top_when_middle_is({y, half_height}) {
    return y - half_height + PX;
}

export {
    brew,
    left_when_middle_is,
    top_when_middle_is,
}