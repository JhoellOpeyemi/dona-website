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
    <section id="about" className="about-section" ref={aboutRef}>
      <div className="container">
        <div className="about-heading">
          <h2 className="section-heading">About</h2>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p>
              Lorem ipsum dolor sit amet consectetur. Id duis donec nibh orci
              ultrices. Gravida quis tempor sit dictum eleifend volutpat ut
              convallis enim. Sit massa erat enim lectus. Vel ultricies leo amet
              in pellentesque cursus. Ac quisque at imperdiet et amet elementum
              commodo. Nec nulla eu enim rhoncus cras et.
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
