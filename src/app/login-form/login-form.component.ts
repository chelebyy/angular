import { Component } from "@angular/core"

@Component({
  selector: "app-login-form",
  template: `
    <div class="relative z-10 w-full max-w-sm p-8 rounded-xl bg-[#0B0E14] bg-opacity-95 shadow-2xl border border-[#1a1f2e]">
      <div class="flex flex-col items-center mb-8">
        <h1 class="text-2xl font-bold text-white mb-2">Welcome Back</h1>
        <p class="text-sm text-gray-400">Sign in to your account</p>
      </div>
      <form (ngSubmit)="onSubmit()" class="space-y-6">
        <div class="relative">
          <input
            type="email"
            placeholder="Email"
            [(ngModel)]="email"
            name="email"
            class="w-full bg-[#151820] text-white border-[#2a2f3e] focus:border-[#3b4058] focus:ring-1 focus:ring-[#3b4058] placeholder:text-gray-500"
          />
        </div>
        <div class="relative">
          <input
            [type]="showPassword ? 'text' : 'password'"
            placeholder="Password"
            [(ngModel)]="password"
            name="password"
            class="w-full bg-[#151820] text-white border-[#2a2f3e] focus:border-[#3b4058] focus:ring-1 focus:ring-[#3b4058] placeholder:text-gray-500 pr-10"
          />
          <button
            type="button"
            (click)="togglePasswordVisibility()"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
          >
            <i class="fas" [ngClass]="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
          </button>
        </div>
        <button
          type="submit"
          class="w-full bg-[#4169E1] hover:bg-[#3154c4] text-white font-medium py-2 px-4 rounded-md transition-all duration-200"
        >
          Sign In
        </button>
      </form>
      <div class="mt-6 text-center">
        <a href="#" class="text-sm text-gray-400 hover:text-gray-300">
          Don't have an account? Sign up
        </a>
      </div>
    </div>
  `,
  styles: [],
})
export class LoginFormComponent {
  email = ""
  password = ""
  showPassword = false

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }

  onSubmit() {
    console.log("Login attempted with:", { email: this.email, password: this.password })
  }
}

