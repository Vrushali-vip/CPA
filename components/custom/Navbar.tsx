
"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, ChevronDown, ChevronUp } from "lucide-react";
import { Suspense } from "react";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface Country {
  code: string;
  name: string;
  flag: string;
}

const countries: Country[] = [
  { code: "uk", name: "UK", flag: "/uk_flag.jpg" },
  { code: "ind", name: "INDIA", flag: "/ind_flag.png" },
];

function NavbarClient() {
  const session = useSession();
  const { toast } = useToast();
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsCountryMenuOpen(false);

    if (country.code === "ind") {
      router.push("/india");
    } else if (country.code === "uk") {
      router.push("/");
    }
  };

  const onLogOutClick = () => {
    signOut();
    toast({
      title: "Logged out",
      description: "You have been logged out.",
    });
  };

  // const isAdminOrSupport =
  //   session?.data?.user?.role === "ADMIN" ||
  //   session?.data?.user?.role === "SUPPORT";

  const getRegionSpecificMenu = () => {
    const isIndia = selectedCountry.code === "ind";
    return (
      <>
        <div className="group/ms relative pl-3 lg:pl-0 lg:mt-2 lg:ml-auto">
          <div className="font-semibold group-hover/ms:text-primary flex align-center gap-1 hover:cursor-pointer">
            <span className="text-nowrap">Design</span>
            <ChevronDown
              className="group-hover/ms:rotate-180 transition-transform duration-300"
              size={18}
            />
          </div>
          <div className="lg:absolute max-h-0 group-hover/ms:max-h-[300px] transition-transform nesteds overflow-hidden lg:py-1 lg:scale-0 group-hover/ms:scale-100 bg-card duration-300 rounded-md origin-top-left lg:shadow-lg w-fit top-6 left-[-10px] right-0">
            <ul className="w-full">
              <li className="w-full">
                <Link
                  href={isIndia ? "/design/process-design-workshop-india" : "design/process-design-workshop"}
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Process design workshop
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={isIndia ? "/design/user-design-workshop-india" : "/design/user-design-workshop"}
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  User design workshop
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={isIndia ? "/design/product-definition-workshop-india" : "/design/product-definition-workshop"}
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Product definition workshop
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={isIndia ? "/design/design-as-a-service-india" : "/design/design-as-a-service"}
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Design-as-a-Service
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={isIndia ? "/design/design-pricing-india" : "/design/managed-services"}
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Design Pricing                
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-2 border-t lg:border-none pt-2 lg:pt-0 group/train-india relative pl-3 lg:pl-0">
          <div className="font-semibold group-hover/train-india:text-primary flex align-center gap-1 hover:cursor-pointer">
            <span className="text-nowrap">Build</span>
            <ChevronDown
              className="group-hover/train-india:rotate-180 transition-transform duration-300"
              size={18}
            />
          </div>
          <div className="lg:absolute max-h-0 group-hover/train-india:max-h-[300px] transition-transform nesteds overflow-hidden lg:py-1 lg:scale-0 group-hover/train-india:scale-100 bg-card duration-300 rounded-md origin-top-left lg:shadow-lg w-fit top-6 left-[-10px] right-0">
            <ul className="w-full">
              <li className="w-full">
                <Link
                  href="/build/connect-ai-to-your-data"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  {'Connect AI to your data'}
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/build/your-custom-automation"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Your custom Automation
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/build/your-custom-integration"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Your custom Integration
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/build/your-market-facing-api"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Your market-facing API
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/build/your-no-code-connector"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Your no-code Connector
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/build/your-custom-app"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Your custom App
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/build/build-as-a-service"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Build-as-a-Service
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/build/build-pricing"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Build Pricing
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-2 border-t lg:border-none pt-2 lg:pt-0 group/train-india relative pl-3 lg:pl-0">
          <div className="font-semibold group-hover/train-india:text-primary flex align-center gap-1 hover:cursor-pointer">
            <span className="text-nowrap">Support</span>
            <ChevronDown
              className="group-hover/train-india:rotate-180 transition-transform duration-300"
              size={18}
            />
          </div>
          <div className="lg:absolute max-h-0 group-hover/train-india:max-h-[300px] transition-transform nesteds overflow-hidden lg:py-1 lg:scale-0 group-hover/train-india:scale-100 bg-card duration-300 rounded-md origin-top-left lg:shadow-lg w-fit top-6 left-[-10px] right-0">
            <ul className="w-full">
              <li className="w-full">
                <Link
                  href="/support/premium-support"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  {'Premium Support (24/7)'}
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/servicehub"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Alphalake Services Hub
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/support/process-support"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Process Support
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/support/integration-as-a-service"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Integration Support
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/support/solution-support"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                 Solution Support
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/support/support-pricing"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                 Support Pricing
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Train Menu */}
        <div className="mt-2 border-t lg:border-none pt-2 lg:pt-0 group/train-india relative pl-3 lg:pl-0">
          <div className="font-semibold group-hover/train-india:text-primary flex align-center gap-1 hover:cursor-pointer">
            <span className="text-nowrap">Train</span>
            <ChevronDown
              className="group-hover/train-india:rotate-180 transition-transform duration-300"
              size={18}
            />
          </div>
          <div className="lg:absolute max-h-0 group-hover/train-india:max-h-[300px] transition-transform nesteds overflow-hidden lg:py-1 lg:scale-0 group-hover/train-india:scale-100 bg-card duration-300 rounded-md origin-top-left lg:shadow-lg w-fit top-6 left-[-10px] right-0">
            <ul className="w-full">
              <li className="w-full">
                <Link
                  href={isIndia ? "/train/india-workshops" : "/train/uk-reskilling-partnership"}
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  {isIndia ? "Online automation courses" : "Reskilling in Wales"}
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={isIndia ? "/train/india-workshops" : "/train/"}
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  {isIndia ? "In-person automation courses " : "Online AI Automation Courses"}
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={isIndia ? "/services/india-workshops" : "/train/"}
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  {isIndia ? "Hybrid automation courses" : "Customer Mentoring/Handover"}
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={isIndia ? "/train/training-pricing-india" : "/train/training-pricing"}
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  {isIndia ? "" : "Training Pricing "}
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
        {/* Bots Menu */}
        <div className="mt-2 border-t lg:border-none pt-2 lg:pt-0 group/bots-india relative pl-3 lg:pl-0">
          <div className="font-semibold group-hover/bots-india:text-primary flex align-center gap-1 hover:cursor-pointer">
            <span className="text-nowrap">Alpha-bots</span>
            <ChevronDown
              className="group-hover/bots-india:rotate-180 transition-transform duration-300"
              size={18}
            />
          </div>
          <div className="lg:absolute max-h-0 group-hover/bots-india:max-h-[300px] transition-transform nesteds overflow-hidden lg:py-1 lg:scale-0 group-hover/bots-india:scale-100 bg-card duration-300 rounded-md origin-top-left lg:shadow-lg w-fit top-6 left-[-10px] right-0">
            <ul className="w-full">
              {isIndia ? (
                <li className="w-full">
                  <Link
                    href="/alpha-bots/health-insurance-backoffice-bot"
                    className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                  >
                    Health Insurance Backoffice Bot
                  </Link>
                </li>
              ) : (
                <>
                <li className="w-full">
                    <Link
                      href="/alphabots/penalty-charge-notices"
                      className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                    >
                      Penalty Charge Notices
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link
                      href="/alphabots/nhs-hospital-patient-admin"
                      className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                    >
                      NHS Hospital Patient Admin
                    </Link>
                  </li>
                  
                  <li className="w-full">
                    <Link
                      href="/alphabots/hmrc-import-lookup"
                      className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                    >
                      HMRC Import Lookup
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link
                      href="/alphabots/snow-to-sap-sync"
                      className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                    >
                      SNow to SAP sync
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link
                      href="/alphabots/recipes"
                      className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                    >
                      Recipes
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Apps Menu */}
        <div className="mt-2 border-t lg:border-none pt-2 lg:pt-0 group/apps-india relative pl-3 lg:pl-0">
          <div className="font-semibold group-hover/apps-india:text-primary flex align-center gap-1 hover:cursor-pointer">
            <span className="text-nowrap">Alpha-apps</span>
            <ChevronDown
              className="group-hover/apps-india:rotate-180 transition-transform duration-300"
              size={18}
            />
          </div>
          <div className="lg:absolute max-h-0 group-hover/apps-india:max-h-[300px] transition-transform nesteds overflow-hidden lg:py-1 lg:scale-0 group-hover/apps-india:scale-100 bg-card duration-300 rounded-md origin-top-left lg:shadow-lg w-fit top-6 left-[-10px] right-0">
            <ul className="w-full">
              <li className="w-full">
                <Link
                  href="/alpha-appa/employee-onboarding"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Employee onboarding
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/alpha-apps/pharmacy-billing-portal"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Pharmacy billing portal 
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/alpha-apps/sigma-patient-waiting-lists"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Sigma (patient waiting lists)
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/alpha-apps/rate-my-shift-healthcare"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  RateMyShift (healthcare)
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };

  return (
    <nav className="p-2 lg:px-4 bg-background w-full fixed lg:sticky dark:border-b top-0 z-50 flex items-center">
      <div className="flex align-center justify-between gap-4 w-full">
        <Link href="/" className="line-height-0">
          <Image
            src="/Alphalake_services.png"
            width={250}
            height={100}
            className="dark:hidden mt-2"
            alt="Alphalake Services"
          />
          <Image
            src="/Alphalake_Services_W.png"
            width={250}
            height={100}
            className="hidden dark:block mt-2"
            alt="Alphalake Services"
          />
        </Link>
        <div className="flex-grow">
          <div className="flex align-center">
            <input type="checkbox" id="sidebar" className="hidden" />
            <div className="absolute sidebar-panel right-0 top-0 pt-2 lg:pt-1 bg-card lg:bg-transparent min-h-screen lg:min-h-0 lg:px-3 lg:pb-1 rounded-md lg:relative lg:flex gap-x-6 mx-auto flex-col lg:flex-grow lg:flex-row">
              <div className="w-full flex mb-2 lg:hidden">
                <label htmlFor="sidebar" className="ml-auto mr-2 cursor-pointer">
                  <X />
                </label>
              </div>

              {getRegionSpecificMenu()}

              <div className="mt-2 border-t lg:border-none pt-2 lg:pt-0 lg:mt-0 lg:ml-auto">
                <div className="flex items-center gap-4">
                  <div
                    style={{ width: "150px", flexShrink: 0 }}
                    ref={countryDropdownRef}
                    className={`relative transition-transform duration-300 ease-in-out`}
                  >
                    <div
                      className="flex items-center gap-1 cursor-pointer text-primary px-2 py-1"
                      onClick={() => setIsCountryMenuOpen((prev) => !prev)}
                    >
                      <Image
                        src={selectedCountry.flag}
                        alt={selectedCountry.name}
                        width={24}
                        height={24}
                        className="rounded-full object-cover object-center bg-background"
                        style={{
                          borderRadius: "50%",
                          aspectRatio: "1/1",
                          width: "24px",
                          height: "24px",
                        }}
                      />
                      <span style={{ marginLeft: "4px" }}>
                        {selectedCountry.name}
                      </span>
                      {isCountryMenuOpen ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </div>
                    <div
                      className={`absolute top-full left-0 mt-1 bg-background text-primary shadow-md border rounded-md z-50 w-32
                      ${isCountryMenuOpen ? "block" : "hidden"} overflow-auto`}
                      style={{
                        maxHeight: "200px",
                        overflowY: "auto",
                      }}
                    >
                      {countries.map((country) => (
                        <div
                          key={country.code}
                          onClick={() => handleCountrySelect(country)}
                          className="flex items-center gap-2 cursor-pointer px-3 py-2"
                        >
                          <Image
                            src={country.flag}
                            alt={country.name}
                            width={24}
                            height={24}
                            className="rounded-full object-cover object-center"
                            style={{
                              borderRadius: "50%",
                              aspectRatio: "1/1",
                              width: "24px",
                              height: "24px",
                            }}
                          />
                          {country.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {session?.data?.user ? (
                    <div
                      className="relative  mr-2"
                      style={{
                        minWidth: "fit-content",
                        flexShrink: 0,
                        marginLeft: "auto",
                      }}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center gap-2 p-1 rounded-full bg-primary transition">
                            {session?.data?.user?.image ? (
                              <Image
                                width={50}
                                height={50}
                                src={session.data.user.image}
                                className="w-7 h-7 rounded-full object-cover"
                                alt="User avatar"
                              />
                            ) : (
                              <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
                                <User className="w-5 h-5 text-primary" />
                              </div>
                            )}
                            {isDropdownOpen ? (
                              <ChevronUp
                                size={16}
                              />
                            ) : (
                              <ChevronDown
                                size={16}
                              />
                            )}
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>My Servicehub Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {/* <DropdownMenuItem>
                            <Link
                              href="/dashboard"
                              className="w-full cursor-pointer"
                            >
                              OpsInsight
                            </Link>
                          </DropdownMenuItem> */}
                          {/* {!isAdminOrSupport && (
                            <DropdownMenuItem asChild>
                              <Link
                                href="/servicehub"
                                className="w-full cursor-pointer"
                              >
                                ServiceHub
                              </Link>
                            </DropdownMenuItem>
                          )} */}
                          
                          <DropdownMenuItem>
                            <Link
                              href="/profile"
                              className="w-full cursor-pointer"
                            >
                              Profile
                            </Link>
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem asChild>
                            <button
                              className="w-full cursor-pointer"
                              onClick={onLogOutClick}
                            >
                              Log Out
                            </button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ) : (
                    <Link
                      href="/servicehub"
                      className="text-primary hover:cursor-pointer mr-3"
                    >
                      Log in
                    </Link>
                  )}

                  <Button
                    variant="default"
                    className="ml-2 lg:ml-auto rounded-full px-4"
                    size="sm"
                  >
                    Book A Demo
                  </Button>
                </div>
              </div>
            </div>
            <label
              htmlFor="sidebar"
              className="ml-auto lg:hidden cursor-pointer"
            >
              <Menu />
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function Navbar() {
  return (
    <Suspense>
      <NavbarClient />
    </Suspense>
  );
}