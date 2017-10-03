import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { PageComponent } from "./page.component";


@NgModule({
    imports: [
        NativeScriptModule,
        //DesignerRoutingModule
    ],
    declarations: [
        PageComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ViewerModule { }
