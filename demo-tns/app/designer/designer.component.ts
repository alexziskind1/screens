import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { ScreensService } from '../shared/services/screens.service';
import { PrototypeService } from '../shared/services/prototype.service';
import { RectSelection } from '../shared/models/rect-selection';
import { Link } from '../shared/models/link';
import { ProtoScreen } from '../shared/models/screen';
import { TouchGestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { Page } from 'tns-core-modules/ui/page';
import { NavigationOptions } from 'nativescript-angular/router/ns-location-strategy';


@Component({
    moduleId: module.id,
    selector: 'app-designer',
    templateUrl: 'designer.component.html',
    styleUrls: ['designer.component.css']
})
export class DesignerComponent implements OnInit {

    @ViewChild('surface') surfaceRef: ElementRef;
    private get surface() {
        return this.surfaceRef.nativeElement;
    }

    @ViewChild('selection') selectionRef: ElementRef;
    private get selection() {
        return this.selectionRef.nativeElement;
    }

    public touch$: Observable<TouchGestureEventData>;
    public touchStart$: Observable<TouchGestureEventData>;
    public touchMove$: Observable<TouchGestureEventData>;
    public touchEnd$: Observable<TouchGestureEventData>;

    public currentScreen: ProtoScreen;
    private currentSelection: RectSelection = null;
    private isSelecting = false;
    public selectedLink: Link = null;

    public allLinks$ = new BehaviorSubject<Link[]>([]);

    public get selectedLinkScreenId() {
        return this.selectedLink !== null ? this.selectedLink.destinationScreenId : null;
    }

    public get minimumSelectionSizeMet(): boolean {
        if (this.currentSelection !== null && (this.currentSelection.height > 10 && this.currentSelection.width > 10)) {
            return true;
        } else {
            return false;
        }
    }

    public get showScreenSelector(): boolean {
        return (this.minimumSelectionSizeMet && !this.isSelecting) || this.selectedLink !== null;
    }

    constructor(
        private page: Page,
        private screensService: ScreensService,
        private prototypeService: PrototypeService,
        private route: ActivatedRoute,
        private router: RouterExtensions,
        private zone: NgZone
    ) {
        this.page.actionBarHidden = true;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            this.currentScreen = this.screensService.getScreen(id);
            this.allLinks$.next(this.prototypeService.getAllLinksForScreenId(id));
        });

        this.touch$ = Observable.fromEvent<TouchGestureEventData>(this.surface, 'touch')
            .catch(e => {
                console.error(e);
                return Observable.empty<TouchGestureEventData>();
            });

        this.touchStart$ = this.touch$.filter(d => d.action === 'down')
        this.touchMove$ = this.touch$.filter(d => d.action === 'move');
        this.touchEnd$ = this.touch$.filter(d => d.action === 'up');

        this.touchStart$.subscribe((evt: TouchGestureEventData) => {
            this.zone.run(() => {
                this.currentSelection = new RectSelection({ x: evt.getX(), y: evt.getY() });
                this.isSelecting = true;
                this.selectedLink = null;
                this.setSelectionDimensions();
            });
        });

        this.touchMove$.subscribe((evt: TouchGestureEventData) => {
            this.zone.run(() => {
                if (this.currentSelection !== null && this.isSelecting) {
                    this.currentSelection = RectSelection.createUpdatedRectSelection(this.currentSelection, { x: evt.getX(), y: evt.getY() });
                    this.setSelectionDimensions();
                }
            });
        });
        this.touchEnd$.subscribe((evt: TouchGestureEventData) => {
            this.zone.run(() => {
                if (this.currentSelection !== null) {
                    this.currentSelection = RectSelection.createUpdatedRectSelection(this.currentSelection, { x: evt.getX(), y: evt.getY() });
                    this.setSelectionDimensions();
                    if (!this.minimumSelectionSizeMet) {
                        this.currentSelection = null;
                    }
                    this.isSelecting = false;
                }
            });
        });
    }

    public onDoubleClick(args) {
        const navOptions: NavigationOptions = {
            clearHistory: true
        };
        this.router.navigate(['home'], navOptions);
    }

    public onScreenSave(page: ProtoScreen) {
        if (this.selectedLink !== null) {
            const updatedLink: Link = {
                id: this.selectedLink.id,
                destinationScreenId: page.id,
                rect: this.selectedLink.rect
            };
            this.prototypeService.updateScreenLink(this.currentScreen.id, updatedLink);
        } else {
            const newLink: Link = {
                id: this.prototypeService.getNextLinkId(this.currentScreen.id),
                destinationScreenId: page.id,
                rect: this.currentSelection.rect
            };
            this.prototypeService.addScreenLink(this.currentScreen.id, newLink);
        }

        this.zone.run(() => {
            this.allLinks$.next(this.prototypeService.getAllLinksForScreenId(this.currentScreen.id));
            this.selectedLink = null;
            this.currentSelection = null;
        });

    }

    public onScreenAssocDelete(page: ProtoScreen) {
        if (this.selectedLink !== null) {
            this.prototypeService.deleteScreenLink(this.currentScreen.id, this.selectedLink.id);
            this.allLinks$.next(this.prototypeService.getAllLinksForScreenId(this.currentScreen.id));
        }
        this.selectedLink = null;
        this.currentSelection = null;
    }

    public onLinkClick(args, link: Link) {
        this.selectedLink = link;
        this.currentSelection = new RectSelection(link.rect.origin, link.rect.size);
    }

    public isLinkSelected(link: Link) {
        return this.selectedLink !== null && this.selectedLink.destinationScreenId === link.destinationScreenId;
    }


    private setSelectionDimensions() {
        const curSel = this.currentSelection;
        this.selection.height = curSel.height;
        this.selection.width = curSel.width;
        this.selection.left = curSel.left;
        this.selection.top = curSel.top;
    }
}

