import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { Suspense } from "react";
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "lucide-react";

export default function Footer() {
    return (
        <footer>
            <div className="mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
                <div className="flex justify-center">
                    <Image src="/logo-light.png" width={300} height={100} className="dark:hidden" alt="Alphalake Services" />
                    <Image src="/logo-dark.png" width={300} height={100} className="hidden dark:block" alt="Alphalake Services" />
                </div>
                <div className="flex flex-wrap gap-8 justify-center my-24">
                    <div className="bg-white border rounded-full w-32 h-32 grid place-items-center p-2 overflow-hidden" title="Crown Commercial Service Supplier">
                        <Image src="/ccss-bg.png" width={200} height={200} className="object-contain" alt="Crown Commercial Service Supplier" />
                    </div>
                    <div className="bg-white border rounded-full w-32 h-32 grid place-items-center p-2 overflow-hidden" title="HM Government G-Cloud Supplier">
                        <Image src="/g-cloud-logo.svg" width={200} height={200} className="object-contain" alt="HM Government G-Cloud Supplier" />
                    </div>
                    <div className="bg-white border rounded-full w-32 h-32 grid place-items-center p-4 overflow-hidden" title="NHS Digital">
                        <Image src="/nhs-bg.png" width={200} height={200} className="object-contain" alt="NHS Digital" />
                    </div>
                    <div className="bg-white border rounded-full w-32 h-32 grid place-items-center p-4 overflow-hidden" title="Information Commissioner's Office Registered">
                        <Image src="/ico.png" width={200} height={200} className="object-contain" alt="Information Commissioner's Office Registered" />
                    </div>
                    <div className="bg-white border rounded-full w-32 h-32 grid place-items-center p-2 overflow-hidden" title="Robocorp Tier 1 Partner">
                        <Image src="/robocorp-partner.png" width={200} height={200} className="object-contain" alt="Robocorp Tier 1 Partner" />
                    </div>
                    <div className="bg-white border rounded-full w-32 h-32 grid place-items-center p-2 overflow-hidden" title="Workato Gold Partner">
                        <Image src="/workato-gold.png" width={200} height={200} className="object-contain" alt="Workato Gold Partner" />
                    </div>
                    <div className="bg-white border rounded-full w-32 h-32 grid place-items-center p-2 overflow-hidden" title="ISO 9001 Certified">
                        <Image src="/iso1-bg.png" width={200} height={200} className="object-contain" alt="ISO 9001 Certified" />
                    </div>
                    <div className="bg-white border rounded-full w-32 h-32 grid place-items-center p-2 overflow-hidden" title="ISO 14001 Certified">
                        <Image src="/iso2-bg.png" width={200} height={200} className="object-contain" alt="ISO 14001 Certified" />
                    </div>
                    <div className="bg-white border rounded-full w-32 h-32 grid place-items-center p-2 overflow-hidden" title="Cyber Essentials Certified">
                        <Image src="/cyber_essentials.png" width={200} height={200} className="object-cover" alt="Cyber Essentials Certified" />
                    </div>
                </div>
                <div className="grid max-w-7xl mx-auto justify-between grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    <div>
                        <h4 className="capitalize font-semibold">RESOURCES</h4>
                        <ul className="text-muted-foreground space-y-2 pt-3 text-sm">
                            <li className="transition-all hover:text-primary-foreground hover:tracking-wider">
                                <Link href="#" >Knowledge Base</Link>
                            </li>
                            <li className="transition-all hover:text-primary-foreground hover:tracking-wider">
                                <Link href="#" >Case Studies</Link>
                            </li>
                            <li className="transition-all hover:text-primary-foreground hover:tracking-wider">
                                <Link href="#" >Insights, Articles &amp; Blogs</Link>
                            </li>
                            <li className="transition-all hover:text-primary-foreground hover:tracking-wider">
                                <Link href="#" >Partner Programme</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="capitalize font-semibold">COMPANY</h4>
                        <ul className="text-muted-foreground space-y-2 pt-3 text-sm">
                            <li className="transition-all hover:text-primary-foreground hover:tracking-wider">
                                <Link href="/about-us" >About Us</Link>
                            </li>
                            <li className="transition-all hover:text-primary-foreground hover:tracking-wider">
                                <Link href="#" >Careers</Link>
                            </li>
                            <li className="transition-all hover:text-primary-foreground hover:tracking-wider">
                                <Link href="#" >Contact</Link>
                            </li>
                            <li className="transition-all hover:text-primary-foreground hover:tracking-wider">
                                <Link href="#" >Terms &amp; Conditions</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="capitalize font-semibold">COMMUNICATIONS</h4>
                        <p className="text-sm text-muted-foreground mt-3">Subscribe to Our Newsletter</p>
                        <div className="mt-3">
                            <Suspense>
                                <NewsletterForm />
                            </Suspense>
                        </div>
                    </div>
                </div>
                <hr className="mt-8 mb-4" />
                <div className="flex justify-between flex-wrap mb-4">
                    <div className="flex gap-3 text-sm flex-wrap text-muted-foreground">
                        <Link className="hover:text-primary" href="https://alphalake.ai" target="_blank">Alphalake Technologies</Link>
                        <Link className="hover:text-primary" href="#">Sitemap</Link>
                        <Link className="hover:text-primary" href="#" target="_blank">UK Modern Slavery</Link>
                        <Link className="hover:text-primary" href="#" target="_blank">Legal</Link>
                        <Link className="hover:text-primary" href="#" target="_blank">Privacy Policy</Link>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        <Link className="p-1 rounded-md hover:bg-primary-foreground hover:text-primary" target="_blank" href="https://www.facebook.com/AlphalakeAi/">
                            <FacebookIcon />
                        </Link>
                        <Link className="p-1 rounded-md hover:bg-primary-foreground hover:text-primary" target="_blank" href="https://twitter.com/AlphalakeAi">
                            <TwitterIcon />
                        </Link>
                        <Link className="p-1 rounded-md hover:bg-primary-foreground hover:text-primary" target="_blank" href="https://www.instagram.com/alphalake_ai/">
                            <InstagramIcon />
                        </Link>
                        <Link className="p-1 rounded-md hover:bg-primary-foreground hover:text-primary" target="_blank" href="https://www.linkedin.com/company/alphalake/">
                            <LinkedinIcon />
                        </Link>
                        <Link className="p-1 rounded-md hover:bg-primary-foreground hover:text-primary" target="_blank" href="https://www.youtube.com/channel/UCCOu5vcJ6AZ-lkTs3s7-YKA">
                            <YoutubeIcon />
                        </Link>
                    </div>
                </div>
                <div className="text-center font-robo text-muted-foreground space-y-4 pt-4">
                    <p>
                        <span className="font-semibold">Alphalake Services </span> 
                        is the managed services arm of 
                        <span className="font-semibold"> Alphalake Technologies Ltd </span> 
                        and 
                        <span className="font-semibold"> Alphalake Technologies India Pvt Ltd.</span>
                    </p>
                    <p>
                        <span className="text-2xl">&copy;</span> {new Date().getFullYear()} Alphalake Technologies Ltd. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}