import "@radix-ui/themes/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import { BookingsProvider } from "@/providers/BookingsProvider";
import { AppLayout } from "@/components/layout/AppLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Koru Va´a - Canoagem Havaiana",
  description: "Book your Koru Va´a Canoe Adventure in Ipê City",
};

const ACCENT_COLOR = "blue";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Theme accentColor={ACCENT_COLOR} appearance='dark' panelBackground='translucent' radius='large'>
          <BookingsProvider>
            <AppLayout>
              <main>{children}</main>
            </AppLayout>
          </BookingsProvider>
        </Theme>
      </body>
    </html>
  );
}
