// import { Button } from "@/components/ui/button";
// import { Metadata } from "next";
// import Image from "next/image";

// export const metadata: Metadata = {
//     title: "Automated Parking Charge Notice Processing | Alphalake Services",
//     description: "Automate penalty charge notice processing and payment with AI-powered bot. Save time and reduce errors with our automated solution. Ideal for organizations managing fleets.",
//     keywords: ["parking charge notice", "penalty charge notice", "AI automation", "fleet management", "payment processing", "appeals process", "road penalties"],
//     openGraph: {
//         title: "Automated Parking Charge Notice Processing | Alphalake Services",
//         description: "Automate penalty charge notice processing and payment with AI-powered bot. Save time and reduce errors with our automated solution. Ideal for organizations managing fleets.",
//         url: "https://alphalake.services/alphabots/penalty-charge-notices",
//         images: [
//             {
//                 url: "/alphabot.webp",
//                 width: 500,
//                 height: 500,
//             },
//         ],
//     },
//     robots: {
//         index: true,
//         follow: true,
//     },
// };

// const PriceOutline = [
//     {
//         item: "Upto 20 penalties processed per month",
//         es: true,
//         ms: true,
//         ns: true
//     },
//     {
//         item: "Upto 50 authorities / local councils setup",
//         desc: "Able to scan and pay via automation",
//         es: true,
//         ms: true,
//         ns: true
//     },
//     {
//         item: "AI document understanding - processes penalty notices",
//         es: true,
//         ms: true,
//         ns: true
//     },
//     {
//         item: "Automated payments to authorities",
//         desc: "Pays the penalties on their websites, uses PCI compliant payments",
//         es: true,
//         ms: true,
//         ns: true
//     },

//     {
//         item: "Simple Appeals process",
//         desc: "emails contacts list, waits 48 hours, pays penalty charge if no response.",
//         es: true,
//         ms: true,
//         ns: true
//     },
//     {
//         item: "Upto 100 penalties processed per month",
//         es: false,
//         ms: true,
//         ns: true
//     },
//     {
//         item: "Upto 100 authorities / local councils setup",
//         desc: "Able to scan and pay via automation",
//         es: false,
//         ms: true,
//         ns: true
//     },
//     {
//         item: "Web User Interface",
//         desc: "In addition to automated emails, a web interface is provided for penalties to be scanned, categorised, searched and archived. Interface also used for users to Appeal. Supports multiple user roles and Role Based Access Control (RBAC)",
//         es: false,
//         ms: true,
//         ns: true
//     },
//     {
//         item: "Customised Appeals workflow",
//         desc: "Alphabot emails/messages a maintained list of contacts in your organisation to offer the option to appeal, waits for 48 hours, then pays if no response to appeal is received.",
//         es: false,
//         ms: false,
//         ns: true
//     },

//     {
//         item: "Charts Dashboard",
//         desc: "Provides valuable business analysis to track penalties, where and when are they are occurring, count.",
//         es: false,
//         ms: false,
//         ns: true
//     },


//     {
//         item: "Upto 500 penalties processed per month",
//         es: false,
//         ms: false,
//         ns: true
//     },
//     {
//         item: "Upto 150 authorities / local councils setup",
//         desc: "Able to scan and pay via automation",
//         es: false,
//         ms: false,
//         ns: true
//     },


//     {
//         item: "500+ penalties processed per month",
//         es: false,
//         ms: false,
//         ns: false
//     },
//     {
//         item: "150+ authorities / local councils setup",
//         desc: "Able to scan and pay via automation",
//         es: false,
//         ms: false,
//         ns: false
//     },
//     {
//         item: "AI Insights on occurrences of penalty charges",
//         desc: "Includes pattern recognition based  recommendations to reduce number of penalties.",
//         es: false,
//         ms: false,
//         ns: false
//     },
// ];

// const TickIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 56 56" fill="none">
//         <path d="M22.75 42L7 26.25L9.4745 23.7755L22.75 37.0493L46.5255 13.2755L49 15.75L22.75 42Z" fill="#00fc54" />
//     </svg>
// );

