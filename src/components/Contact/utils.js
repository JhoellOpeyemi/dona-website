import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const contactAnimation = (tl) => {
  gsap.set(".contact-image-container img", {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  });
  gsap.set(".socials-container", { opacity: 0 });

  tl.current = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".contact-content",
        start: "clamp(top 70%)",
      },
    })
    .from(".contact-heading .section-heading .char", {
      y: "100%",
      duration: 1,
      ease: "power4.out",
      stagger: {
        each: 0.01,
        from: "start",
      },
    })
    .to(
      ".contact-image-container img",
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
      [".contact-text-intro .word", ".contact-text .word"],
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
    )
    .to(".socials-container", { opacity: 1, duration: 0.75 });
};
