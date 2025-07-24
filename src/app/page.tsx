import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import { ThemeToggle } from "@/components/theme-toggle";

export default function page() {
  return (
    <div>
      <Navbar />
      <div className="">
      <HeroSection />
      <div className="flex flex-col items-center justify-center h-screen">
        <ThemeToggle />
      </div>
      </div>
    </div>
  )
}
