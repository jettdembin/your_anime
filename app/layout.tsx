import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";

import Providers from "../util/providers";

import { ClerkProvider } from "@clerk/nextjs";
import { Theme } from "@radix-ui/themes";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "@/layout/Footer";
import MobileNavWidget from "@/layout/MobileNavWidget";
import Navbar from "@/layout/Navbar";

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
        <ClerkProvider>
          <Theme>
            <div className="flex flex-col h-screen">
              <div id="modal-root"></div>

              <Providers>
                <div className="hidden lg:block">
                  <Navbar />
                </div>
                <div className="block lg:hidden">
                  <MobileNavWidget />
                </div>
                <div className="pb-4">{children}</div>
                <Footer />
              </Providers>
            </div>
          </Theme>
        </ClerkProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
