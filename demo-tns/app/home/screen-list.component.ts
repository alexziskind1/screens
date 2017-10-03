import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ScreensService } from '../shared/services/screens.service';
import { ProtoScreen } from '../shared/models/screen';


@Component({
    moduleId: module.id,
    selector: 'app-screen-list',
    templateUrl: 'screen-list.component.html',
    styleUrls: ['screen-list.component.css']
})
export class ScreenListComponent implements OnInit {

    @Output() screenEditSelect = new EventEmitter<ProtoScreen>();
    @Output() screenViewSelect = new EventEmitter<ProtoScreen>();

    public screens: ProtoScreen[];

    constructor(private screensService: ScreensService) { }

    ngOnInit() {
        this.screens = this.screensService.getScreens();
    }

    public screenItemEditTap(args, screen: ProtoScreen) {
        this.screenEditSelect.emit(screen);
    }

    public screenItemViewTap(args, screen: ProtoScreen) {
        this.screenViewSelect.emit(screen);
    }
}
