import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";


import { Suspense } from "react";
import NavbarClient from "./NavbarClient";


export default async function Navbar() {


    return <nav className="p-2 lg:px-4 bg-background w-full fixed lg:sticky dark:border-b top-0 z-50">
        <div className="flex align-center justify-between gap-4 w-full">
            <Link href="/" className="line-height-0">
                <Image src="/Alphalake_Services_NonW.png" width={250} height={100} className="dark:hidden" alt="Alphalake Services" />
                <Image src="/Alphalake_Services_W.png" width={250} height={100} className="hidden dark:block" alt="Alphalake Services" />
            </Link>
            <div className="flex-grow">
                <div className="flex align-center">
                    <input type="checkbox" id="sidebar" className="hidden" />
                    <div className="absolute sidebar-panel right-0 top-0 pt-2 lg:pt-1 bg-card lg:bg-transparent min-h-screen lg:min-h-0 lg:px-3 lg:pb-1 rounded-md  lg:relative lg:flex gap-x-6 mx-auto flex-col lg:flex-grow lg:flex-row">
                        <div className="w-full flex mb-2 lg:hidden">
                            <label htmlFor="sidebar" className="ml-auto mr-2 cursor-pointer">
                                <X />
                            </label>
                        </div>
                        <div className="group/ms relative pl-3 lg:pl-0 lg:mt-2 lg:ml-auto">
                            <div className="font-semibold group-hover/ms:text-primary flex align-center gap-1 hover:cursor-pointer">
                                <span className="text-nowrap">
                                    Build
                                </span>
                                <ChevronDown className="group-hover/ms:rotate-180 transition-transform duration-300" size={18} />
                            </div>
                            <div className="lg:absolute max-h-0 group-hover/ms:max-h-[300px] transition-transform nesteds overflow-hidden lg:py-1 lg:scale-0 group-hover/ms:scale-100 bg-card  duration-300 rounded-md origin-top-left lg:shadow-lg w-fit top-6 left-[-10px] right-0">
                                <ul className="w-full">
                                <li className="w-full">
                                        <Link href="/build-api" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">APIs</Link>
                                    </li>
                                    <li className="w-full">
                                        <Link href="/services/managed-services" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">Automation / App Connectors</Link>
                                    </li>
                                    <li className="w-full">
                                        <Link href="/services/managed-services" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">User Centred Design</Link>
                                    </li>
                                    <li className="w-full">
                                        <Link href="/services/managed-services" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">Process Optimisation</Link>
                                    </li>
                                    <li className="w-full">
                                        <Link href="/services/managed-services" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">Custom Apps</Link>
                                    </li>
                                    <li className="w-full">
                                        <Link href="/services/managed-services" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">Custom automation Recipes</Link>
                                    </li>
                                    <li className="w-full">
                                        <Link href="/services/managed-services" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">Custom Bots</Link>
                                    </li>
                                    <li className="w-full">
                                        <Link href="/services/managed-services" className="px-2 py-1 text-nowrap block text-sm hover:text-primary"> Services Rates Card</Link>
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>
                        <div className="mt-2 border-t lg:border-none pt-2 lg:pt-0 group/b relative pl-3 lg:pl-0">
                            <div className="font-semibold group-hover/b:text-primary flex align-center gap-1 hover:cursor-pointer">
                                <span>
                                    Support
                                </span>
                                <ChevronDown className="group-hover/b:rotate-180 transition-transform duration-300" size={18} />
                            </div>
                            <div className="lg:absolute max-h-0 group-hover/b:max-h-[300px] transition-transform nesteds overflow-hidden lg:py-1 lg:scale-0 group-hover/b:scale-100 bg-card duration-300 rounded-md origin-top-left lg:shadow-lg w-fit top-6 left-[-10px] right-0">
                                <ul className="w-full">
                                <li className="w-full">
                                        <Link href="/services/managed-services" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">{'24/7 "eyes on glass" premium support'}</Link>
                                    </li>
                                    <li className="w-full">
                                        <Link href="/servicehub" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">ServiceHub Portal</Link>
                                    </li>
                                    <li className="w-full">
                                        <Link href="/services/managed-services" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">Process-as-a-Service</Link>
                                    </li>
                                    <li className="w-full">
                                        <Link href="/support/integration-as-a-service" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">Integration-as-a-service</Link>
                                    </li>
                                    <li className="w-full">
                                        <Link href="/services/managed-services" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">Solution Support</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-2 border-t lg:border-none pt-2 lg:pt-0 group/t relative pl-3 lg:pl-0">
                            <div className="font-semibold group-hover/t:text-primary flex align-center gap-1 hover:cursor-pointer">
                                <span>
                                    Train
                                </span>
                                <ChevronDown className="group-hover/t:rotate-180 transition-transform duration-300" size={18} />
                            </div>
                            <div className="lg:absolute max-h-0 group-hover/t:max-h-[300px] transition-transform nesteds overflow-hidden lg:py-1 lg:scale-0 group-hover/t:scale-100 bg-card duration-300 rounded-md origin-top-left lg:shadow-lg w-fit top-6 left-[-10px] right-0">
                                <ul className="w-full">
                                    <li className="w-full">
                                        <Link href="/services/managed-services" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">UK Reskilling Partnership</Link>
                                    </li>
                                    <li className="w-full">
                                        <Link href="/services/managed-services" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">Online automation courses</Link>
                                    </li>
                                    <li className="w-full">
                                        <Link href="/services/managed-services" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">In-person automation courses</Link>
                                    </li>
                                    <li className="w-full">
                                        <Link href="/services/managed-services" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">Hybrid automation courses</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-2 border-t lg:border-none pt-2 lg:pt-0 group/a relative pl-3 lg:pl-0">
                            <div className="font-semibold group-hover/a:text-primary flex align-center gap-1 hover:cursor-pointer">
                                <span>
                                    Bots
                                </span>
                                <ChevronDown className="group-hover/a:rotate-180 transition-transform duration-300" size={18} />
                            </div>
                            <div className="lg:absolute max-h-0 group-hover/a:max-h-[300px] transition-transform nesteds overflow-hidden lg:py-1 lg:scale-0 group-hover/a:scale-100 bg-card duration-300 rounded-md origin-top-left lg:shadow-lg w-fit top-6 left-[-10px] right-0">
                                <ul className="w-full">
                                    <li className="w-full">
                                        <Link href="/services/managed-services" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">Penalty charge pay&appeal bot</Link>
                                    </li>
                                    <li className="w-full">
                                        <Link href="/services/managed-services" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">NHS Hospital Patient Administration bot</Link>
                                    </li>
                                    <li className="w-full">
                                        <Link href="/services/managed-services" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">HMRC Imports Tariff Lookup bot</Link>
                                    </li>
                                    <li className="w-full">
                                        <Link href="/services/managed-services" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">Health Insurance Backoffice Bot</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-2 border-t lg:border-none pt-2 lg:pt-0 group/a relative pl-3 lg:pl-0">
                            <div className="font-semibold group-hover/a:text-primary flex align-center gap-1 hover:cursor-pointer">
                                <span>
                                    Recipes
                                </span>
                                <ChevronDown className="group-hover/a:rotate-180 transition-transform duration-300" size={18} />
                            </div>
                            <div className="lg:absolute max-h-0 group-hover/a:max-h-[300px] transition-transform nesteds overflow-hidden lg:py-1 lg:scale-0 group-hover/a:scale-100 bg-card duration-300 rounded-md origin-top-left lg:shadow-lg w-fit top-6 left-[-10px] right-0">
                                <ul className="w-full">
                                    <li className="w-full">
                                        <Link href="/recipes/cost-center" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">ServiceNow to SAP Cost Centres recipe</Link>
                                    </li>
                                    <li className="w-full">
                                        <Link href="/recipes/vendor-management" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">ServiceNow to SAP Vendor Mgmt recipe </Link>
                                    </li>
                                    <li className="w-full">
                                        <Link href="/recipes/hubspot-revops" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">HubSpot RevOps recipe</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-2 border-t lg:border-none pt-2 lg:pt-0 group/a relative pl-3 lg:pl-0">
                            <div className="font-semibold group-hover/a:text-primary flex align-center gap-1 hover:cursor-pointer">
                                <span>
                                    Apps
                                </span>
                                <ChevronDown className="group-hover/a:rotate-180 transition-transform duration-300" size={18} />
                            </div>
                            <div className="lg:absolute max-h-0 group-hover/a:max-h-[300px] transition-transform nesteds overflow-hidden lg:py-1 lg:scale-0 group-hover/a:scale-100 bg-card duration-300 rounded-md origin-top-left lg:shadow-lg w-fit top-6 left-[-10px] right-0">
                                <ul className="w-full">
                                    <li className="w-full">
                                        <Link href="/services/managed-services" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">Employee Onboarding workflow</Link>
                                    </li>
                                    <li className="w-full">
                                        <Link href="/services/managed-services" className="px-2 py-1 text-nowrap block text-sm hover:text-primary">Patient Tracking workflow</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        
                        <div className="mt-2 border-t lg:border-none pt-2 lg:pt-0 lg:mt-0 lg:ml-auto">
                            <Suspense>
                                <NavbarClient />
                            </Suspense>
                        </div>
                    </div>
                    <label htmlFor="sidebar" className="ml-auto lg:hidden cursor-pointer">
                        <Menu />
                    </label>
                </div>
            </div>
        </div>
    </nav>
}