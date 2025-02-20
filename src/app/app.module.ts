import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { FormsModule } from "@angular/forms"

import { AppComponent } from "./app.component"
import { LoginFormComponent } from "./login-form/login-form.component"
import { P5BackgroundComponent } from "./p5-background/p5-background.component"

@NgModule({
  declarations: [AppComponent, LoginFormComponent, P5BackgroundComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

