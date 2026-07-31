"use client";

import Image from "next/image";
import { useState } from "react";
import { NAVBAR_LINKS } from "./navbar.constant";
import { FaPhoneAlt } from "react-icons/fa";
import { Glassmorph } from "@/lib/constant/Glassmorph";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-6 z-50 left-1/2 -translate-x-1/2 w-full max-w-[1400px] px-4 xl:px-0">
      {/* Desktop navbar */}
      <div
        className={`${Glassmorph} rounded-full flex items-center justify-between p-2 shadow-2xl relative`}
      >
        <div className="bg-white p-2 px-4 rounded-[80px]">
          <Image src={"/logo.webp"} alt={""} width={55} height={55} />
        </div>

        {/* Desktop links — hidden on mobile */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-5 w-auto">
          {NAVBAR_LINKS.map((link) => (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() =>
                link.dropdown ? setOpenDropdown(link.href) : null
              }
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a
                href={link.href}
                className="relative isolate px-4 py-2 rounded-[80px] text-neutral-900 flex gap-1 items-center overflow-hidden
                  after:content-[''] after:absolute after:inset-0
                  after:bg-neutral-900 after:origin-center after:scale-x-0
                  after:transition-transform after:duration-400
                  after:z-0
                  hover:after:scale-x-100 hover:text-white duration-500 transition-colors"
              >
                <span className="relative z-10 flex gap-1 items-center">
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        openDropdown === link.href ? "rotate-180" : ""
                      }`}
                    />
                  )}
                  {!link.dropdown && link.icon}
                </span>
              </a>

              {link.dropdown && (
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                    openDropdown === link.href
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden min-w-[260px] border border-zinc-200/80 shadow-2xl">
                    {link.dropdown.map((item, idx) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-5 py-3.5 text-neutral-700 hover:text-black hover:bg-neutral-100 transition-all duration-200 text-sm ${
                          idx !== link.dropdown!.length - 1
                            ? "border-b border-neutral-100"
                            : ""
                        }`}
                      >
                        <span className="text-red-400 shrink-0">
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Contact Us — hidden on mobile */}
        <a
          href="https://wa.me/62818311037"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex group bg-transparent text-neutral-900 rounded-[80px] px-4 py-2 gap-2 items-center relative overflow-hidden border-neutral-900/50 border"
        >
          <span className="absolute inset-0 bg-neutral-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease origin-right z-0" />
          <FaPhoneAlt className="relative z-10 text-neutral-900 group-hover:text-white transition-all duration-500 ease" />
          <span className="relative z-10 rounded-[80px] text-neutral-900 group-hover:text-white transition-all duration-500 ease">
            Contact Us
          </span>
        </a>

        {/* Mobile hamburger — visible on mobile only */}
        <button
          className="md:hidden text-neutral-900 p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div
          className={`md:hidden mt-2 ${Glassmorph} rounded-2xl overflow-hidden shadow-2xl`}
        >
          <div className="flex flex-col py-2">
            {NAVBAR_LINKS.map((link) => (
              <div key={link.href}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() =>
                        setMobileDropdown((v) =>
                          v === link.href ? null : link.href,
                        )
                      }
                      className="w-full flex items-center justify-between px-5 py-3 text-neutral-800 hover:text-black hover:bg-neutral-100 transition-colors text-sm"
                    >
                      <span className="flex items-center gap-2">
                        {link.icon}
                        {link.label}
                      </span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${
                          mobileDropdown === link.href ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileDropdown === link.href && (
                      <div className="bg-neutral-50/50 border-t border-neutral-200/60">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-8 py-3 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors text-sm"
                            onClick={() => setMobileOpen(false)}
                          >
                            <span className="text-red-400 shrink-0">
                              {item.icon}
                            </span>
                            {item.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={link.href}
                    className="flex items-center gap-2 px-5 py-3 text-neutral-800 hover:text-black hover:bg-neutral-100 transition-colors text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.icon}
                    {link.label}
                  </a>
                )}
              </div>
            ))}

            {/* Contact Us button in mobile menu */}
            <div className="px-4 pt-2 pb-3 border-t border-neutral-200/60 mt-1">
              <a
                href="https://wa.me/62818311037"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <FaPhoneAlt size={13} />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
