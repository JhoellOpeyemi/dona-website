// hooks import
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Divider = ({ text }) => {
  const dividerRef = useRef();
  const tl = useRef();

  useGSAP(() => {
    const dividers = gsap.utils.toArray(".divider .divider-heading");

    dividers.forEach((divider) => {
      gsap.set(divider, { x: "110%" });

      tl.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: divider,
            start: "top 90%",
            end: "bottom top",
            scrub: 2,
          },
        })
        .to(divider, { x: "-35%" });
    });
  }, [{ scope: dividerRef.current }]);

  return (
    <div className="divider" ref={dividerRef}>
      <div className="container">
        <h2 className="divider-heading">{text}</h2>
      </div>
    </div>
  );
};

export default Divider;
