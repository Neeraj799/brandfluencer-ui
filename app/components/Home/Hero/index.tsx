import React from "react";

const Hero = () => {
  return (
    <>
    <div className="hero mt-20 mb-36 max-h-96" style={{backgroundImage: 'url(/home/influencersBanner.png)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-accent antialiased text-4xl font-bold pt-5">OUR STORY</h1>
      <p className="mb-5 antialiased font-medium text-md">We’re passionate about helping brands find their creative voice. Founded in 2020, we aim to help our clients thrive in a changing omni-channel world and leverage their unique strengths to build a personalized roadmap to success. We’re here to make your life easier — talk to us about how we can help.</p>
    </div>
  </div>
</div>
    </>
  );
};

export default Hero;
