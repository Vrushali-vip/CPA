declare global {
    interface GoogleChatMessage {
        "site": string;
        "formName": string;
        "time": string;
        "fields": {
            "key": string;
            "value": string;
        }[]
    }
}

declare module "next-auth" {
    interface Session {
        user: {
            role: "CUSTOMER"|"ADMIN"|"SUPPORT";
            name: string;
            email: string;
            id: string;
            sub: string;
        }
    }
}

declare module "react-files";

export {};