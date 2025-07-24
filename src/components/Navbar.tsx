"use client";

import Link from "next/link";
import NavLink from "./NavLink";
import { useState } from "react";
import MenuOverlays from "./MenuOverlays";
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";


interface NavLinksItem {
  title: string;
  path?: string;
  children?: NavLinksItem[];
}

const NavLinks: NavLinksItem[] = [
  { title: "About", path: "/about" },
  { title: "Projects", path: "/project" },
  {
    title: "Pages",
    children: [
      { title: "Blog", path: "#blog" },
      { title: "404 Page", path: "/404" },
      { title: "Coming Soon", path: "/coming-soon" },
    ],
  },
  { title: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-[#121212] dark: bg-opacity-80 backdrop-blur-sm">
      <div className="flex flex-wrap justify-between items-center mx-auto px-4 py-2">
        <Link href="/" className="text-2xl md:text-5xl">
          <h1>F</h1>
        </Link>

        {/* Toggle Button */}
        <div className="mobile-menu block md:hidden">
          
          <button onClick={() => setNavbarOpen(!navbarOpen)} className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white transition-all duration-300 ease-in-out">
            <AnimatePresence mode="wait">
              {navbarOpen ? (
                <motion.div
                  key="close"
                  initial={{ y: -20, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -20, opacity: 0, scale: 0.8 }}
                  transition={{
                    type: "spring",
                    stiffness: 600,
                    damping: 30,
                    duration: 0.1,
                  }}
                >
                  <XMarkIcon className="h-5 w-5 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ y: 20, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 20, opacity: 0, scale: 0.8 }}
                  transition={{
                    type: "spring",
                    stiffness: 600,
                    damping: 50,
                    duration: 0.1,
                  }}
                >
                  <Bars3Icon className="h-5 w-5 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0 mr-2">
            {NavLinks.map((link, index) => (
              <li
                key={index}
                className={`relative group ${
                  pathname === link.path ? "text-white after:scale-x-100" : "text-[#ADB7BE] after:scale-x-0"
                } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-blue-500 after:transition-transform after:duration-300 after:origin-left group-hover:after:scale-x-100`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {link.path ? (
                  <NavLink href={link.path} label={link.title} />
                ) : (
                  <>
                    <div
                      className="flex items-center justify-center text-lg text-[#ADB7BE] hover:text-white cursor-pointer relative group 
             after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 
             after:h-[4px] after:w-0 after:bg-blue-500 
             after:transition-all after:duration-300 group-hover:after:w-full"
                    >
                      {link.title}
                      <ChevronDownIcon className="w-6 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" />
                    </div>

                    <div className="absolute top-full left-0 mt-2 z-50" onMouseLeave={() => setHoveredIndex(null)} onMouseEnter={() => setHoveredIndex(index)}>
                      <AnimatePresence>
                        {hoveredIndex === index && (
                          <motion.ul
                            initial={{ opacity: 0, y: -10, scaleY: 0.9 }}
                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                            exit={{ opacity: 0, y: -10, scaleY: 0.8 }}
                            transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                            className="w-40 rounded-md py-2 bg-[#1f1f1f] text-white shadow-md"
                          >
                            {link.children?.map((child) => (
                              <li key={child.title}>
                                <Link href={child.path || "#"} className="block px-4 py-2 text-md text-white hover:text-black hover:bg-white">
                                  {child.title}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {navbarOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.1, type: "spring", stiffness: 300, damping: 20 }}>
            <MenuOverlays links={NavLinks} />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
