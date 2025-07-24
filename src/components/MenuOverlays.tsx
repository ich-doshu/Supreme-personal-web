import { motion, AnimatePresence } from "framer-motion";
import NavLink from "./NavLink";

export interface NavLinksItem {
  title: string;
  path?: string;
  children?: NavLinksItem[];
}

interface MenuOverlaysProps {
  links: NavLinksItem[];
}

export default function MenuOverlays({ links }: MenuOverlaysProps) {
  if (!links || links.length === 0) return null;

  const flatLinks: NavLinksItem[] = links.flatMap((link) => (link.children ? link.children : [link]));

  return (
    <AnimatePresence>
      <motion.ul
        key="mobile-menu"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex flex-col py-4 items-end md:hidden px-4 bg-[#121212] border-t border-white/10"
      >
        {flatLinks.map((link, index) => (
          <li key={index}>{link.path ? <NavLink href={link.path} label={link.title} /> : <span className="text-gray-400 cursor-default">{link.title}</span>}</li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
}
