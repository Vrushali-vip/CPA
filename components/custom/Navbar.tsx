
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
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]); // UK as default
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

  const isAdminOrSupport =
    session?.data?.user?.role === "ADMIN" ||
    session?.data?.user?.role === "SUPPORT";

  // Region-specific menu configurations
  const getRegionSpecificMenu = () => {
    const isIndia = selectedCountry.code === "ind";
    return (
      <>
        <div className="group/ms relative pl-3 lg:pl-0 lg:mt-2 lg:ml-auto">
          <div className="font-semibold group-hover/ms:text-primary flex align-center gap-1 hover:cursor-pointer">
            <span className="text-nowrap">Build</span>
            <ChevronDown
              className="group-hover/ms:rotate-180 transition-transform duration-300"
              size={18}
            />
          </div>
          <div className="lg:absolute max-h-0 group-hover/ms:max-h-[300px] transition-transform nesteds overflow-hidden lg:py-1 lg:scale-0 group-hover/ms:scale-100 bg-card duration-300 rounded-md origin-top-left lg:shadow-lg w-fit top-6 left-[-10px] right-0">
            <ul className="w-full">
              <li className="w-full">
                <Link
                  href={isIndia ? "/services/build-api-india" : "/build-api-india"}
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  APIs
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={isIndia ? "/services/managed-services-india" : "/services/managed-services"}
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Automation / App Connectors
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={isIndia ? "/services/managed-services-india" : "/services/managed-services"}
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  User Centred Design
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={isIndia ? "/services/managed-services-india" : "/services/managed-services"}
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Process Optimisation
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={isIndia ? "/services/managed-services-india" : "/services/managed-services"}
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Custom Apps
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={isIndia ? "/services/managed-services-india" : "/services/managed-services"}
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Custom Automation Recipes
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={isIndia ? "/services/managed-services-india" : "/services/managed-services"}
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Custom Bots
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={isIndia ? "/services/managed-services-india" : "/services/managed-services"}
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Services Rates Card
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
                  href="/services/managed-services"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  {'24/7 "eyes on glass" premium support'}
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/servicehub"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  ServiceHub Portal
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/services/managed-services"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Process-as-a-Service
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/services/integration-as-a-service"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Integration-as-a-service
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/services/managed-services"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Solution Support
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
                  href={isIndia ? "/services/india-workshops" : "/train/workshops"}
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  {isIndia ? "Online automation courses" : "UK Reskilling Partnership"}
                </Link>
              </li>
              {isIndia && (
                <>
                  <li className="w-full">
                    <Link
                      href="/services/india-certifications"
                      className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                    >
                      In-person automation courses
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link
                      href="/services/india-resources"
                      className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                    >
                      Hybrid automation courses
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        {/* Bots Menu */}
        <div className="mt-2 border-t lg:border-none pt-2 lg:pt-0 group/bots-india relative pl-3 lg:pl-0">
          <div className="font-semibold group-hover/bots-india:text-primary flex align-center gap-1 hover:cursor-pointer">
            <span className="text-nowrap">Alphabots</span>
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
                    href="/services/india-chatbots"
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
                      href="/services/workflow"
                      className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                    >
                      NHS Hospital Patient Administration bot
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link
                      href="/services/ai-assistants"
                      className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                    >
                      HMRC Imports Tariff Lookup bot
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        {/* Recipes Menu */}
        <div className="mt-2 border-t lg:border-none pt-2 lg:pt-0 group/recipes-india relative pl-3 lg:pl-0">
          <div className="font-semibold group-hover/recipes-india:text-primary flex align-center gap-1 hover:cursor-pointer">
            <span className="text-nowrap">Recipes </span>
            <ChevronDown
              className="group-hover/recipes-india:rotate-180 transition-transform duration-300"
              size={18}
            />
          </div>
          <div className="lg:absolute max-h-0 group-hover/recipes-india:max-h-[300px] transition-transform nesteds overflow-hidden lg:py-1 lg:scale-0 group-hover/recipes-india:scale-100 bg-card duration-300 rounded-md origin-top-left lg:shadow-lg w-fit top-6 left-[-10px] right-0">
            <ul className="w-full">
              <li className="w-full">
                <Link
                  href="/services/cost-center"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  ServiceNow to SAP Cost Centres recipe
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/services/vendor-management"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  ServiceNow to SAP Vendor Mgmt recipe{" "}
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/services/hubspot-revops"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  HubSpot RevOps recipe
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Apps Menu */}
        <div className="mt-2 border-t lg:border-none pt-2 lg:pt-0 group/apps-india relative pl-3 lg:pl-0">
          <div className="font-semibold group-hover/apps-india:text-primary flex align-center gap-1 hover:cursor-pointer">
            <span className="text-nowrap">Apps </span>
            <ChevronDown
              className="group-hover/apps-india:rotate-180 transition-transform duration-300"
              size={18}
            />
          </div>
          <div className="lg:absolute max-h-0 group-hover/apps-india:max-h-[300px] transition-transform nesteds overflow-hidden lg:py-1 lg:scale-0 group-hover/apps-india:scale-100 bg-card duration-300 rounded-md origin-top-left lg:shadow-lg w-fit top-6 left-[-10px] right-0">
            <ul className="w-full">
              <li className="w-full">
                <Link
                  href="/services/managed-services"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Employee Onboarding workflow
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/services/managed-services"
                  className="px-2 py-1 text-nowrap block text-sm hover:text-primary"
                >
                  Patient Tracking workflow
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };

  return (
    <nav className="p-2 lg:px-4 bg-background w-full fixed lg:sticky dark:border-b top-0 z-50">
      <div className="flex align-center justify-between gap-4 w-full">
        <Link href="/" className="line-height-0">
          <Image
            src="/Alphalake_services.png"
            width={250}
            height={100}
            className="dark:hidden"
            alt="Alphalake Services"
          />
          <Image
            src="/Alphalake_Services_W.png"
            width={250}
            height={100}
            className="hidden dark:block"
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
                    style={{ width: "150px", flexShrink: 0 }} // Fixed width
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
                                className="text-gray-600"
                              />
                            ) : (
                              <ChevronDown
                                size={16}
                                className="text-gray-600"
                              />
                            )}
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {!isAdminOrSupport && (
                            <DropdownMenuItem asChild>
                              <Link
                                href="/servicehub"
                                className="w-full cursor-pointer"
                              >
                                ServiceHub
                              </Link>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Link
                              href="/profile"
                              className="w-full cursor-pointer"
                            >
                              Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link
                              href="/dashboard"
                              className="w-full cursor-pointer"
                            >
                              Dashboard
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