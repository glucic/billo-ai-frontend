import Navbar from "@/components/common/NavbarComponent";
import Features from "@/components/landing/FeaturesComponent";
import { Hero } from "@/components/landing/HeroComponent";
import { useTranslations } from "next-intl";

export default function LandingPage() {
  const t = useTranslations("LandingPage");

  return (
    <main id="landing-page" className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
    </main>
  );
}
