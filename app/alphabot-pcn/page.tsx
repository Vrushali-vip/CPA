// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// export default function AlphabotPCN() {
//     return (
//         <main>
//             <section className="flex min-h-screen">
//                 <div className="p-4 md:p-8 lg:p-12 xl:p-16 mx-auto my-auto gap-y-8 justify-between align-center flex flex-col lg:flex-row">
//                     <div className="lg:w-2/3 pt-12 md:pt-4">
//                         <h1 className="text-3xl xl:text-5xl font-extrabold mb-6">
//                             A bot that automatically processes (and
//                             pays!) Parking Notices for UK
//                             organisations managing staff on the
//                             roads.
//                         </h1>
//                         <p className="font-mono py-3">
//                             Our purpose-designed bot frees up teams from losing valuable time
//                             dealing with the processing, challenging and payment of Parking/Penalty Charges
//                             Notices (PCN’s).
//                         </p>
//                         <p className="font-mono py-3 mb-8">
//                             Get your fleet, finance and operations teams out of zero
//                             value-add clerical and admin, and let Alphabot to the work for you.
//                         </p>
//                         <Button>Jump straight to Pricing</Button>
//                     </div>
//                     <div className="mx-auto w-4/5 sm:w-2/5 lg:w-1/3 max-w-xs pt-8">
//                         <div className="pcn">
//                             <Image src="/parking-charge.jpg" className="mx-auto" alt="Parking Charge Notice" width={500} height={500} />
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </main>
//     );
// }

import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Parking Charge Notice",
};