// export default function AlphabotParkingCharge() {
//     return (
//         <main className="max-w-6xl mx-auto">
//             <article className="w-full bg-[var(--primary-5)] flex justify-center items-center mb-12 min-h-[650px] py-4">
//                 <div className="flex justify-center max-w-[1420px] items-center w-full p-4">
//                     <div className="max-w-[1420px]">
//                         <h1 className="mt-16 text-4xl text-white font-semibold md:text-5xl">
//                             <span className="bg-[var(--primary-5)]">
//                                 A bot that automatically processes (and pays!) road penalty charges                            </span>{" "}
//                             <br className="hidden sm:block" />
//                             <br className="hidden sm:block" />
//                         </h1>
//                         <div className="text-left mb-16">
//                             <p className="font-mont text-2xl md:text-xl">
//                                 Our purpose-designed AI automation frees up teams from
//                                 losing valuable time appealing and paying
//                                 Parking/Penalty Charges Notices (PCNs).
//                             </p>
//                             <br></br>
//                             <p className="font-mont text-2xl md:text-xl">
//                                 Useful for any organisation managing a fleet of
//                                 vehicles or staff driving on roads. Get your people out of zero
//                                 value-add clerical and admin and becoming business-productive.
//                             </p>
//                         </div>


//                         <div className="relative flex items-center justify-end ">
//                             <div className="relative bg-al-950 border-2 border-al-600 rounded-lg px-4 py-3 w-[350px] text-white  mt-[-100px]">
//                                 <p className="font-bold">I can appeal and pay penalties from over 150 UK Authorities</p>

//                                 <div className="absolute right-6 bottom-[-20px] w-0 h-0 
//                                     border-l-[20px] border-l-transparent
//                                     border-r-[20px] border-r-transparent
//                                     border-t-[20px] border-t-al-600"></div>

//                                 <div className="absolute right-6 bottom-[-16px] w-0 h-0 
//                                     border-l-[18px] border-l-transparent
//                                     border-r-[18px] border-r-transparent
//                                     border-t-[18px] border-t-al-950"></div>
//                             </div>
//                             <div className="flex justify-end mt-4">
//                                 <Image src="/alphabot.webp" alt="PCN" width={120} height={120} />
//                             </div>
//                         </div>


//                         <Button className=" rounded-full">Jump straight to Pricing</Button>
//                     </div>
//                     <div className="ml-8 rounded-2xl p-1.5 relative w-2/3 flex justify-end items-center hidden md:flex">
//                         <Image src="/PCN.jpg" alt="PCN" width={350} height={450} className="rounded-2xl" />
//                         <div className="absolute w-[320px] h-[462px] top-1.5 animate-scanner">
//                         </div>
//                     </div>
//                 </div>
//             </article>

//             <section className="w-full px-8 font-mont">
//                 <h2 className="text-3xl font-bold text-center mt-20">How It Works</h2>

//                 <div className="flex justify-center items-center max-w-5xl mx-auto my-24 text-left">
//                     <div className="min-w-[80px] min-h-[80px] text-black bg-white rounded-full flex justify-center items-center text-2xl font-semibold">1</div>
//                     <div className="ml-20 text-2xl md:text-xl flex-1 mr-20">
//                         Receive the fine through the post then scan/photograph the document(s).
//                     </div>
//                     <div className="mr-10 transition-transform duration-500 ease-in-out transform hover:scale-105">
//                         <Image src="/Checkbox.png" alt="PCN" width={40} height={40} />
//                     </div>
//                 </div>

//                 {/* Step 2 */}
//                 <div className="flex justify-center items-center max-w-5xl mx-auto my-24 text-left relative">
//                     <div className="min-w-[80px] min-h-[80px] text-black bg-white rounded-full flex justify-center items-center text-2xl font-semibold">2</div>
//                     <div className="ml-20 text-2xl md:text-xl flex-1 mr-20">
//                         Based on your configured preferences, Alphabot either immediately pays or challenges the notice.
//                     </div>
//                     <div className="mr-10 transition-transform duration-500 ease-in-out transform hover:scale-105">
//                         <Image src="/Checkbox.png" alt="PCN" width={40} height={40} />
//                     </div>
//                 </div>

