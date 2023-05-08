import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { NxWelcomeComponent } from "./remote-entry/nx-welcome.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{path: '', component: NxWelcomeComponent}], { initialNavigation: "enabledBlocking" }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
