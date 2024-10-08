import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import Navbar from "@/components/Home/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CommonNavbar from "@/components/CommonNavbar/CommonNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>
        <ToastContainer />
        <CommonNavbar />
        {children}
        <Footer />
      </div>
    </>
  );
}
