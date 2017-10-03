import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { PageComponent } from "./viewer/page.component";


const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "designer/:id", loadChildren: "./designer/designer.module#DesignerModule" },
    { path: 'page1/:id', component: PageComponent, data: { state: 'page1' } },
    { path: 'page2/:id', component: PageComponent, data: { state: 'page2' } }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
