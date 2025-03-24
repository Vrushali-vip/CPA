
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: {
    template: '%s | Alphalake Services',
    default: 'Alphalake Services - for Efficient Business Processes',
  },
  icons: [
    {
      rel: 'icon',
      sizes: '32x32',
      href: "/favicon-32x32.png",
      url: "/favicon-32x32.png"
    }
  ],
  robots: {
    index: true,
    follow: true
  },
  description: "Tailored end-to-end implementation services for automation and Ai solutions. Alphalake Ai are specialists in health and human services.",
  openGraph: {
    title: {
      template: '%s | Alphalake Services',
      default: 'Alphalake Services - for Efficient Business Processes',
    },
    description: "Tailored end-to-end implementation services for automation and Ai solutions. Alphalake Ai are specialists in health and human services.",
    type: "website",
    url: "https://alphalake.services",
    siteName: "Alphalake Services",
    images: [
      {
        url: "/service-hub-bot.png",
        width: 500,
        height: 500
      }
    ],
    locale: "en_US"
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  keywords: "RPA, Automation, iPaaS, Workflow Management, Workato Solution, Microsoft Integration, UiPath Automation",
}

export default function Home() {
  return (
    <main >
      <section className="mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8 max-w-7xl min-h-screen ">
        <div className="p-4 md:p-8 lg:p-12 xl:p-16 mx-auto my-auto gap-y-8 justify-between align-center flex flex-col-reverse lg:flex-row">
          <div className="w-full max-w-4xl pt-8">
            <h1 className="text-3xl xl:text-5xl font-extrabold mb-6">
              Transform Your Business with Alphalake&apos;s AI-powered Solutions
            </h1>
            <p className="font-mono py-3">
              <b>Alphalake AI</b> is a consultancy and advisory firm providing customized automation
              and Al solutions to the healthcare industry. We specialize in system integration,
              change management, RPA management, and digital worker health-check assessments.
            </p>
            <p className="font-mono py-3 mb-8">
              The company values organizational efficiency, sustainable transformation, and
              prioritizes providing optimal solutions to our clients.
            </p>

            <Button>Book a Demo</Button>

          </div>
          <div className="mx-auto w-4/5 sm:w-2/5 lg:w-1/3 pt-8">
            <Image src="/service-hub-bot.png" className="mx-auto" alt="Alphalake Services Bot" width={500} height={500} />
          </div>
        </div>
      </section>
      <section className="p-4 md:p-8 lg:p-12 xl:p-16 mx-auto bg-al-1000 min-h-screen flex items-center">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl xl:text-3xl my-4 font-bold">
            Customer Success
          </h2>
          <p className="text-center text-xl">
            (Through value/impact obsession)
          </p>

          <div className="my-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div className="grid items-center justify-center p-2 rounded-lg shadow-md">
              <Image src="/nhs_white.png" width={150} height={200} className="mx-auto" alt="NHS" />
              <p className="text-sm pt-2 text-center">
                Automating repetitive tasks for administering patients across a large NHS teaching hospitals.
              </p>
            </div>
            <div className="grid items-center justify-center p-2 rounded-lg shadow-md">
              <Image src="/xpo_white.png" width={150} height={200} className="mx-auto" alt="XPO Logistics" />
              <p className="text-sm pt-2 text-center">
                Automating customs import processes for one of the world&apos;s largest logistics companies.
              </p>
            </div>
            <div className="grid items-center justify-center p-2 rounded-lg shadow-md">
              <Image src="/allcare_white.png" width={150} height={200} className="mx-auto" alt="Allcare Pharmaceuticals" />
              <p className="text-sm pt-2 text-center">
              Cara/Allcare Pharmacy: Automating drug invoicing for Irish Care Homes
              </p>
            </div>
            <div className="grid items-center justify-center p-2 rounded-lg shadow-md">
              <Image src="/alphabot_white.png" width={150} height={200} className="mx-auto" alt="Alphabot" />
              <p className="text-sm pt-2 text-center">
              AI reads & automates Penalty Notice processing for 100+ UK councils.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
