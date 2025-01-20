// 'use client';
// import { FormEvent } from "react";
// import axios, {  } from "axios";

// export default function RegistrationForm() {
//     async function onFormSubmit(event: FormEvent<HTMLFormElement>) {
//         event.preventDefault();
//         const form = new FormData(event.target as HTMLFormElement);
//         const formData = Object.fromEntries(form.entries());

//         try {
//             const {  } = await axios.post("/api/register", formData, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//             alert("Registered.");
//         } catch (error) {
//             handleApiError();
//         }
//     }

//     return (
//         <form className="this-form" onSubmit={onFormSubmit}>
//             <input
//                 name="name"
//                 required
//                 className="fsxl-m14"
//                 placeholder="Full Name"
//                 type="text"
//             />
//             <input
//                 name="company"
//                 className="fsxl-m14"
//                 placeholder="Company (if registering as a company)"
//                 type="text"
//             />
//             <input
//                 name="email"
//                 className="fsxl-m14"
//                 required
//                 placeholder="Email"
//                 type="email"
//             />
//             <input
//                 name="password"
//                 className="fsxl-m14"
//                 required
//                 placeholder="Password"
//                 type="password"
//             />
//             <button type="submit" className="fsxl-m16 fw-600 a-btn text-primary-2">
//                 Register
//             </button>
//         </form>
//     );
// }
// function handleApiError() {
//     throw new Error("Function not implemented.");
// }

