import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { DesignerRoutingModule } from "./designer-routing.module";
import { DesignerComponent } from "./designer.component";
import { PageListComponent } from "./page-list.component";



@NgModule({
    imports: [
        NativeScriptModule,
        DesignerRoutingModule
    ],
    declarations: [
        DesignerComponent,
        PageListComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class DesignerModule { }
