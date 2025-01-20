"use client";
import { signOut } from "next-auth/react";

export default function LogOutButton () {
    async function logOut() {
        await signOut({ redirect: true, callbackUrl: window.location.origin + "/partner-program" });
    };

    return (
        <button className='social-login fw-600' onClick={logOut}>Sign Out</button>
    )
}