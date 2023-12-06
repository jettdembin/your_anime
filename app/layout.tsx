import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";

import Providers from "../util/providers";

import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import { ToastContainer } from "react-toastify";
// In your main file, likely App.js or index.js
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Your Anime",
  description: "Your anime - just for you",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          />
        </head>
        <body className={inter.className}>
          <Theme>
            <div className="flex flex-col h-screen">
              <Providers>
                <Navbar />
                <div className="pb-4 mt-20">{children}</div>
                <Footer />
              </Providers>
            </div>
          </Theme>
        </body>
      </html>
    </ClerkProvider>
  );
}
