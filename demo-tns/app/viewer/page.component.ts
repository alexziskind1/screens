import { Component, OnInit, HostBinding, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ScreensService } from '../shared/services/screens.service';
import { PrototypeService } from '../shared/services/prototype.service';

import { Link } from '../shared/models/link';
import { ProtoScreen } from '../shared/models/screen';
import { NavigationOptions } from 'nativescript-angular/router/ns-location-strategy';
import { Page } from 'tns-core-modules/ui/page';
import { AbsoluteLayout } from 'ui/layouts/absolute-layout';
import { Label } from 'ui/label';
import { Color } from 'tns-core-modules/color';


@Component({
    moduleId: module.id,
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

    public currentScreen: ProtoScreen;
    private currentPath: string;
    public allLinks$ = new BehaviorSubject<Link[]>([]);

    private get nextPath() {
        return this.currentPath === 'page1' ? 'page2' : 'page1';
    }

    constructor(
        private page: Page,
        private screensService: ScreensService,
        private prototypeService: PrototypeService,
        private route: ActivatedRoute,
        private router: RouterExtensions,
        private zone: NgZone) {
        this.page.actionBarHidden = true;
    }


    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            this.zone.run(() => {
                this.currentScreen = this.screensService.getScreen(id);
                this.allLinks$.next(this.prototypeService.getAllLinksForScreenId(id));
            });
        });

        this.route.url.subscribe(url => {
            this.currentPath = url[0].path;
        });
    }

    public onImageTap(args, surface: AbsoluteLayout) {
        const cc = surface.getChildrenCount();
        for (var i = 0; i < cc; i++) {
            const child = surface.getChildAt(i);
            if (child.typeName === 'Label') {
                child.className = 'link';
                setTimeout(() => {
                    child.className = '';
                }, 1000);
            }
        }
    }

    public onDoubleTap(args) {
        const navOptions: NavigationOptions = {
            clearHistory: true
        };
        this.router.navigate(['home'], navOptions);
    }

    public onLinkTap(args, link: Link) {
        this.router.navigate([this.nextPath, link.destinationScreenId]);
    }
}
