"use client"

import { signIn } from "next-auth/react"
import { useSearchParams, useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AiOutlineGoogle } from "react-icons/ai"
import Link from "next/link"

export const LoginForm = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get("callbackUrl") || "/profile"

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)

      const res = await signIn("credentials", {
        redirect: true,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      })

      setLoading(false)

      console.log(res)
      if (!res?.error) {
        router.push(callbackUrl)
      } else {
        setError("invalid email or password")
      }
    } catch (error: any) {
      setLoading(false)
      setError(error)
    }

    setFormValues({ email: "", password: "" })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        {error && (
          <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
        )}
        <div className="">
          <Input
            required
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <Input
            required
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>

        <Button type="submit" className="font-bold" disabled={loading}>
          {loading ? "loading..." : "Sign In"}
        </Button>

        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
          <p className="text-center font-semibold mx-4 mb-0">OR</p>
        </div>
      </form>
      <Button
        onClick={() => signIn("google", { callbackUrl })}
        variant="outline"
      >
        <AiOutlineGoogle className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>

      <div className="text-neutral-400 text-sm">
        You don’t have an account yet?
        <Link
          href="/register"
          className="dark:text-neutral-50 text-gray-800 ml-2"
        >
          Sign up
        </Link>
      </div>
    </div>
  )
}
