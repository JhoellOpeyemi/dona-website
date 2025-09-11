// hooks import
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// stylesheet import
import "./loader.css";

gsap.registerPlugin(useGSAP);

const Loader = ({ setIsLoading }) => {
  const loaderRef = useRef();
  const tl = useRef();

  const percentages = [0, 19, 35, 60, 83, 92, 100];

  useEffect(() => {}, []);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    const spanHeight = document.querySelector(
      ".number-container span"
    ).offsetHeight;

    gsap.set(".loader-counter", { height: spanHeight });

    mm.add(
      { isMobile: "(max-width: 768px)", isDesktop: "(min-width: 769px)" },
      (context) => {
        let { isMobile, isDesktop } = context.conditions;

        if (isDesktop) {
          tl.current = gsap
            .timeline({ onComplete: () => setIsLoading(false) })
            .to(
              ".number-container",
              { y: `-${(percentages.length - 1) * 100}%`, duration: 4 },
              "+=1"
            )
            .to(
              [".loader-text", ".loader-counter"],
              {
                opacity: 0,
                duration: 0.75,
              },
              "+=0.5"
            )
            .to(".loader-container", {
              y: "-100%",
              visibility: "hidden",
              duration: 0.2,
              ease: "power4.out",
            });
        } else if (isMobile) {
          tl.current = gsap
            .timeline({ onComplete: () => setIsLoading(false) })
            .to(
              ".number-container",
              { y: `-${(percentages.length - 1) * 100}%`, duration: 4 },
              "+=1"
            )
            .to(
              [".loader-text", ".loader-counter"],
              {
                opacity: 0,
                duration: 0.75,
              },
              "+=0.5"
            )
            .to(".loader-container", {
              y: "-100%",
              visibility: "hidden",
              duration: 0.2,
              ease: "power4.out",
            })
            .to(".loader-container", { opacity: 0, duration: 0.2 });
        }
      }
    );
  }, [{ scope: loaderRef.current }]);

  return (
    <div className="loader-container" ref={loaderRef}>
      <div className="container">
        <h2 className="loader-text">Dona</h2>

        <h2 className="loader-counter">
          <span className="number-container">
            {percentages.map((percentage, index) => (
              <span key={index}>{percentage}</span>
            ))}
          </span>
          <span className="sign">%</span>
        </h2>
      </div>
    </div>
  );
};

export default Loader;
