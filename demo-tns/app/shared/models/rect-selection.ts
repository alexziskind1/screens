import { Point, Rect, Size } from './geometry';

export class RectSelection {
    private startPoint: Point = { x: 0, y: 0 };
    public rect: Rect;

    public get height() {
        return this.rect.size.height;
    }
    public get width() {
        return this.rect.size.width;
    }
    public get top() {
        return this.rect.origin.y;
    }
    public get left() {
        return this.rect.origin.x;
    }

    constructor(position: Point = { x: 0, y: 0 }, size: Size = { width: 0, height: 0 }) {
        this.rect = {
            origin: position,
            size: size
        };

        this.startPoint.x = position.x;
        this.startPoint.y = position.y;
    }

    public static createUpdatedRectSelection(fromRectSelection: RectSelection, position: Point): RectSelection {
        const width = Math.abs(position.x - fromRectSelection.startPoint.x);
        const height = Math.abs(position.y - fromRectSelection.startPoint.y);
        const left = (position.x - fromRectSelection.startPoint.x < 0) ? position.x : fromRectSelection.startPoint.x;
        const top = (position.y - fromRectSelection.startPoint.y < 0) ? position.y : fromRectSelection.startPoint.y;

        const newRectSelection = new RectSelection();
        newRectSelection.startPoint = fromRectSelection.startPoint;
        newRectSelection.rect = {
            origin: { x: left, y: top },
            size: { height: height, width: width }
        };
        return newRectSelection;
    }

    public updateSelection(position: Point) {
        const width = Math.abs(position.x - this.startPoint.x);
        const height = Math.abs(position.y - this.startPoint.y);
        const left = (position.x - this.startPoint.x < 0) ? position.x : this.startPoint.x;
        const top = (position.y - this.startPoint.y < 0) ? position.y : this.startPoint.y;

        this.rect = {
            origin: { x: left, y: top },
            size: { height: height, width: width }
        };
    }
}

