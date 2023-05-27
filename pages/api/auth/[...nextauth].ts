import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string, // we use "as string" bcz TypeScript consider variables from .env file as potentially undefined and we to tell that it's fine, we are sure that the values are not undefined
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
})