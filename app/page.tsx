import LoginForm from "@/components/LoginForm"
import P5Background from "@/components/P5Background"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      <P5Background />
      <LoginForm />
    </main>
  )
}

