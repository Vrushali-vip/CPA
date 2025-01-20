
import { getServerSession } from 'next-auth';
import authOptions from '../api/auth/[...nextauth]/authOptions';
import { Metadata } from 'next';
import pb from '@/lib/pocketbase';
import LogOutButton from '@/components/LogOutButton';
import { CalendarDays, Building2, Mail, Link as User } from "lucide-react";

type PartnerProfile = {
    name: string,
    email: string,
    verified: boolean,
    username: string,
    company?: string,
    created: string
};

async function getUserProfile() {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        try {
            const partner = await pb.collection("users").getFirstListItem<PartnerProfile>(
                `email = "${session.user.email}"`,
                { fields: "name,email,verified,username,company,created" }
            );
            return partner;
        } catch (error) {
            console.error("Error fetching partner profile:", error);
            return null;
        }
    }
    return null;
}

export const metadata: Metadata = {
    title: "Partner Profile"
};

export default async function Profile() {
    const data = await getUserProfile();
    const session = await getServerSession(authOptions);
    const initials = data?.name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#001a21] to-[#000912] py-16">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Profile Section */}
                <div className="bg-[#002431] p-6 rounded-lg shadow-lg flex flex-col items-center  w-72 mx-auto">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden bg-[#059B9C]/20 flex items-center justify-center text-[#059B9C] text-3xl">
                        {session?.user.image ? (
                            <img src={session.user.image} alt={data?.name} className="w-full h-full object-cover" />
                        ) : (
                            <span>{initials}</span>
                        )}
                    </div>
                    <div className="text-center mt-4">
                        <h1 className="text-2xl font-semibold text-white">{data?.name}</h1>
                        <div className="text-gray-300 mt-2">
                            <div className='flex items-center justify-center'>
                                <User className="w-4 h-4 text-[#059B9C]" />
                                {data?.username}
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Mail className="w-4 h-4 text-[#059B9C]" />
                                {data?.email}
                            </div>
                            {data?.company && (
                                <div className="flex items-center justify-center gap-2 mt-1">
                                    <Building2 className="w-4 h-4 text-[#059B9C]" />
                                    {data.company}
                                </div>
                            )}
                            <div className="flex items-center justify-center gap-2 mt-1">
                                <CalendarDays className="w-4 h-4 text-[#059B9C]" />
                                Partner since {new Date(data?.created || '').toLocaleDateString()}
                            </div>
                            <div className="mt-2 text-[#059B9C] font-medium">
                                {data?.verified ? "Verified Partner" : "Not Verified"}
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 rounded-full w-full border border-[#059B9C] items-center flex justify-center py-2 text-bold bg-[#059B9C]'><LogOutButton /></div>
                </div>
            </div>
        </main>
    );
}
