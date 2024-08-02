import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{ label:"Email", type:"email",placeholder:"johndoe@example.com" },
                password:{label:"Password" , type:"password", placeholder:"Password"},
            },
            async authorize(credentials: any) {
                return {    
                    id:"hello"
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
          })
    ],
    secret:process.env.NEXTAUTH_SECRET

})

export { handler as GET, handler as POST }