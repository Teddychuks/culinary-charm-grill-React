import { useState } from "react";
import BreadCrumb from "./BreadCrumb";
import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <Header setOpen={setOpen} />
      <BreadCrumb />
      <SideBar open={open} setOpen={setOpen} />
      <main className="w-full pt-6 px-4 sm:px-6 md:px-8 lg:ps-64 bg-slate-100 min-h-screen">
        <Outlet className="" />
      </main>
    </div>
  );
}

export default AppLayout;
