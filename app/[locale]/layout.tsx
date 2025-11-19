import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yago Andrade Daoud | Backend Developer",
  description: "Backend Developer portfolio of Yago Andrade Daoud. Java, Spring Boot, Node.js, RabbitMQ.",
  openGraph: {
    title: "Yago Andrade Daoud | Backend Developer",
    description: "Backend Developer portfolio of Yago Andrade Daoud. Java, Spring Boot, Node.js, RabbitMQ.",
    url: "https://yagodaoud.dev",
    siteName: "Yago Andrade Daoud",
    locale: "en_US",
    type: "website",
  },
  keywords: ["Backend Developer", "Java", "Spring Boot", "Node.js", "RabbitMQ", "Yago Andrade Daoud"],
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!['en', 'pt'].includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
