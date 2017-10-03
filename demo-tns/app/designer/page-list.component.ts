import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ScreensService } from '../shared/services/screens.service';
import { ProtoScreen } from '../shared/models/screen';


@Component({
    moduleId: module.id,
    selector: 'app-page-list',
    templateUrl: 'page-list.component.html',
    styleUrls: ['page-list.component.css']
})
export class PageListComponent implements OnInit {

    @Output() screenSave = new EventEmitter<ProtoScreen>();
    @Output() screenAssocDelete = new EventEmitter<ProtoScreen>();
    @Input('selectedValue') public selectedValue: number;

    public pages: ProtoScreen[];

    constructor(private screensService: ScreensService) { }

    ngOnInit() {
        this.pages = this.screensService.getScreens();
    }

    public onScreenSelected(page: ProtoScreen) {
        this.selectedValue = page.id;
    }

    public onSaveTap(args) {
        const selectedPage = this.pages.find(p => p.id === +this.selectedValue);
        this.screenSave.emit(selectedPage);
    }

    public onDeleteTap(args) {
        const selectedPage = this.pages.find(p => p.id === +this.selectedValue);
        this.screenAssocDelete.emit(selectedPage);
    }

    public isPageSelected(page: ProtoScreen) {
        return this.selectedValue === page.id;
    }
}

