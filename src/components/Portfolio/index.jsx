// hooks import
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useStoryblok } from "@storyblok/react";

// stylesheet import
import "./portfolio.css";

// data import
import {
  actionBtnClick,
  portfolioScroll,
  mobilePortfolioScroll,
  setInitialThumbnail,
  tagBtnClick,
  tags,
  thumbnailClick,
} from "./utils";
import { splitText } from "../../utils";

gsap.registerPlugin(useGSAP);
const Portfolio = () => {
  const [initial, setInitial] = useState(true);
  const [allImages, setAllImages] = useState({});
  const [selected, setSelected] = useState([]);
  const [actionIndex, setActionIndex] = useState(0);
  const mainImageRef = useRef();
  const portfolioRef = useRef();
  const scrollTl = useRef();

  const story = useStoryblok("portfolio", {
    version: "draft",
  });

  const viewport = window.innerWidth;

  useEffect(() => {
    if (story !== undefined) {
      setAllImages({
        creative: story.content?.body[0].images,
        bold: story.content?.body[1].images,
        portraits: story.content?.body[2].images,
        commercial: story.content?.body[3].images,
        everyday: story.content?.body[4].images,
      });
    }
  }, [story]);

  useEffect(() => {
    setSelected(allImages["creative"]);
  }, [allImages]);

  useEffect(() => {
    if (selected !== undefined) {
      //   set the fist thumbnail as selected
      if (selected.length > 0) {
        setInitialThumbnail();
      }
    }
  }, [selected]);

  useEffect(() => {
    if (viewport > 768) {
      if (selected !== undefined && initial) {
        portfolioScroll(scrollTl, portfolioRef, setInitial);
      }
    } else {
      if (selected !== undefined && initial) {
        mobilePortfolioScroll(scrollTl, portfolioRef, setInitial);
      }
    }
  }, [selected]);

  useEffect(() => {
    // set the fist tag btn as selected
    const first = document.querySelector(".tag-btn");
    first.classList.add("selected");
  }, []);

  useGSAP(() => {
    const btns = gsap.utils.toArray(".tag-btn");
    splitText(btns, "words");
  }, [{ scope: portfolioRef.current }]);

  return (
    <div className="portfolio-section" ref={portfolioRef} id="portfolio">
      <div className="container">
        <div className="image-gallery">
          <div className="main-image" ref={mainImageRef}>
            {selected !== undefined ? (
              <img src={selected[0]?.filename} alt="" />
            ) : (
              <p className="image-loading-text">Loading Images...</p>
            )}
          </div>

          <div className="images-thumbnail-container">
            {selected !== undefined && (
              <>
                {selected.map((image, index) => (
                  <div className="image-thumbnail" key={index}>
                    <button
                      className="image-thumbnail-btn"
                      onClick={(e) => thumbnailClick(e, mainImageRef)}
                    >
                      <img src={image.filename} alt="" />
                      <div className="overlay"></div>
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="image-tags">
          {viewport <= 768 && (
            <div className="action-btn-container">
              <button
                className="prev-btn action-btn"
                aria-label="Previous"
                onClick={() =>
                  actionBtnClick(
                    "prev",
                    mainImageRef,
                    setSelected,
                    allImages,
                    actionIndex,
                    setActionIndex
                  )
                }
              >
                &lt;
              </button>
              <button
                className="next-btn action-btn"
                aria-label="Next"
                onClick={() =>
                  actionBtnClick(
                    "next",
                    mainImageRef,
                    setSelected,
                    allImages,
                    actionIndex,
                    setActionIndex
                  )
                }
              >
                &gt;
              </button>
            </div>
          )}
          <div className="tag-btn-wrapper">
            {viewport <= 768 ? (
              <>
                {tags.map((tag, index) => (
                  <div className="tag-btn-container" key={index}>
                    <p className="tag-btn">{tag}</p>
                  </div>
                ))}
              </>
            ) : (
              <>
                {tags.map((tag, index) => (
                  <div className="tag-btn-container" key={index}>
                    <button
                      className="tag-btn"
                      onClick={(e) =>
                        tagBtnClick(
                          e,
                          tag,
                          mainImageRef,
                          setSelected,
                          allImages
                        )
                      }
                    >
                      {tag}
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