//                 {/* Step 3 */}
//                 <div className="flex justify-center items-center max-w-5xl mx-auto my-24 text-left">
//                     <div className="min-w-[80px] min-h-[80px] text-black bg-white rounded-full flex justify-center items-center text-2xl font-semibold">3</div>
//                     <div className="ml-20 text-2xl md:text-xl flex-1 mr-20">
//                         Report is sent to users showing all reconciled notices for that day, week, month. Configured to your preference!
//                     </div>
//                     <div className="mr-10 transition-transform duration-500 ease-in-out transform hover:scale-105">
//                         <Image src="/Checkbox.png" alt="PCN" width={40} height={40} />
//                     </div>
//                 </div>


//             </section>


//             <section className="container mx-auto px-4 max-w-6xl">
//                 <h2 className="mt-12 text-[2.5rem] font-bold text-center py-4 text-white tracking-wide">
//                     Behind every great AI there is a great{" "}
//                     <span className=" uppercase">human!</span>

//                 </h2>
//                 <div className="flex flex-col md:flex-row items-center gap-20 mx-auto p-2.5 tracking-wide mt-20">
//                     <div>
//                         <p className="tracking-wide text-2xl md:text-xl">
//                             Lewis has studiously built and iterated this AI automation over the last 2 years in live
//                             customer environments. As a result it is now highly reliable and useful tool to these organisations.


//                         </p>
//                         <p className="tracking-wide mt-4 text-2xl md:text-xl">
//                             Lewis&apos; role is key in continuous improvement and development (CI/CD),
//                             working closely with our ServiceHub and product teams to support current and future
//                             deployments.
//                         </p>
//                         <p className="tracking-wide mt-4 text-2xl md:text-xl">
//                             Iterative improvement by Lewis and our team over 2 years in real world operations has led
//                             to us being able to now make this AI automation available as an off-the-shelf product to benefit
//                             organisations across the UK.
//                         </p>
//                     </div>
//                     <div className="mt-8 md:mt-0 flex-shrink-0">
//                         <Image
//                             src="/Lewis_Urwin.jpeg"
//                             alt="PCN"
//                             width={230}
//                             height={230}
//                             className="rounded-lg shadow-lg"
//                         />
//                     </div>
//                 </div>
//             </section>

//             <section className="border border-[#b3fef7] rounded-lg flex flex-col md:flex-row gap-12 mx-auto max-w-6xl p-10 items-center my-32">
//                 <div>
//                     <h2 className="font-semibold text-2xl mb-4">
//                         Live demo of the AI automation processing a Penalty Charge Notice (PCN)
//                     </h2>
//                 </div>
//                 <div className="w-full md:w-auto flex-shrink-0">
//                     <video
//                         width="460"
//                         height="315"
//                         className="rounded-lg shadow-lg w-full md:w-[460px]"
//                         controls
//                     >
//                         <source src="/video1.mp4" type="video/mp4" />
//                         Your browser does not support the video tag.
//                     </video>
//                 </div>
//             </section>

//             <section className="mx-auto max-w-6xl my-32 px-4 md:px-6">
//                 <table className="w-full font-mont text-white">
//                     <thead>
//                         <tr>
//                             <th className="w-[40%] md:w-[40%] pl-2 md:pl-4 text-xl md:text-2xl pb-4 md:pb-6 text-left"></th>
//                             {["Starter", "Pro", "Enterprise", "Custom"].map((plan) => (
//                                 <th key={plan} className="w-[15%] pb-4 md:pb-6 text-center">
//                                     <div className="relative mx-0.5 md:mx-2">
//                                         <div className="absolute inset-0 border border-dashed border-[#0D9B9C] rounded-lg bg-[rgba(2,45,51,0.25)]"></div>
//                                         <div className="relative z-10 py-1 text-xs md:text-base font-normal">{plan}</div>
//                                     </div>
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody className="bg-[rgba(2,45,51,0.75)]">
//                         <tr className="bg-[rgba(2,45,51,0.75)]">
//                             <td className="p-1.5 md:p-3 font-semibold text-xs md:text-base">Subscription / Pricing</td>
//                             {[
//                                 { price: "Free" },
//                                 { price: "£350 month" },
//                                 { price: "£1,750 month" },
//                                 { price: "£POA", note: "" }
//                             ].map((item, i) => (
//                                 <td key={i} className="p-1 md:p-2 text-xs text-center relative before:content-[''] before:w-[calc(100%-6px)] md:before:w-[calc(100%-10px)] before:h-full before:left-[3px] md:before:left-[5px] before:z-[-1] before:absolute before:top-[-15px] before:bg-[#0D9B9C] before:rounded-lg first:before:rounded-t-lg last:before:h-[calc(100%+15px)]">
//                                     <span className="text-[10px] md:text-xs">{item.price}<br />{item.note}</span>
//                                 </td>
//                             ))}
//                         </tr>
//                         {PriceOutline.map((item, index) => (
//                             <tr key={index} className="hover:bg-[rgba(2,45,51,0.75)] transition-all duration-200 text-[10px] md:text-sm">
//                                 <td className="p-1 md:p-2 max-w-none relative group">
//                                     <span className="line-clamp-2 md:line-clamp-none">{item.item}</span>
//                                 </td>

