// hooks import
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// stylesheet import
import "./loader.css";

gsap.registerPlugin(useGSAP);

const Loader = ({ countDelay, setIsLoading }) => {
  const [count, setCount] = useState(0);
  const loaderRef = useRef();
  const tl = useRef();

  const percentages = [0, 19, 35, 60, 83, 92, 100];

  const updateCounter = () => {
    percentages.forEach((percentage, index) => {
      setTimeout(() => {
        setCount(percentage);
      }, index * countDelay);
    });
  };

  useEffect(() => {
    updateCounter();
  }, []);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add(
      { isMobile: "(max-width: 768px)", isDesktop: "(min-width: 769px)" },
      (context) => {
        let { isMobile, isDesktop } = context.conditions;

        if (isDesktop) {
          tl.current = gsap
            .timeline({ onComplete: () => setIsLoading(false) })
            .to(".loader-counter", { opacity: 0 }, "+=3.2")
            .to(".loader-container", {
              y: "-100%",
              visibility: "hidden",
              duration: 0.2,
              ease: "power4.out",
            });
        } else if (isMobile) {
          tl.current = gsap
            .timeline({ onComplete: () => setIsLoading(false) })
            .to(".loader-counter", { opacity: 0 }, "+=3.2")
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
      <h2 className="loader-counter">{count}%</h2>
    </div>
  );
};

export default Loader;