export default function AlphabotParkingCharge() {
    return (
        <main className="max-w-6xl mx-auto">
            <article className="w-full bg-[var(--primary-5)] flex justify-center items-center mb-12 min-h-[650px] py-4">
                <div className="flex justify-center max-w-[1420px] items-center w-full p-4">
                    <div className="max-w-[1420px]">
                        <h1 className="mt-16 text-4xl text-white font-semibold md:text-5xl">
                            <span className="bg-[var(--primary-5)]">
                                A bot that automatically processes &#40;and pays!&#41; Parking
                            </span>{" "}
                            <br className="hidden sm:block" />
                            <span className="bg-[var(--primary-5)]">  Notices for UK  organisations</span>
                            <br className="hidden sm:block" />
                            <span className="bg-[var(--primary-5)]">
                                managing staff on the
                            </span>
                            <br className="hidden sm:block" />
                            <span className="bg-[var(--primary-5)]">roads.</span>
                        </h1>
                        <br />
                        <div className="text-left mb-16">
                            <br />
                            <p className="font-robo text-sm md:text-base">
                                Our purpose-designed bot frees up teams from losing valuable
                                time dealing with the processing, challenging and payment of
                                Parking/Penalty Charges Notices (PCNs).
                            </p>
                            <p className="font-robo text-sm md:text-base">
                                Get your fleet, finance and operations teams out of zero
                                value-add clerical and admin, and let Alphabot to the work for
                                you.
                            </p>
                        </div>
                        <Button className="text-black rounded-full">Jump straight to Pricing</Button>
                    </div>
                    <div className="ml-8 rounded-2xl p-1.5 relative w-2/3 flex justify-end items-center hidden md:flex">
                        <Image src="/PCN.jpg" alt="PCN" width={350} height={450} className="rounded-2xl" />
                        <div className="absolute w-[350px] h-[452px] top-1.5 animate-scanner">
                        </div>
                    </div>
                </div>
            </article>

            <section className="container mx-auto px-4 font-mont">
                {/* Step 1 */}
                <div className="flex justify-center items-center max-w-2xl mx-auto my-24 text-left">
                    <div className="min-w-[80px] min-h-[80px] text-black bg-white rounded-full flex justify-center items-center text-2xl font-semibold">1</div>
                    <div className="mx-8 flex-1">
                        Receive the fine through the post then scan/photograph the
                        document(s).
                    </div>
                    <div className="transition-transform duration-500 ease-in-out transform hover:scale-105">
                        <Image src="/Checkbox.png" alt="PCN" width={40} height={40} />
                    </div>
                </div>

                {/* Step 2 */}
                <div className="flex justify-center items-center max-w-2xl mx-auto my-24 text-left relative">
                    <div className="min-w-[80px] min-h-[80px] text-black bg-white rounded-full flex justify-center items-center text-2xl font-semibold">2</div>
                    <div className="mx-8 flex-1">
                        Based on your configured preferences, Alphabot either immediately
                        pays or challenges the notice.
                    </div>
                    <div className="transition-transform duration-500 ease-in-out transform hover:scale-105">
                        <Image src="/Checkbox.png" alt="PCN" width={40} height={40} />
                    </div>
                    <div className="absolute -left-72 hidden lg:block">
                        <Image src="/alphabot.webp" alt="PCN" width={200} height={200} />
                    </div>
                </div>

                {/* Step 3 */}
                <div className="flex justify-center items-center max-w-2xl mx-auto my-24 text-left">
                    <div className="min-w-[80px] min-h-[80px] text-black bg-white rounded-full flex justify-center items-center text-2xl font-semibold">3</div>
                    <div className="mx-8 flex-1">
                        Report is sent to users showing all reconciled notices for that day,
                        week, month. Configured to your preference!
                    </div>
                    <div className="transition-transform duration-500 ease-in-out transform hover:scale-105">
                        <Image src="/Checkbox.png" alt="PCN" width={40} height={40} />
                    </div>
                </div>

                {/* Stats Section */}
                <div className="my-16 flex justify-center text-left font-mont max-w-3xl mx-auto">
                    <p>
                        <span className="bg-primary text-2xl inline-block px-2">
                            Thanks to a 2 years of development and refining,
                        </span>
                        <br />
                        <span className="bg-primary text-2xl inline-block px-2 mt-2">Alphabot-PCN…</span>
                        <br />
                        <br />
                        <span className="bg-primary text-2xl inline-block px-2">
                            It is now able to process, challenge and pay notices received
                        </span>
                        <br />
                        <span className="bg-primary text-2xl inline-block px-2 mt-2">from a massive…</span>
                        <br />
                        <br />
                        <span className="bg-primary text-2xl font-semibold relative inline-block px-2">
                            91 UK Authorities and Councils ! !
                            <span className="absolute -bottom-14 -right-24 text-4xl">🤯</span>
                        </span>
                        <br />
                        <br />
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 max-w-6xl">
                <h2 className="mt-12 text-[2.5rem] font-bold text-center py-4 text-white tracking-wide">
                    Meet the{" "}
                    <span className="text-[#03a9f4] uppercase">human</span>
                    {" "}behind the bot!
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-20 mx-auto p-2.5 tracking-wide">
                    <div>
                        <p className="tracking-wide">
                            Lewis Urwin has carefully built and tweaked this bot over 2 years
                            to become a highly reliable and useful tool to our customers.
                            Lewis continues to play a key role in its continuous development
                            and works closely with our ServiceHub team to support the current
                            deployed versions and our product/project team on ensuring it
                            undergoes continuous improvement and development (CI/CD).
                        </p>
                        <p className="tracking-wide mt-4">
                            Iterative improvement by Lewis and colleagues over 2 years has
                            been key the bot being ready to be made available now to the wider
                            UK market.
                        </p>
                    </div>
                    <div className="mt-8 md:mt-0 flex-shrink-0">
                        <Image
                            src="/Lewis_Urwin.jpeg"
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
                        Live demo of how <span className="pcn-grad">PCN</span> works
                    </h2>
                    <p className="text-base leading-relaxed">
                        In this video, Olly and Lewis delve into the innovative world of
                        automatic parking charge notices, a project they have been tirelessly
                        working on. With their cutting-edge technology, they have
                        revolutionized the way people deal with parking fines. Through
                        intricate algorithms and seamless integration with payment systems,
                        their solution automatically detects and pays parking charges
                        without any hassle for the user.
                    </p>
                </div>
                <div className="w-full md:w-auto flex-shrink-0">
                    <iframe
                        width="460"
                        height="315"
                        src="https://www.youtube.com/embed/9QIZgrLi1T4?si=4yGZvQoC7JVa7f4Y"
                        title="YouTube video player"
                        className="rounded-lg shadow-lg w-full md:w-[460px]"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>
            </section>
        </main>
    );
}