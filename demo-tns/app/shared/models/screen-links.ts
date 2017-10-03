import { Link } from './link';


export interface ScreenLinks {
    sreenId: number;
    links: Link[];
}

export interface ScreenLinksData {
    [id: number]: ScreenLinks;
}
