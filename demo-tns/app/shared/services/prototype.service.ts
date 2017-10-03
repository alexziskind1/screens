import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ScreenLinksData } from '../models/screen-links';
import { Link } from '../models/link';

const localStorageKey = 'PROT_KEY';

@Injectable()
export class PrototypeService {

    public allScreenLinkData: ScreenLinksData = {};

    constructor(private storageService: StorageService) { }

    public getAllLinksForScreenId(screenId: number): Link[] {
        const data = this.storageService.getItem<ScreenLinksData>(localStorageKey);
        if (data) {
            this.allScreenLinkData = data;
        }
        const sl = this.allScreenLinkData[screenId];
        if (sl) { return sl.links; } else { return []; }
    }

    public getNextLinkId(screenId: number): number {
        const links = this.getAllLinksForScreenId(screenId);
        if (links.length === 0) {
            return 1;
        } else {
            const maxId = Math.max(...links.map(l => l.id));
            return maxId + 1;
        }
    }

    public addScreenLink(screenId: number, link: Link) {
        const sls = this.allScreenLinkData[screenId];
        if (sls) {
            this.allScreenLinkData[screenId] = {
                sreenId: screenId,
                links: [...sls.links, link]
            };
        } else {
            this.allScreenLinkData[screenId] = {
                sreenId: screenId,
                links: [link]
            };
        }
        this.storageService.setItem<ScreenLinksData>(localStorageKey, this.allScreenLinkData);
    }

    public updateScreenLink(screenId: number, link: Link) {
        const sls = this.allScreenLinkData[screenId];
        const index = sls.links.findIndex(l => l.id === link.id);
        sls.links = [
            ...sls.links.slice(0, index),
            Object.assign({}, link, { destinationScreenId: link.destinationScreenId }),
            ...sls.links.slice(index + 1)
        ];
        this.storageService.setItem<ScreenLinksData>(localStorageKey, this.allScreenLinkData);
    }

    public deleteScreenLink(screenId: number, linkId: number) {
        const sls = this.allScreenLinkData[screenId];
        const index = sls.links.findIndex(l => l.id === linkId);
        sls.links = [
            ...sls.links.slice(0, index),
            ...sls.links.slice(index + 1)
        ];
        if (sls.links.length === 0) {
            delete this.allScreenLinkData[screenId];
        }
        this.storageService.setItem<ScreenLinksData>(localStorageKey, this.allScreenLinkData);
    }

    public deleteAll() {
        this.storageService.removeItem(localStorageKey);
        this.allScreenLinkData = {};
    }

}

