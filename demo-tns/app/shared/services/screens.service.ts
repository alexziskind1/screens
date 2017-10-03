import { Injectable } from '@angular/core';
import { ProtoScreen } from '../models/screen';

@Injectable()
export class ScreensService {
    constructor() { }

    public getScreens() {
        return SCREENS;
    }

    public getScreen(id: number) {
        return SCREENS.find(p => p.id === id);
    }
}

const SCREENS: ProtoScreen[] = [
    { id: 1, title: 'add', imageUrl: '~/images/add.jpg' },
    { id: 2, title: 'add_new', imageUrl: '~/images/add_new.jpg' },
    { id: 3, title: 'add_new_categories', imageUrl: '~/images/add_new_categories.jpg' },
    { id: 4, title: 'current', imageUrl: '~/images/current.jpg' },
    { id: 5, title: 'find_friends', imageUrl: '~/images/find_friends.jpg' },
    { id: 6, title: 'friends', imageUrl: '~/images/friends.jpg' },
    { id: 7, title: 'me_badges', imageUrl: '~/images/me_badges.jpg' },
    { id: 8, title: 'me_history', imageUrl: '~/images/me_history.jpg' },
    { id: 9, title: 'me_photo', imageUrl: '~/images/me_photo.jpg' },
    { id: 10, title: 'me_wishlist', imageUrl: '~/images/me_wishlist.jpg' },
    { id: 11, title: 'menu', imageUrl: '~/images/menu.jpg' },
    { id: 12, title: 'photo_details', imageUrl: '~/images/photo_details.jpg' },
    { id: 13, title: 'sign_up', imageUrl: '~/images/sign_up.jpg' },
    { id: 14, title: 'skill_add_time', imageUrl: '~/images/skill_add_time.jpg' },
    { id: 15, title: 'skill_add_time_1', imageUrl: '~/images/skill_add_time_1.jpg' },
    { id: 16, title: 'skill_existing_3', imageUrl: '~/images/skill_existing_3.jpg' }
];
