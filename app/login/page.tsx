import { Suspense } from "react"
import { LoginForm } from "./form"

export default function LoginPage() {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="w-96 text-center">
          <div className="text-3xl font-bold mb-8">Login</div>
          <Suspense fallback={<div>Loading form...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </>
  )
}
