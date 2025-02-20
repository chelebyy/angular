import { Component } from "@angular/core"

@Component({
  selector: "app-root",
  template: `
    <main class="flex min-h-screen items-center justify-center bg-black">
      <app-p5-background></app-p5-background>
      <app-login-form></app-login-form>
    </main>
  `,
  styles: [],
})
export class AppComponent {}

