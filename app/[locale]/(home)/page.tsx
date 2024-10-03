import Contact from "@/components/Home/Contact";
import Hero from "@/components/Home/Hero";
import Category from "@/components/Home/Category";
import Intro from "@/components/Home/Intro";
import SocialMedia from "@/components/Home/SocialMedia";
import NewBanner from "@/components/Home/NewBanner/NewBanner";

export default function Home() {
  return (
    <main>
      <div>
        <NewBanner />
        <Category />
        <Intro />
        <Hero />
        <SocialMedia />
        <Contact />
      </div>
    </main>
  );
}
