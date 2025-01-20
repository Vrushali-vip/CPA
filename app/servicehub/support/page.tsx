import SupportDashboard from "./SupportDashboard";
import { Suspense } from "react";
import type { Filters } from "../page";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";

export type SupportPageSearchParams = Filters;

export default async function SupportPage({ searchParams }: { searchParams: SupportPageSearchParams }) {
    const session = await getServerSession(authOptions);
    return (
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-w-7xl">
            <h1 className="text-xl ml-4 sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
                Servicehub Response Team Dashboard
            </h1>
            <Suspense
                fallback={
                    <div className="flex items-center justify-center min-h-[200px]">
                        <p className="text-gray-500">Loading...</p>
                    </div>
                }
            >
                <SupportDashboard searchParams={searchParams} userId={session?.user?.id} />
            </Suspense>
        </div>
    )
}