import Link from "next/link";

interface NavLinkProps {
  href: string;
  label: string;
}

export default function NavLink({ href, label }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="block py-2 pl-3 pr-4 sm:text-xl rounded md:p-0 relative group
             after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
             after:h-[2px] after:w-0 after:bg-blue-500 
             after:transition-all after:duration-300 group-hover:after:w-full"
    >
      {label}
    </Link>
  );
}
