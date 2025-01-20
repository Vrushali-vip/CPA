'use client';
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {

  const router = useRouter();
  // const [userLink, setUserLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const formData = Object.fromEntries(form.entries());

    signInWrap('credentials', { ...formData, redirect: false, callbackUrl: window.location.origin + "/profile" })
  }

  async function googleLogin() {
    signInWrap('google', { redirect: false, callbackUrl: window.location.origin + "/profile" });
  }

  async function linkedinLogin() {
    signInWrap('linkedin', { redirect: false, callbackUrl: window.location.origin + "/profile" });
  }

  async function signInWrap(type: "credentials"|"google"|"linkedin", options?: { }) {
    setLoading(true);

    const data = await signIn(type, options);
    if(type === "credentials") {
      if (!data?.ok) {
        alert(data?.error)
      } else {
        router.push(data?.url as string)
      }
    }
    setLoading(false);
  } 

  return (
    <>
      <form className="this-form" onSubmit={onFormSubmit}>
        <input
          name="email"
          className="fsxl-m14"
          required
          placeholder="Email"
          type="email"
        />
        <input
          name="password"
          className="fsxl-m14"
          required
          placeholder="Password"
          type="password"
        />
        <button disabled={loading} type="submit" className="fsxl-m16 fw-600 a-btn text-primary-2">
          Login
        </button>
      </form>
      <br />
      <div className="d-flex justify-content-center mt-3 gap-2">
        <button className="social-login" onClick={googleLogin}><i className="bi bi-google"></i></button>
        <button className="social-login" onClick={linkedinLogin}><i className="bi bi-linkedin"></i></button>
      </div>
    </>
  );
}
