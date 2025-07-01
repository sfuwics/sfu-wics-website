import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Head from 'next/head';
import { Metadata } from 'next'


const robotoSlab = localFont({
  src: [
    {
      path: './fonts/RobotoSlab-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/RobotoSlab-Light.ttf',
      weight: '300',
      style: 'normal'
    },
    {
      path: './fonts/RobotoSlab-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/RobotoSlab-SemiBold.ttf',
      weight: '600',
      style: 'normal'
    }
  ],
  variable: '--font-roboto-slab',
})

export const metadata: Metadata = {
  title: {
    default: 'SFU WiCS',
    absolute: 'SFU WiCS',
  },

  icons: {
    // Default icon (shown in browser tabs)
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    
    shortcut: '/favicon.svg',
    
    other: {
      rel: 'shortcut icon',
      url: '/favicon.ico',
    },
    
    apple: '/apple-touch-icon.png',
    
    // Android/Chrome
    other: [
      {
        rel: 'icon',
        url: '/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={robotoSlab.variable}
      >
        {/* <Head>
          <link rel="icon" type="image/png" href="/public/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/svg+xml" href="/public/favicon.svg" />
          <link rel="shortcut icon" href="/public/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/public/apple-touch-icon.png" />
          <link rel="manifest" href="/public/site.webmanifest" />
        </Head> */}

        <main className="font-roboto-slab min-h-screen flex flex-col">
          <NavBar />

          {/* <div className="container mx-auto pt-24 px-5 flex-1"> */}
            <div>
            {children}
          </div>

          <div className="pt-12 md:pt-24 lg:pt-40 2xl:pt-64">
            <Footer />
          </div>

          
        </main>
      </body>
    </html>
  );
}
