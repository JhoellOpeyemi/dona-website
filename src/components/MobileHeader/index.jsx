// hooks import
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// function import
import { splitText } from "../../utils";

// stylesheet import
import "./mobileHeader.css";

gsap.registerPlugin(useGSAP);
const MobileHeader = () => {
  const [nav, setNav] = useState(false);
  const [clicked, setClicked] = useState(0);
  const navRef = useRef();
  const tl = useRef();

  const handleNav = (path = "home") => {
    gsap.to(".menu", { opacity: 1, visibility: "visible" });
    setClicked((prev) => prev + 1);

    if (path == "home") {
      window.scrollTo(0, 0);
    }
    setNav(!nav);
  };

  useEffect(() => {
    const menuContainer = document.querySelector(".mobile-menu-container");

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;

      if (scrollY >= 1) {
        gsap.to(menuContainer, { pointerEvents: "none" });
      } else {
        gsap.to(menuContainer, { pointerEvents: "all" });
      }
    });
  });

  useGSAP(() => {
    const navLinks = gsap.utils.toArray(".mobile-nav-link");

    splitText(navLinks, "chars");

    gsap.set(".mobile-nav", { y: "-100%" });
    gsap.set(".mobile-nav-link .char", { y: "100%" });
    gsap.set(".mobile-menu", {
      color: "#222",
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(".mobile-nav", {
        y: 0,
        duration: 0.75,
        ease: "power3.in",
      })
      .to(".mobile-menu", { color: "#fbfbfb", duration: 0.75 }, "<")
      .to(".mobile-nav-link .char", {
        y: 0,
        ease: "power3.out",
        duration: 0.5,
      });

    if (nav) {
      tl.current.play();
      document.body.classList.add("menu-open");
    }
    if (!nav && clicked > 0) {
      tl.current.reverse(0);
      document.body.classList.remove("menu-open");
    }
  }, [{ scope: navRef.current }]);

  return (
    <div className="mobile-nav-container" ref={navRef}>
      <nav className={nav ? "mobile-nav active" : "mobile-nav"}>
        <div className="container">
          <a
            href="#home"
            className="mobile-nav-link active"
            onClick={() => handleNav("hone")}
          >
            Home
          </a>
          <a href="#about" className="mobile-nav-link" onClick={handleNav}>
            About
          </a>
          <a href="#portfolio" className="mobile-nav-link" onClick={handleNav}>
            Portfolio
          </a>
          <a href="#comp-card" className="mobile-nav-link" onClick={handleNav}>
            Comp Card
          </a>
          <a
            href="#contact"
            className="mobile-nav-link contact"
            onClick={handleNav}
          >
            Contact
          </a>
        </div>
      </nav>

      <div className="mobile-menu-container">
        <p className="logo">Dona</p>

        <p className="time">12:30PM</p>

        <button className="mobile-menu" onClick={handleNav}>
          {nav ? "Close" : "Menu"}
        </button>
      </div>
    </div>
  );
};

export default MobileHeader;
