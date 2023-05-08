import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@mimit/shared";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: "",
          loadChildren: () =>
            import("./remote-entry/entry.module").then(
              (m) => m.RemoteEntryModule
            ),
        },
      ],
      { initialNavigation: "enabledBlocking" }
    ),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
