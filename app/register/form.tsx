"use client"

import { signIn } from "next-auth/react"
import { ChangeEvent, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AiOutlineGoogle } from "react-icons/ai"
import { useSearchParams } from "next/navigation"

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get("callbackUrl") || "/profile"

  const onSubmit = async () => {
    // e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      })

      setLoading(false)
      if (!res.ok) {
        setError((await res.json()).message)
        return
      }

      signIn(undefined, { callbackUrl: "/" })
    } catch (error: any) {
      setLoading(false)
      setError(error)
    }

    setFormValues({ name: "", email: "", password: "" })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <div className="flex flex-col gap-2">
      <form className="flex flex-col gap-2">
        {error && (
          <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
        )}
        <div>
          <Input
            required
            type="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </div>
        <div>
          <Input
            required
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Email address"
          />
        </div>
        <div>
          <Input
            required
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
      </form>
      <Button
        onClick={() => onSubmit()}
        type="submit"
        className="font-bold"
        disabled={loading}
      >
        {loading ? "loading..." : "Sign Up"}
      </Button>

      <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
        <p className="text-center font-semibold mx-4 mb-0">OR</p>
      </div>

      <Button
        onClick={() => signIn("google", { callbackUrl })}
        variant="outline"
      >
        <AiOutlineGoogle className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
    </div>
  )
}
