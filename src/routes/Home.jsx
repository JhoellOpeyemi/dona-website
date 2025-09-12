// hooks import
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// components import
import Loader from "../components/Loader";
import Nav from "../components/Nav";
import Divider from "../components/Divider";
import Hero from "../components/Hero";
import About from "../components/About";
import Portfolio from "../components/Portfolio";
import CompCard from "../components/CompCard";
import Contact from "../components/Contact";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const homeABoutRef = useRef();
  const tl = useRef();

  const countDelay = 400;

  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useGSAP(() => {
    tl.current = gsap
      .timeline({
        scrollTrigger: {
          trigger: homeABoutRef.current,
          start: 1,
          end: "bottom bottom",
          scrub: 2,
        },
      })
      .to(".main-section", {
        scale: 0.85,
        rotate: -5,
      })
      .from(
        ".about-section",
        {
          scale: 0.85,
          rotate: 5,
        },
        "<"
      );
  }, [{ scope: homeABoutRef.current }]);

  return (
    <>
      {isLoading ? (
        <Loader countDelay={countDelay} setIsLoading={setIsLoading} />
      ) : (
        <>
          <Nav />
          <div className="home-about-container" ref={homeABoutRef}>
            <Hero />
            <About />
          </div>

          <div className="other-sections-container">
            <Divider text="Portfolio" />
            <Portfolio />

            <Divider text="Comp Card" />
            <CompCard />

            {/* <Divider text="" /> */}
            <Contact />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
