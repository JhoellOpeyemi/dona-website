// hooks import
import { useRef, useState } from "react";
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

  const handleNav = () => {
    gsap.to(".mobile-menu", { opacity: 1, visibility: "visible" });
    setClicked((prev) => prev + 1);
    setNav(!nav);
  };

  //   useEffect(() => {
  //     if (nav) {
  //       document.body.classList.add("no-scroll");
  //     } else {
  //       document.body.classList.remove("no-scroll");
  //     }
  //   }, [nav]);

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
    }
    if (!nav && clicked > 0) {
      tl.current.reverse(0);
    }
  }, [{ scope: navRef.current }]);

  return (
    <div className="mobile-nav-container" ref={navRef}>
      <nav className={nav ? "mobile-nav active" : "mobile-nav"}>
        <div className="container">
          <a href="/" className="mobile-nav-link active">
            Home
          </a>
          <a href="#about" className="mobile-nav-link">
            About
          </a>
          <a href="#portfolio" className="mobile-nav-link">
            Portfolio
          </a>
          <a href="#comp-card" className="mobile-nav-link">
            Comp Card
          </a>
          <a href="#contact" className="mobile-nav-link contact">
            Contact
          </a>
        </div>
      </nav>

      <div className="mobile-menu-container">
        <p className="time">12:30PM</p>

        <p className="logo">Dona</p>

        <button className="mobile-menu" onClick={handleNav}>
          {nav ? "Close" : "Menu"}
        </button>
      </div>
    </div>
  );
};

export default MobileHeader;
