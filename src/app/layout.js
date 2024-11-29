import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { UserProvider } from "@/context/userContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Initium",
  description: "The site for your cards",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
         <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <AuroraBackground/>
            {children}
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
