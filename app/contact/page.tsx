// import Link from "next/link";
// import styles from "./styles.module.css";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//     title: "Contact Us"
// }

// export default function Contact() {

//     async function onFormSubmit(formData: FormData) {
//         'use server';
//         let fd = Object.fromEntries(formData.entries());
        
//       }

//     return (
//         <main>
//             <article>
//                 <div className="container comp-nav">
//                     <h2 className="display-4 fw-600 text-white">
//                         Get in touch
//                     </h2>
//                     <br />
//                     <div className="d-flex flex-wrap">
//                         <div className="col-lg-8 col-12 mt-4">
//                             <div>
//                                 <h6 className="fs-4 font-mont fw-600 text-white">
//                                     Send a message
//                                 </h6>
//                                 <p className="fs-6 text-cc font-mont">
//                                     We&apos;d love to help, please let us know what you need and one of our solution teams will be in touch.
//                                 </p>
//                             </div>
//                             <form className={styles.contact_form} action={onFormSubmit}>
//                                 <div className="col-lg-6 col-12">
//                                     <label htmlFor="name">Name</label>
//                                     <input type="text" required name="name" id="name" placeholder="MY NAME IS" />
//                                 </div>
//                                 <div className="col-lg-6 col-12">
//                                     <label htmlFor="email">Email</label>
//                                     <input type="email" required name="email" id="email" placeholder="MY EMAIL IS" />
//                                 </div>
//                                 <div className="col-lg-12 col-12">
//                                     <select name="subject" id="subject" required>
//                                         <option value="I'D LIKE TO START A PROJECT">I&apos;D LIKE TO START A PROJECT</option>
//                                         <option defaultChecked value="I'D LIKE TO ASK A QUESTION">I&apos;D LIKE TO ASK A QUESTION</option>
//                                         <option value="I'D LIKE TO ASK A QUESTION">I&apos;D LIKE TO MAKE A PROPOSAL</option>
//                                     </select>
//                                 </div>
//                                 <div className="col-lg-12 col-12">
//                                     <label htmlFor="message">Message</label>
//                                     <textarea name="message" required id="message" rows={4} placeholder="HERE IS MY MESSAGE"></textarea>
//                                 </div>
//                                 <div className="col-lg-12 col-12">
//                                     <button type="submit">
//                                         Submit
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                         <div className="col-lg-4 col-12 font-mont mt-4">
//                             <h2 className="fs-4 fw-600 text-white">
//                                 Call us
//                             </h2>
//                             <p className="fs-6 text-cc">
//                                 Would you prefer to have a short call with us to discuss your needs? Not a problem!
//                                 Feel free to contact us by finding our number below.
//                             </p>
//                             <Link href="tel:+919833165272" className="c-link  d-block text-primary-3 fw-600"><CallIcon /> +91-9833165272</Link>
//                             <Link href="tel:+4402032890014" className="c-link d-block mt-1 text-primary-3 fw-600"><CallIcon /> +44 020 3289 0014</Link>
//                         </div>
//                     </div>
//                 </div>
//             </article>
//         </main>
//     )
// }

// function CallIcon() {
//     return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <mask id="mask0_14_1081" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
//             <rect width="16" height="16" fill="#D9D9D9" />
//         </mask>
//         <g mask="url(#mask0_14_1081)">
//             <path d="M13.3 14C11.8667 14 10.4696 13.6804 9.10867 13.0413C7.74733 12.4027 6.54178 11.5582 5.492 10.508C4.44178 9.45822 3.59733 8.25267 2.95867 6.89133C2.31956 5.53044 2 4.13333 2 2.7C2 2.5 2.06667 2.33333 2.2 2.2C2.33333 2.06667 2.5 2 2.7 2H5.4C5.55556 2 5.69444 2.05 5.81667 2.15C5.93889 2.25 6.01111 2.37778 6.03333 2.53333L6.46667 4.86667C6.48889 5.02222 6.48622 5.16378 6.45867 5.29133C6.43067 5.41933 6.36667 5.53333 6.26667 5.63333L4.65 7.26667C5.11667 8.06667 5.70289 8.81667 6.40867 9.51667C7.114 10.2167 7.88889 10.8222 8.73333 11.3333L10.3 9.76667C10.4 9.66667 10.5307 9.59156 10.692 9.54133C10.8529 9.49156 11.0111 9.47778 11.1667 9.5L13.4667 9.96667C13.6222 10 13.75 10.0749 13.85 10.1913C13.95 10.3082 14 10.4444 14 10.6V13.3C14 13.5 13.9333 13.6667 13.8 13.8C13.6667 13.9333 13.5 14 13.3 14ZM4.01667 6L5.11667 4.9L4.83333 3.33333H3.35C3.40556 3.78889 3.48333 4.23889 3.58333 4.68333C3.68333 5.12778 3.82778 5.56667 4.01667 6ZM9.98333 11.9667C10.4167 12.1556 10.8584 12.3056 11.3087 12.4167C11.7584 12.5278 12.2111 12.6 12.6667 12.6333V11.1667L11.1 10.85L9.98333 11.9667Z" fill="#059B9A" />
//         </g>
//     </svg>
// }

import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us"
}

