import { SignIn } from "@clerk/nextjs"

export const SignInView = () => {
  return (
    <SignIn
      routing="path"
      path="/sign-in"
      appearance={{
        elements: {
          rootBox: "w-full",
          cardBox: "w-full shadow-none",
          card: "w-full shadow-none sm:shadow-none sm:rounded-none bg-transparent sm:bg-transparent",
        },
      }}
    />
  )
}