//                                 <td className="py-1 px-0.5 md:px-2 text-center relative before:content-[''] before:w-[calc(100%-6px)] md:before:w-[calc(100%-10px)] before:h-full before:left-[3px] md:before:left-[5px] before:z-[-1] before:absolute before:top-[-15px] before:bg-[#0D9B9C]">
//                                     {item.es && <div className="flex justify-center items-center scale-75 md:scale-100"><TickIcon /></div>}
//                                 </td>
//                                 <td className="py-1 px-0.5 md:px-2 text-center relative before:content-[''] before:w-[calc(100%-6px)] md:before:w-[calc(100%-10px)] before:h-full before:left-[3px] md:before:left-[5px] before:z-[-1] before:absolute before:top-[-15px] before:bg-[#0D9B9C]">
//                                     {item.ms && <div className="flex justify-center items-center scale-75 md:scale-100"><TickIcon /></div>}
//                                 </td>
//                                 <td className="py-1 px-0.5 md:px-2 text-center relative before:content-[''] before:w-[calc(100%-6px)] md:before:w-[calc(100%-10px)] before:h-full before:left-[3px] md:before:left-[5px] before:z-[-1] before:absolute before:top-[-15px] before:bg-[#0D9B9C]">
//                                     {item.ns && <div className="flex justify-center items-center scale-75 md:scale-100"><TickIcon /></div>}
//                                 </td>
//                                 <td className="py-1 px-0.5 md:px-2 text-center relative before:content-[''] before:w-[calc(100%-6px)] md:before:w-[calc(100%-10px)] before:h-full before:left-[3px] md:before:left-[5px] before:z-[-1] before:absolute before:top-[-15px] before:bg-[#0D9B9C]">
//                                     <div className="flex justify-center items-center scale-75 md:scale-100"><TickIcon /></div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </section>
//         </main>
//     );
// }


import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";

