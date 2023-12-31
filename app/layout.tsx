import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Provider from "./Provider";
import { TokenContextProvider } from "./context/token";
import { PostContextProvider } from "./context/all-post";
import { UserContextProvider } from "./context/my-profile";
import { PostContextByUsernameProvider } from "./context/get-post-by-username";
import { OtherUserContextProvider } from "./context/other-profile";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instagram Clone",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <Provider>
          <TokenContextProvider>
            <UserContextProvider>
              <OtherUserContextProvider>
                <PostContextProvider>
                  <PostContextByUsernameProvider>
                    <Header />
                    {children}
                    <Navbar />
                  </PostContextByUsernameProvider>
                </PostContextProvider>
              </OtherUserContextProvider>
            </UserContextProvider>
          </TokenContextProvider>
        </Provider>
      </body>
    </html>
  );
}
