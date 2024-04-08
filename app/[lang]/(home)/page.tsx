import Contact from "@/components/Home/Contact";
import Hero from "@/components/Home/Hero";
import Banner from "@/components/Home/Banner";
import Category from "@/components/Home/Category";
import Intro from "@/components/Home/Intro";
import SocialMedia from "@/components/Home/SocialMedia";


export default function Home() {
  return (
    <main>
      <div>
      <Banner />
      <Category />
      <Intro />
      <Hero />
      <SocialMedia />
      <Contact />
      </div>
    </main>
  );
}
