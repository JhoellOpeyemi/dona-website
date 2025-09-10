import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const aboutAnimation = (tl) => {
  gsap.set(".about-image", {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  });

  tl.current = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".about-content",
        start: "top 80%",
      },
    })
    .from(".section-heading .char", {
      y: "100%",
      duration: 1,
      ease: "power4.out",
      stagger: {
        each: 0.01,
        from: "start",
      },
    })
    .to(
      ".about-image",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "power3.out",
        stagger: {
          each: 0.4,
          from: "start",
        },
      },
      "<+0.5"
    )
    .from(
      ".about-text p .word",
      {
        y: "100%",
        opacity: 0,
        duration: 0.2,
        ease: "power4.out",
        stagger: {
          each: 0.005,
          from: "start",
        },
      },
      "-=0.6"
    );
};
