import Image from "next/image";
import Banner from "./components/Home/Banner";
import Category from "./components/Home/Category";
import Intro from "./components/Home/Intro";
import SocialMedia from "./components/Home/SocialMedia";
import Hero from "./components/Hero";
import Contact from "./components/Contact";

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
