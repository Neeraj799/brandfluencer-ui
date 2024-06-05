import "../../globals.css";
import Footer from "@/components/Footer/Footer";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import CommonNavbar from "@/components/CommonNavbar/CommonNavbar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="flex flex-col min-h-screen justify-between">
      <ToastContainer />
        <CommonNavbar />
        {children}
        <Footer />
      </div>
  );
}
