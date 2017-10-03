import { Component, OnInit } from "@angular/core";
import { ProtoScreen } from "../shared/models/screen";
import { RouterExtensions } from "nativescript-angular/router";
import { PrototypeService } from "../shared/services/prototype.service";


@Component({
    moduleId: module.id,
    selector: 'Home',
    templateUrl: './home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    public screens: ProtoScreen[];

    constructor(
        private prototypeService: PrototypeService,
        private router: RouterExtensions
    ) { }

    ngOnInit() {

    }

    public onScreenEditSelect(screen: ProtoScreen) {
        this.router.navigate(['designer', screen.id]);
    }

    public onScreenViewSelect(screen: ProtoScreen) {
        this.router.navigate(['page1', screen.id]);
    }

    public onViewTap(args) {
        this.router.navigate(['page1', 1]);
    }

    public onAddTap(args) {
        alert('add');
    }

    public onRemoveAllLinksTap(args) {
        if (confirm('are you sure?')) {
            this.prototypeService.deleteAll();
        }
    }

}
