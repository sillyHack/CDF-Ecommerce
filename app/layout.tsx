import './globals.css'
import Nav from './components/Nav'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Hydrate from './components/Hydrate'
import {Roboto, Lobster_Two} from "next/font/google"

// define main font
const roboto = Roboto({weight: ["400", "500", "700"], subsets: ["latin"]})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

// here we are checking the auth of user by using server side(in client side, everytime we navigate to a page, the code will always make a check and we don't want that)
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  console.log(session)

  return (
    <html lang="en" data-theme="cupcake">
      <body className={`mx-4 lg:mx-48 min-h-screen ${roboto.className}`}>
        <Hydrate>
          <Nav user={session?.user} expires={session?.expires as string}/>
          {children}
        </Hydrate>
      </body>
    </html>
  )
}
