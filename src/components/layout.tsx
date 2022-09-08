import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Nav from "./nav";

const Layout = ({ children }: {children? : ReactNode}) => {
  return (
    <div className="bg-[#EDF1F4] min-h-screen">
      <Nav />
      <main className="overflow-x-hidden min-h-[calc(100vh-68px)]">{children}</main>
      <Toaster/>
    </div>
  );
};

export default Layout;
