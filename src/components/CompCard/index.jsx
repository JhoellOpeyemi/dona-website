// hooks import
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// data import
import { compDetails } from "../../data/details";
import { compCardImages } from "../../data/images";

// functions import
import {
  cardScroll,
  cardThumbnailClick,
  mobileCardScroll,
  setInitialThumbnail,
} from "./utils";

// stylesheet import
import "./compCard.css";

gsap.registerPlugin(useGSAP);

const CompCard = () => {
  const [stats, setStats] = useState(false);
  const cardRef = useRef();
  const cardImageRef = useRef();
  const scrollTl = useRef();
  const statsTl = useRef();

  const viewport = window.innerWidth;

  const handleStats = () => {
    setStats(!stats);
  };

  useEffect(() => {
    setInitialThumbnail();

    let mm = gsap.matchMedia();

    mm.add(
      { isMobile: "(max-width: 768px)", isDesktop: "(min-width: 769px)" },
      (context) => {
        let { isMobile, isDesktop } = context.conditions;

        if (isDesktop) {
          cardScroll(scrollTl, cardRef);
        } else if (isMobile) {
          mobileCardScroll(scrollTl, cardRef);
        }
      }
    );
  }, []);

  useGSAP(() => {
    gsap.set(".comp-card-details-container", {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.set(".comp-card-details-container li", { x: "-110%" });
    gsap.set(".comp-card-details-container li span", { opacity: 0 });

    statsTl.current = gsap
      .timeline({ paused: true })
      .to(".comp-card-details-container", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.75,
        ease: "power4.out",
      })
      .to(".comp-card-details-container li", {
        x: 0,
        duration: 0.5,
        stagger: { each: 0.05, from: "start" },
      })
      .to(
        ".comp-card-details-container li span",
        {
          opacity: 1,
          stagger: { each: 0.05, from: "start" },
        },
        "<+0.4"
      );

    if (stats) {
      statsTl.current.play();
    }
    if (!stats) {
      statsTl.current.reverse(0);
    }
  }, [{ scope: cardRef.current }]);

  return (
    <div className="comp-card-section" id="comp-card" ref={cardRef}>
      <div className="container">
        <div className="comp-card-content">
          {viewport <= 768 && (
            <div className="details-btn-container">
              <button className="details-btn" onClick={handleStats}>
                {stats ? "Close" : "View Stats"}
              </button>
            </div>
          )}

          <div className="comp-card-details-container">
            <ul>
              {Object.entries(compDetails).map(([key, value]) => (
                <li key={key}>
                  <span className="attribute">{key} —</span>
                  <span className="value"> {value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="comp-card-images-container">
            <div className="card-main-image" ref={cardImageRef}>
              <img src={compCardImages[0]} alt="" />
            </div>

            <div className="card-thumbnail-container">
              {compCardImages.map((src, index) => (
                <div className="card-thumbnail" key={index}>
                  <button
                    className="card-thumbnail-btn"
                    onClick={(e) => cardThumbnailClick(e, cardImageRef)}
                  >
                    <img src={src} alt="" />
                    <div className="overlay"></div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompCard;