// Metadata remains the same...
export const metadata: Metadata = {
    title: "Automated Parking Charge Notice Processing | Alphalake Services",
    description: "Automate penalty charge notice processing and payment with AI-powered bot. Save time and reduce errors with our automated solution. Ideal for organizations managing fleets.",
    keywords: ["parking charge notice", "penalty charge notice", "AI automation", "fleet management", "payment processing", "appeals process", "road penalties"],
    openGraph: {
        title: "Automated Parking Charge Notice Processing | Alphalake Services",
        description: "Automate penalty charge notice processing and payment with AI-powered bot. Save time and reduce errors with our automated solution. Ideal for organizations managing fleets.",
        url: "https://alphalake.services/alphabots/penalty-charge-notices",
        images: [
            {
                url: "/alphabot.webp",
                width: 500,
                height: 500,
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
    },
};


// PriceOutline data remains the same...
const PriceOutline = [
    {
        item: "Upto 20 penalties processed per month",
        es: true,
        ms: true,
        ns: true
    },
    {
        item: "Upto 50 authorities / local councils setup",
        desc: "Able to scan and pay via automation",
        es: true,
        ms: true,
        ns: true
    },
    {
        item: "AI document understanding - processes penalty notices",
        es: true,
        ms: true,
        ns: true
    },
    {
        item: "Automated payments to authorities",
        desc: "Pays the penalties on their websites, uses PCI compliant payments",
        es: true,
        ms: true,
        ns: true
    },

    {
        item: "Simple Appeals process",
        desc: "emails contacts list, waits 48 hours, pays penalty charge if no response.",
        es: true,
        ms: true,
        ns: true
    },
    {
        item: "Upto 100 penalties processed per month",
        es: false,
        ms: true,
        ns: true
    },
    {
        item: "Upto 100 authorities / local councils setup",
        desc: "Able to scan and pay via automation",
        es: false,
        ms: true,
        ns: true
    },
    {
        item: "Web User Interface",
        desc: "In addition to automated emails, a web interface is provided for penalties to be scanned, categorised, searched and archived. Interface also used for users to Appeal. Supports multiple user roles and Role Based Access Control (RBAC)",
        es: false,
        ms: true,
        ns: true
    },
    {
        item: "Customised Appeals workflow",
        desc: "Alphabot emails/messages a maintained list of contacts in your organisation to offer the option to appeal, waits for 48 hours, then pays if no response to appeal is received.",
        es: false,
        ms: false,
        ns: true
    },

    {
        item: "Charts Dashboard",
        desc: "Provides valuable business analysis to track penalties, where and when are they are occurring, count.",
        es: false,
        ms: false,
        ns: true
    },


    {
        item: "Upto 500 penalties processed per month",
        es: false,
        ms: false,
        ns: true
    },
    {
        item: "Upto 150 authorities / local councils setup",
        desc: "Able to scan and pay via automation",
        es: false,
        ms: false,
        ns: true
    },


    {
        item: "500+ penalties processed per month",
        es: false,
        ms: false,
        ns: false
    },
    {
        item: "150+ authorities / local councils setup",
        desc: "Able to scan and pay via automation",
        es: false,
        ms: false,
        ns: false
    },
    {
        item: "AI Insights on occurrences of penalty charges",
        desc: "Includes pattern recognition based  recommendations to reduce number of penalties.",
        es: false,
        ms: false,
        ns: false
    },
];

const TickIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 56 56" fill="none">
        <path d="M22.75 42L7 26.25L9.4745 23.7755L22.75 37.0493L46.5255 13.2755L49 15.75L22.75 42Z" fill="#00fc54" />
    </svg>
);

export default function AlphabotParkingCharge() {
    return (
        <main className="max-w-6xl mx-auto">
            {/* ... (rest of the component above the table remains unchanged) ... */}
            <article className="w-full bg-[var(--primary-5)] flex justify-center items-center mb-12 min-h-[650px] py-4">
                <div className="flex justify-center max-w-[1420px] items-center w-full p-4">
                    <div className="max-w-[1420px]">
                        <h1 className="mt-16 text-4xl text-white font-semibold md:text-5xl">
                            <span className="bg-[var(--primary-5)]">
                                A bot that automatically processes (and pays!) road penalty charges                            </span>{" "}
                            <br className="hidden sm:block" />
                            <br className="hidden sm:block" />
                        </h1>
                        <div className="text-left mb-16">
                            <p className="font-mont text-2xl md:text-xl">
                                Our purpose-designed AI automation frees up teams from
                                losing valuable time appealing and paying
                                Parking/Penalty Charges Notices (PCNs).
                            </p>
                            <br></br>
                            <p className="font-mont text-2xl md:text-xl">
                                Useful for any organisation managing a fleet of
                                vehicles or staff driving on roads. Get your people out of zero
                                value-add clerical and admin and becoming business-productive.
                            </p>
                        </div>


                        <div className="relative flex items-center justify-end ">
                            <div className="relative bg-al-950 border-2 border-al-600 rounded-lg px-4 py-3 w-[350px] text-white  mt-[-100px]">
                                <p className="font-bold">I can appeal and pay penalties from over 150 UK Authorities</p>

                                <div className="absolute right-6 bottom-[-20px] w-0 h-0
                                    border-l-[20px] border-l-transparent
                                    border-r-[20px] border-r-transparent
                                    border-t-[20px] border-t-al-600"></div>

                                <div className="absolute right-6 bottom-[-16px] w-0 h-0
                                    border-l-[18px] border-l-transparent
                                    border-r-[18px] border-r-transparent
                                    border-t-[18px] border-t-al-950"></div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <Image src="/alphabot.webp" alt="PCN" width={120} height={120} />
                            </div>
                        </div>


                        <Button className=" rounded-full">Jump straight to Pricing</Button>
                    </div>
                    <div className="ml-8 rounded-2xl p-1.5 relative w-2/3 flex justify-end items-center hidden md:flex">
                        <Image src="/PCN.jpg" alt="PCN" width={350} height={450} className="rounded-2xl" />
                        <div className="absolute w-[320px] h-[462px] top-1.5 animate-scanner">
                        </div>
                    </div>
                </div>
            </article>

            <section className="w-full px-8 font-mont">
                <h2 className="text-3xl font-bold text-center mt-20">How It Works</h2>

                <div className="flex justify-center items-center max-w-5xl mx-auto my-24 text-left">
                    <div className="min-w-[80px] min-h-[80px] text-black bg-white rounded-full flex justify-center items-center text-2xl font-semibold">1</div>
                    <div className="ml-20 text-2xl md:text-xl flex-1 mr-20">
                        Receive the fine through the post then scan/photograph the document(s).
                    </div>
                    <div className="mr-10 transition-transform duration-500 ease-in-out transform hover:scale-105">
                        <Image src="/Checkbox.png" alt="PCN" width={40} height={40} />
                    </div>
                </div>

                {/* Step 2 */}
                <div className="flex justify-center items-center max-w-5xl mx-auto my-24 text-left relative">
                    <div className="min-w-[80px] min-h-[80px] text-black bg-white rounded-full flex justify-center items-center text-2xl font-semibold">2</div>
                    <div className="ml-20 text-2xl md:text-xl flex-1 mr-20">
                        Based on your configured preferences, Alphabot either immediately pays or challenges the notice.
                    </div>
                    <div className="mr-10 transition-transform duration-500 ease-in-out transform hover:scale-105">
                        <Image src="/Checkbox.png" alt="PCN" width={40} height={40} />
                    </div>
                </div>

                {/* Step 3 */}
                <div className="flex justify-center items-center max-w-5xl mx-auto my-24 text-left">
                    <div className="min-w-[80px] min-h-[80px] text-black bg-white rounded-full flex justify-center items-center text-2xl font-semibold">3</div>
                    <div className="ml-20 text-2xl md:text-xl flex-1 mr-20">
                        Report is sent to users showing all reconciled notices for that day, week, month. Configured to your preference!
                    </div>
                    <div className="mr-10 transition-transform duration-500 ease-in-out transform hover:scale-105">
                        <Image src="/Checkbox.png" alt="PCN" width={40} height={40} />
                    </div>
                </div>


            </section>


            <section className="container mx-auto px-4 max-w-6xl">
                <h2 className="mt-12 text-[2.5rem] font-bold text-center py-4 text-white tracking-wide">
                    Behind every great AI there is a great{" "}
                    <span className=" uppercase">human!</span>

                </h2>
                <div className="flex flex-col md:flex-row items-center gap-20 mx-auto p-2.5 tracking-wide mt-20">
                    <div>
                        <p className="tracking-wide text-2xl md:text-xl">
                            Lewis has studiously built and iterated this AI automation over the last 2 years in live
                            customer environments. As a result it is now highly reliable and useful tool to these organisations.


                        </p>
                        <p className="tracking-wide mt-4 text-2xl md:text-xl">
                            Lewis&apos; role is key in continuous improvement and development (CI/CD),
                            working closely with our ServiceHub and product teams to support current and future
                            deployments.
                        </p>
                        <p className="tracking-wide mt-4 text-2xl md:text-xl">
                            Iterative improvement by Lewis and our team over 2 years in real world operations has led
                            to us being able to now make this AI automation available as an off-the-shelf product to benefit
                            organisations across the UK.
                        </p>
                    </div>
                    <div className="mt-8 md:mt-0 flex-shrink-0">
                        <Image
                            src="/lewis.png"
                            alt="PCN"
                            width={230}
                            height={230}
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </section>

            <section className="border border-[#b3fef7] rounded-lg flex flex-col md:flex-row gap-12 mx-auto max-w-6xl p-10 items-center my-32">
                <div>
                    <h2 className="font-semibold text-2xl mb-4">
                        Live demo of the AI automation processing a Penalty Charge Notice (PCN)
                    </h2>
                </div>
                <div className="w-full md:w-auto flex-shrink-0">
                    <video
                        width="460"
                        height="315"
                        className="rounded-lg shadow-lg w-full md:w-[460px]"
                        controls
                    >
                        <source src="/video1.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </section>

            <section className="mx-auto max-w-6xl my-32 px-4 md:px-6">
                <table className="w-full font-mont text-white border-separate border-spacing-0 mb-2" >
                    <thead>
                        <tr>
                            <th className="w-[40%] md:w-[40%] pl-2 md:pl-4 text-xl md:text-2xl pb-4 md:pb-6 text-left"></th>
                            {["Starter", "Pro", "Enterprise", "Custom"].map((plan) => (
                                <th key={plan} className="w-[15%] pb-4 md:pb-6 text-center">
                                    <div className="relative mx-0.5 md:mx-2">
                                        <div className="absolute inset-0 border border-dashed border-[#0D9B9C] rounded-lg bg-[rgba(2,45,51,0.25)]"></div>
                                        <div className="relative z-10 py-1 text-xs md:text-base font-normal">{plan}</div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-[rgba(2,45,51,0.75)]">
                            <td className="p-1.5 md:p-3 font-semibold text-xs md:text-base">Subscription / Pricing</td>
                            {[
                                { price: "Free" },
                                { price: "£350 month" },
                                { price: "£1,750 month" },
                                { price: "£POA", note: "" }
                            ].map((item, i) => (
                                <td key={i} className="p-1 md:p-2 text-xs text-center relative before:content-[''] before:w-[calc(100%-6px)] md:before:w-[calc(100%-10px)] before:h-full before:left-[3px] md:before:left-[5px] before:z-[-1] before:absolute before:top-[-15px] before:bg-[#0D9B9C] before:rounded-lg first:before:rounded-t-lg last:before:h-[calc(100%+15px)]">
                                    <span className="text-[10px] md:text-xs">{item.price}<br />{item.note}</span>
                                </td>
                            ))}
                        </tr>
                        {PriceOutline.map((item, index) => (
                            <tr key={index} className="hover:bg-[rgba(2,45,51,0.75)] transition-all duration-200 text-[10px] md:text-sm">
                                <td className="p-1 md:p-2 max-w-none relative group align-top">
                                    <span className="block line-clamp-2 md:line-clamp-none">{item.item}</span>

                                    {item.desc && (
                                        <div className="absolute top-full left-0 w-full // Position below, full width
                                                        bg-[#059b9a] text-white // Specific background and text color
                                                        p-1 md:p-2 text-xs // Padding and text size
                                                        opacity-0 invisible group-hover:opacity-100 group-hover:visible // Hover visibility
                                                        transition-opacity duration-300 pointer-events-none z-10 // Smooth transition, non-interactive, ensure overlap
                                                        ">
                                            {item.desc}
                                        </div>
                                    )}
                                </td>
                                <td className="py-1 px-0.5 md:px-2 text-center relative before:content-[''] before:w-[calc(100%-6px)] md:before:w-[calc(100%-10px)] before:h-full before:left-[3px] md:before:left-[5px] before:z-[-1] before:absolute before:top-[-15px] before:bg-[#0D9B9C]">
                                    {item.es && <div className="flex justify-center items-center scale-75 md:scale-100"><TickIcon /></div>}
                                </td>
                                <td className="py-1 px-0.5 md:px-2 text-center relative before:content-[''] before:w-[calc(100%-6px)] md:before:w-[calc(100%-10px)] before:h-full before:left-[3px] md:before:left-[5px] before:z-[-1] before:absolute before:top-[-15px] before:bg-[#0D9B9C]">
                                    {item.ms && <div className="flex justify-center items-center scale-75 md:scale-100"><TickIcon /></div>}
                                </td>
                                <td className="py-1 px-0.5 md:px-2 text-center relative before:content-[''] before:w-[calc(100%-6px)] md:before:w-[calc(100%-10px)] before:h-full before:left-[3px] md:before:left-[5px] before:z-[-1] before:absolute before:top-[-15px] before:bg-[#0D9B9C]">
                                    {item.ns && <div className="flex justify-center items-center scale-75 md:scale-100"><TickIcon /></div>}
                                </td>
                                <td className="py-1 px-0.5 md:px-2 text-center relative before:content-[''] before:w-[calc(100%-6px)] md:before:w-[calc(100%-10px)] before:h-full before:left-[3px] md:before:left-[5px] before:z-[-1] before:absolute before:top-[-15px] before:bg-[#0D9B9C]">
                                    <div className="flex justify-center items-center scale-75 md:scale-100"><TickIcon /></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}

