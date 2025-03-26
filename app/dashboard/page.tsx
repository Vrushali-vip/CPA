

import XpoDashboard from "./XpoDashboard";
import GeneralDashboard from "./GeneralDashboard";
import pb from "@/lib/pocketbase";

export const revalidate = 0;

async function getClient() {
    try {
        const users = await pb.collection("users").getFullList({
            fields: "id,client",
        });

        const authModel = pb.authStore.model;
        if (!authModel || !authModel.id) {
            console.error("No authenticated user found.");
            return "Unknown";
        }

        const loggedInUser = users.find(user => user.id === authModel.id);
        if (!loggedInUser) {
            console.error("User data not found in collection.");
            return "Unknown";
        }

        console.log("Authenticated User Client:", loggedInUser.client);

        return loggedInUser.client || "Unknown";
    } catch (error) {
        console.error("Error fetching client from users collection:", error);
        return "Unknown";
    }
}

export default async function AdminPage() {
    const client = await getClient();

    return client !== "Unknown" ? <XpoDashboard client={client} /> : <GeneralDashboard userType="Authorized User" />;
}

