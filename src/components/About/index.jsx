// hooks import
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// stylesheet import
import "./about.css";

// utils functions import
import { splitText } from "../../utils";

// animations import
import { aboutAnimation } from "./utils";

// images import
import image1 from "/assets/portraits/portraits-5.jpg";
import image2 from "/assets/creative-edge/edge-8.jpg";

gsap.registerPlugin(useGSAP);

const About = () => {
  const aboutRef = useRef();
  const tl = useRef();

  useGSAP(() => {
    splitText(".section-heading", "chars");
    splitText(".about-text p", "words");

    aboutAnimation(tl);
  }, [{ scope: aboutRef.current }]);

  return (
    <section className="about-section" ref={aboutRef}>
      <div className="container">
        <div className="about-heading" id="about">
          <h2 className="section-heading">About</h2>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a young and passionate model building my journey in fashion
              and creativity. My work reflects confidence, versatility, and a
              love for storytelling through style and expression. From portraits
              to editorial shoots, I bring energy and authenticity to every
              project, always eager to grow and collaborate.
            </p>
          </div>

          <div className="about-images-container">
            <div className="about-image about-image-1">
              <img src={image1} alt="" />
            </div>

            <div className="about-image about-image-2">
              <img src={image2} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
