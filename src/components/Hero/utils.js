import gsap from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";

gsap.registerPlugin(CSSRulePlugin);

export const loading = (tl) => {
  gsap.set([".role", ".header"], { opacity: 0 });
  gsap.set(".hero-image-container img", { opacity: 0, scale: 0.9 });
  gsap.set(".hero-image-container ", { scale: 2.5 });
  gsap.set(".name .word", { opacity: 0, y: "100%" });

  tl.current = gsap
    .timeline()
    .to(".hero-image-container", {
      scale: 1,
      duration: 1.2,
      ease: "power4.out",
    })
    .to(
      ".hero-image-container img",
      {
        opacity: 1,
        scale: 1.2,
        duration: 1.2,
        ease: "power4.out",
      },
      "-=0.75"
    )
    .to(
      ".name .word",
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power4.out",
        stagger: {
          each: 0.01,
          from: "start",
        },
      },
      "<+0.5"
    )
    .to(
      [".role", ".header"],
      {
        opacity: 1,
        duration: 0.75,
      },
      "-=0.5"
    );
};

export const mobileLoading = (tl) => {
  gsap.set(".mobile-hero-curtain", { y: 0 });
  gsap.set(".name .word", { opacity: 0, y: "100%" });
  gsap.set(".hero-image-container", {
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
  });
  gsap.set(".hero-image-container img", { scale: 1 });

  tl.current = gsap
    .timeline()
    .to(
      ".mobile-hero-curtain",
      {
        y: "-100%",
        duration: 1.2,
        ease: "power4.out",
      },
      "+=0.5"
    )
    .to(
      ".name .word",
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power4.out",
        stagger: {
          each: 0.01,
          from: "start",
        },
      },
      "<+0.4"
    )
    .from(".image-n-roles-container", { opacity: 0 }, "-=0.5")
    .to(".hero-image-container", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: "power4.out",
    })
    .to(".hero-image-container img", { scale: 1.1, duration: 1 }, "<");
};
