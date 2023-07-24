import Navbar from '@/components/Layout/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/Layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Domainix',
  description: 'S Domainixem snadno zjistíte, kde můžete Vámi požadovanou doménu provozovat s co nejnižšími náklady. Ušetřte čas i peníze při hledání registrátora domén.',
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { lang: string }
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