export default function Contact() {
    async function onFormSubmit() {
        'use server';
    }

    return (
        <main className="min-h-screen bg-black">
            <article className="max-w-7xl mx-auto px-6 md:px-12 py-16">
                <div className="container mx-auto px-4 py-8">
                    <h2 className="text-4xl md:text-5xl font-semibold text-white">
                        Get in touch
                    </h2>
                    <div className="flex flex-wrap mt-8">
                        <div className="w-full lg:w-2/3 mt-4">
                            <div>
                                <h6 className="text-2xl font-mont font-semibold text-white">
                                    Send a message
                                </h6>
                                <p className="text-sm text-[#c5c5c5] font-mont mt-2">
                                    We&apos;d love to help, please let us know what you need and one of our solution teams will be in touch.
                                </p>
                            </div>
                            <form className="flex flex-wrap mt-4" action={onFormSubmit}>
                                <div className="w-full lg:w-1/2 pr-0 lg:pr-12 mb-6">
                                    <label htmlFor="name" className="block text-white font-mont text-xl font-semibold mb-2">Name</label>
                                    <input 
                                        type="text" 
                                        required 
                                        name="name" 
                                        id="name" 
                                        placeholder="MY NAME IS" 
                                        className="w-full bg-transparent border-b border-white text-[#c5c5c5] font-mont pb-2 focus:outline-none placeholder:text-[#c5c5c5]"
                                    />
                                </div>
                                <div className="w-full lg:w-1/2 pr-0 lg:pr-12 mb-6">
                                    <label htmlFor="email" className="block text-white font-mont text-xl font-semibold mb-2">Email</label>
                                    <input 
                                        type="email" 
                                        required 
                                        name="email" 
                                        id="email" 
                                        placeholder="MY EMAIL IS" 
                                        className="w-full bg-transparent border-b border-white text-[#c5c5c5] font-mont pb-2 focus:outline-none placeholder:text-[#c5c5c5]"
                                    />
                                </div>
                                <div className="w-full pr-0 lg:pr-12 mb-6">
                                    <select 
                                        name="subject" 
                                        id="subject" 
                                        required
                                        className="w-full bg-transparent border-b border-white text-[#c5c5c5] font-mont pb-2 focus:outline-none"
                                    >
                                        <option value="I'D LIKE TO START A PROJECT">I&apos;D LIKE TO START A PROJECT</option>
                                        <option value="I'D LIKE TO ASK A QUESTION">I&apos;D LIKE TO ASK A QUESTION</option>
                                        <option value="I'D LIKE TO MAKE A PROPOSAL">I&apos;D LIKE TO MAKE A PROPOSAL</option>
                                    </select>
                                </div>
                                <div className="w-full pr-0 lg:pr-12 mb-6">
                                    <label htmlFor="message" className="block text-white font-mont text-xl font-semibold mb-2">Message</label>
                                    <textarea 
                                        name="message" 
                                        required 
                                        id="message" 
                                        rows={4} 
                                        placeholder="HERE IS MY MESSAGE"
                                        className="w-full bg-transparent border-b border-white text-[#c5c5c5] font-mont pb-2 focus:outline-none placeholder:text-[#c5c5c5]"
                                    ></textarea>
                                </div>
                                <div className="w-full pr-0 lg:pr-12">
                                    <button 
                                        type="submit"
                                        className="w-[150px] h-10 font-mont bg-transparent text-white border border-white font-semibold transition-colors duration-200 hover:bg-white hover:text-black"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="w-full lg:w-1/3 font-mont mt-4">
                            <h2 className="text-2xl font-semibold text-white">
                                Call us
                            </h2>
                            <p className="text-sm text-[#c5c5c5] mt-2">
                                Would you prefer to have a short call with us to discuss your needs? Not a problem!
                                Feel free to contact us by finding our number below.
                            </p>
                            <div className="mt-4 space-y-1">
                                <Link href="tel:+919833165272" className="flex items-center text-[#059B9A] font-semibold">
                                    <CallIcon /> 
                                    <span className="ml-2">+91-9833165272</span>
                                </Link>
                                <Link href="tel:+4402032890014" className="flex items-center text-[#059B9A] font-semibold">
                                    <CallIcon /> 
                                    <span className="ml-2">+44 020 3289 0014</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </main>
    )
}

function CallIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_14_1081" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                <rect width="16" height="16" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_14_1081)">
                <path d="M13.3 14C11.8667 14 10.4696 13.6804 9.10867 13.0413C7.74733 12.4027 6.54178 11.5582 5.492 10.508C4.44178 9.45822 3.59733 8.25267 2.95867 6.89133C2.31956 5.53044 2 4.13333 2 2.7C2 2.5 2.06667 2.33333 2.2 2.2C2.33333 2.06667 2.5 2H5.4C5.55556 2 5.69444 2.05 5.81667 2.15C5.93889 2.25 6.01111 2.37778 6.03333 2.53333L6.46667 4.86667C6.48889 5.02222 6.48622 5.16378 6.45867 5.29133C6.43067 5.41933 6.36667 5.53333 6.26667 5.63333L4.65 7.26667C5.11667 8.06667 5.70289 8.81667 6.40867 9.51667C7.114 10.2167 7.88889 10.8222 8.73333 11.3333L10.3 9.76667C10.4 9.66667 10.5307 9.59156 10.692 9.54133C10.8529 9.49156 11.0111 9.47778 11.1667 9.5L13.4667 9.96667C13.6222 10 13.75 10.0749 13.85 10.1913C13.95 10.3082 14 10.4444 14 10.6V13.3C14 13.5 13.9333 13.6667 13.8 13.8C13.6667 13.9333 13.5 14 13.3 14ZM4.01667 6L5.11667 4.9L4.83333 3.33333H3.35C3.40556 3.78889 3.48333 4.23889 3.58333 4.68333C3.68333 5.12778 3.82778 5.56667 4.01667 6ZM9.98333 11.9667C10.4167 12.1556 10.8584 12.3056 11.3087 12.4167C11.7584 12.5278 12.2111 12.6 12.6667 12.6333V11.1667L11.1 10.85L9.98333 11.9667Z" fill="#059B9A" />
            </g>
        </svg>
    )
}