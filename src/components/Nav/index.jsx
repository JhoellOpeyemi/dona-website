// hooks import
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// function import
import { splitText } from "../../utils";

// stylesheet import
import "./nav.css";

gsap.registerPlugin(useGSAP);
const Nav = () => {
  const [nav, setNav] = useState(false);
  const [clicked, setClicked] = useState(0);
  const navRef = useRef();
  const tl = useRef();

  const handleNav = () => {
    gsap.to(".menu", { opacity: 1, visibility: "visible" });
    setClicked((prev) => prev + 1);
    setNav(!nav);
  };

  useEffect(() => {
    const menu = document.querySelector(".menu");
    const menuContainer = document.querySelector(".menu-container");

    window.addEventListener("scroll", () => {
      const vh = window.innerHeight;
      const scrollY = window.scrollY;

      if (scrollY >= vh) {
        gsap.to(menuContainer, { display: "flex" });
        gsap.to(menu, { opacity: 1, visibility: "visible", duration: 0.75 });
      } else {
        gsap.to(menuContainer, { display: "none" });
        gsap.to(menu, {
          opacity: 0,
          visibility: "hidden",
          duration: 0.75,
        });
      }
    });
  });

  //   useEffect(() => {
  //     if (nav) {
  //       document.body.classList.add("no-scroll");
  //     } else {
  //       document.body.classList.remove("no-scroll");
  //     }
  //   }, [nav]);

  useGSAP(() => {
    const navLinks = gsap.utils.toArray(".sticky-nav-link");

    splitText(navLinks, "chars");

    gsap.set(".sticky-nav", { y: "-100%" });
    gsap.set(".sticky-nav-link .char", { y: "100%" });
    gsap.set(".menu", { color: "#222", opacity: 0, visibility: "hidden" });

    tl.current = gsap
      .timeline({ paused: true })
      .to(".sticky-nav", {
        y: 0,
        duration: 0.75,
        ease: "power3.in",
      })
      .to(".menu", { color: "#fbfbfb", duration: 0.75 }, "<")
      .to(".sticky-nav-link .char", {
        y: 0,
        ease: "power3.out",
        duration: 0.5,
      });

    if (nav) {
      tl.current.play();
    }
    if (!nav && clicked > 0) {
      tl.current.reverse(0);
    }
  }, [{ scope: navRef.current }]);

  return (
    <div className="sticky-nav-container" ref={navRef}>
      <nav className={nav ? "sticky-nav active" : "sticky-nav"}>
        <div className="container">
          <a href="/" className="sticky-nav-link active">
            Home
          </a>
          <a href="#about" className="sticky-nav-link">
            About
          </a>
          <a href="#portfolio" className="sticky-nav-link">
            Portfolio
          </a>
          <a href="#comp-card" className="sticky-nav-link">
            Comp Card
          </a>
          <a href="#contact" className="sticky-nav-link contact">
            Contact
          </a>
        </div>
      </nav>

      <div className="menu-container">
        <button className="menu" onClick={handleNav}>
          {nav ? "Close" : "Menu"}
        </button>
      </div>
    </div>
  );
};

export default Nav;
