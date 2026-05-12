import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'Apresentação | Bevilacqua Arquitetura e Engenharia',
  description: 'Proposta comercial exclusiva para projeto residencial - Bevilacqua Arquitetura e Engenharia - 49 anos de experiência',
  icons: {
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.png-9mRrvj28aRZ67rPbc0QVFN9MRd8ZjD.webp',
    shortcut: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.png-9mRrvj28aRZ67rPbc0QVFN9MRd8ZjD.webp',
    apple: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.png-9mRrvj28aRZ67rPbc0QVFN9MRd8ZjD.webp',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
