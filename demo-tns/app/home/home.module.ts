import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { ScreenListComponent } from "./screen-list.component";

@NgModule({
    imports: [
        NativeScriptModule,
        HomeRoutingModule
    ],
    declarations: [
        HomeComponent,
        ScreenListComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
