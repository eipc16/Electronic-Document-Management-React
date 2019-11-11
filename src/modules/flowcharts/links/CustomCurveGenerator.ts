import {IPosition} from "@mrblenny/react-flow-chart/src";

const generateNormalPath = (startPos: IPosition, endPos: IPosition, vertical_offset: number, horizontal_offset: number) => {
    const leftToRight = startPos.x < endPos.x;
    const start = leftToRight ? startPos : endPos;
    const end = leftToRight ? endPos : startPos;
    const offset = leftToRight ? vertical_offset : -vertical_offset;

    let horizontal_offset_start, horizontal_offset_end;

    if(!leftToRight) {
        horizontal_offset_start = horizontal_offset;
        horizontal_offset_end = 0;
    } else {
        horizontal_offset_start = 0;
        horizontal_offset_end = horizontal_offset;
    }

    return `M${start.x - horizontal_offset_start},${start.y} 
            L${start.x - horizontal_offset_start},${start.y + offset}
            L${end.x - horizontal_offset_end},${end.y - offset}
            ${end.x - horizontal_offset_end},${end.y}`
};

const getOffsetPath = (startPos: IPosition, endPos: IPosition, offset: number, vertical_offset: number, horizontal_offset: number): string => {
    const leftToRight = startPos.x < endPos.x;
    const start = leftToRight ? startPos : endPos;
    const end = leftToRight ? endPos : startPos;
    const heightOffset = leftToRight ? vertical_offset: -vertical_offset;

    const split = Math.abs(startPos.x - endPos.x) / 2;

    let horizontal_offset_start, horizontal_offset_end;

    if(!leftToRight) {
        horizontal_offset_start = horizontal_offset;
        horizontal_offset_end = 0;
    } else {
        horizontal_offset_start = 0;
        horizontal_offset_end = horizontal_offset;
    }

    return `M${start.x - horizontal_offset_start},${start.y}
            L${start.x - horizontal_offset_start},${start.y + heightOffset}
            L${start.x + split},${start.y + heightOffset}
            L${start.x + split},${end.y - heightOffset}
            L${end.x + horizontal_offset_end},${end.y - heightOffset}
            ${end.x - horizontal_offset_end},${end.y}`
};

export const customCurvePath = (startPos: IPosition, endPos: IPosition, linkType: string): string => {
    if(endPos.y < startPos.y) {
        return getOffsetPath(startPos, endPos, 150, linkType === 'correct' ? 40 : 35, linkType === 'correct' ? 0 : 0);
    }

    return generateNormalPath(startPos, endPos, linkType === 'correct' ? 40 : 35, linkType === 'correct' ? 0 : 0);
};