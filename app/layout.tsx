import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "@/components/ui/toaster";


const inter = Poppins({ subsets: ['latin-ext'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: "SDM e-mobility",
  description: "Electric car rental services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <ClerkProvider appearance={{
      variables: {
      colorPrimary: "green"
    }}}>
        <html lang="en">
          <body className={`${inter.className} dark:bg-blend-darken dark:bg-black}`} >
            {children}
            <Toaster/>
          </body>
        </html>  
    </ClerkProvider>);
}
