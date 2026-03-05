import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col">
        

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}