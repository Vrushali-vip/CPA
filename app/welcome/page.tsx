import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function WelcomePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const { name, sub } = session.user;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl p-8 rounded-lg shadow-lg text-center">


        <h1 className="text-2xl font-bold mb-6">
          Welcome {name} to the {sub} ServiceHub by Alphalake Services.
        </h1>

        <p className="mb-8">
          Select an option below to continue:
        </p>

        {/* <div className="flex flex-row justify-center gap-6">
          <Link 
            href="/dashboard" 
            className="px-8 py-3 bg-primary font-medium rounded-md  transition-colors w-1/3"
          >
            {sub} Ops
          </Link>
          
          <Link 
            href="/servicehub" 
            className="px-8 py-3 bg-primary font-medium rounded-md  transition-colors w-1/3"
          >
            {sub} Support
          </Link>
        </div> */}
        <div className="flex flex-wrap gap-4">
          {/* Card 1 - Ops */}
          <div className="flex-1 min-w-[280px] max-w-md p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            {sub && (
              <p className=" text-sm text-center">
                See all your organisation&apos;s automations, ai, apps and integrations in one dashboard. Visibility of metrics like runtimes, usage, process, transactions and ROI!
              </p>
            )}
            <Link
              href="/dashboard"
              className="mt-3 block px-8 py-4 bg-primary text-white font-medium rounded-md text-center transition-colors"
            >
              {sub ?? 'Default'} Ops
            </Link>

          </div>

          <div className="flex-1 min-w-[280px] max-w-md p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            {sub && (
              <p className=" text-sm text-center">
                See all your organisation`&apos;s support tickets in one dashboard. Visibility into ticket creation, real-time updates, progress tracking, status changes, and streamlined communication all in one place!
              </p>
            )}
            <Link
              href="/servicehub"
              className="mt-3 block px-8 py-4 bg-primary text-white font-medium rounded-md text-center transition-colors"
            >
              {sub ?? 'Default'} Support
            </Link>

          </div>
        </div>


      </div>
    </main>
  );
}