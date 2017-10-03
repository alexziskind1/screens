import { Rect } from './geometry';

export interface Link {
    id: number;
    destinationScreenId: number;
    rect: Rect;
}
