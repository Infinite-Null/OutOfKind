import type { AppProps } from 'next/app'
import  NavBar  from '@/Components/NavBar/NavBar';
import { NextUIProvider, Text } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import Heading from '@/Components/Heading/Heading';
import MainScreenNav from '@/Components/MainScreenNavBar/MainScreenNavBar';

export default function App({ Component, pageProps }: AppProps) {
  const router=useRouter()
  const community=router.pathname.match(/community/)?.length
  return <SessionProvider>
   <NextUIProvider>
   <Heading/>
  {community&&<NavBar/>}
  {!community&&<MainScreenNav/>}
   <Component {...pageProps} />
   </NextUIProvider>
  </SessionProvider>

}
