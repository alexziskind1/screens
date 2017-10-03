import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NSModuleFactoryLoader } from "nativescript-angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ScreensService } from "./shared/services/screens.service";
import { PrototypeService } from "./shared/services/prototype.service";
import { StorageService } from "./shared/services/storage.service";
import { ViewerModule } from "./viewer/viewer.module";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        ViewerModule

    ],
    declarations: [
        AppComponent
    ],
    providers: [
        StorageService,
        ScreensService,
        PrototypeService,
        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
