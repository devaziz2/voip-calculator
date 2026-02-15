"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DollarSign, Percent, Clock, Wallet, Menu, X } from "lucide-react";

const sidebarItems = [
  {
    name: "Profit Calculation",
    href: "/profit-calculation",
    icon: Percent,
  },
  {
    name: "Minute Calculation",
    href: "/minute-calculation",
    icon: Clock,
  },
  {
    name: "Balance Calculation",
    href: "/balance-calculation",
    icon: Wallet,
  },
  {
    name: "Currency Converter",
    href: "/currency-converter",
    icon: DollarSign,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden  p-4 bg-slate-900 text-white">
        <button onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed md:static h-screen top-0 left-0 h-full w-64 bg-slate-900 text-slate-200
        transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold text-white">Price Calculator</h1>

          {/* Close button (mobile) */}
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-emerald-500 text-white shadow-md"
                      : "hover:bg-slate-800 text-slate-300"
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
