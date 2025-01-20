import React from 'react';
import { Linkedin, Facebook, Mail } from "lucide-react";
import pb, { getImageUrl } from '@/lib/pocketbase';
import { TeamMember } from '../servicehub/types';

// revalidate once a day
export const revalidate = 86400;
 
const TeamSheet = async () => {
    let users: TeamMember[] = [];
    try {
        users = await pb.collection("team").getFullList<TeamMember>({
            fields: "id,name,email,avatar,sub,linkedin_url,facebook_url,description,eid",
            sort: "eid",
        });
        // users.push(...fetchedUsers);
    } catch (error) {
        console.error("Error fetching team members:", error);
    }

    console.log(users);
    

    const getAvatarUrl = (user: TeamMember) => {
        return getImageUrl("team", user.id, user.avatar);
    };

    return (
        <main className="min-h-screen p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="p-6 rounded-lg shadow-lg flex justify-center items-center col-span-1 md:col-span-2 lg:col-span-1">
                        <h1 className="text-6xl font-robo">Meet The Team</h1>
                    </div>

                    {users.length > 0 ? (
                        users.map((user: TeamMember) => (
                            <div key={user.id} className="group h-[400px] [perspective:1000px]">
                                <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                    <div className="absolute inset-0 flex flex-col items-center justify-between p-6 border shadow-lg [backface-visibility:hidden]">
                                        <img
                                            src={user.avatar ? getAvatarUrl(user) : '/img.jpg'}
                                            alt={`avatar`}
                                            className="w-44 h-44 rounded-full mb-3 object-cover"
                                        />
                                        <div className="text-center w-full mt-4">
                                            <h2 className="font-robo text-xl font-semibold">{user.name}</h2>
                                            <p className="mt-2 font-robo text-primary font-semibold text-xl">{user.sub}</p>
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 flex flex-col items-center justify-between p-6 border shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                        <img
                                            src={user.avatar ? getAvatarUrl(user) : '/img.jpg'}
                                            alt={`avatar`}
                                            className="w-20 h-20 rounded-full mb-3 object-cover"
                                        />
                                        <p className="mt-4 text-gray-600 font-robo text-sm text-center flex-1">
                                            {user.description}
                                        </p>
                                        <div className="flex justify-center space-x-4 mt-4 text-primary">
                                            {user.linkedin_url && (
                                                <a
                                                    href={user.linkedin_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-blue-700"
                                                >
                                                    <Linkedin size={24} />
                                                </a>
                                            )}
                                            {user.email && (
                                                <a
                                                    href={`mailto:${user.email}`}
                                                    className="hover:text-blue-700"
                                                >
                                                    <Mail size={24} />
                                                </a>
                                            )}
                                            {user.facebook_url && (
                                                <a
                                                    href={user.facebook_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-blue-700"
                                                >
                                                    <Facebook size={24} />                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No team members found.</p>
                    )}
                </div>
            </div>
        </main>
    );
};

export default TeamSheet;