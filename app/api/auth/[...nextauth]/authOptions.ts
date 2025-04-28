import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import pb, { getImageUrl } from "@/lib/pocketbase"


const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { type: "email" },
        password: { type: "password" }
      },
      authorize: async (credentials) => {
        try {
            const authData = await pb.collection("users").authWithPassword(credentials!.email!, credentials!.password!);
            return {
                id: authData.record.id,
                name: authData.record.name,
                email: authData.record.email,
                role: authData.record.role,
                sub: authData.record.sub,
                image: authData.record.avatar
        ? getImageUrl("users", authData.record.id, authData.record.avatar)
        : null,           }
        } catch (error) {
            console.log(error);
            
            return null;            
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      return {...token, ...user};
    },
    async session({ session, token}) {
      if (session?.user) return {...session, user: {...session.user, ...token}};
      return session;
    },
  },
  pages: {
    signIn: "/login"
  }
};

export default authOptions;