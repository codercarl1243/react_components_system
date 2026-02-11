import type { OlMarker, UlMarker, ValidListTag, ValidSpacing } from "./types";

export const ulMarkerClasses: Record<UlMarker, string> = {
    default: 'list--circle',
    circle: 'list--circle',
    disc: 'list--disc',
    square: 'list--square',
    none: 'list--none'
};

export const olMarkerClasses: Record<OlMarker, string> = {
    default: 'list--decimal',
    decimal: 'list--decimal',
    'lower-alpha': 'list--lower-alpha',
    'upper-alpha': 'list--upper-alpha',
    'lower-roman': 'list--lower-roman',
    'upper-roman': 'list--upper-roman',
    none: 'list--none'
};

export const getMarkerClass = (listType: ValidListTag, marker: OlMarker | UlMarker) => {
    if (listType === "dl") {
        return 'list--definition pl-0 flow-4'; // no marker class
    }
    if (listType === "ol") {
        return olMarkerClasses[marker as OlMarker] ?? olMarkerClasses.default;
    }
    return ulMarkerClasses[marker as UlMarker] ?? ulMarkerClasses.default;
}

export const getSpacingClass = (spacing: ValidSpacing) => {
    return {
        tight: 'list--tight',
        normal: 'list--normal',
        loose: 'list--loose'
    }[spacing]
}
