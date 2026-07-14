import { SignUp } from "@clerk/nextjs"

export const SignUpView = () => {
  return (
    <SignUp
      routing="path"
      path="/sign-up"
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
