import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// reveal comp card on scroll
export const cardScroll = (tl, ref) => {
  gsap.set(".card-thumbnail", {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  });

  tl.current = gsap
    .timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 30%",
      },
    })
    .to(".card-main-image img", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.75,
      ease: "power3.out",
    })
    .to(".card-thumbnail", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power3.out",
      duration: 0.75,
      stagger: { each: 0.1, from: "start" },
    })
    .to(".comp-card-details-container", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.1,
      ease: "power4.out",
    })
    .to(".comp-card-details-container li", {
      x: 0,
      stagger: { each: 0.05, from: "start" },
    })
    .to(".comp-card-details-container li span", {
      opacity: 1,
      stagger: { each: 0.05, from: "start" },
    });
};

export const mobileCardScroll = (tl, ref) => {
  gsap.set(".card-thumbnail", {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  });
  gsap.set(".comp-card-details-container li", { opacity: 0 });
  gsap.set(".details-btn-container", { opacity: 0 });

  tl.current = gsap
    .timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 30%",
      },
    })
    .to(".card-main-image img", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.75,
      ease: "power3.out",
    })
    .to(".card-thumbnail", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power3.out",
      duration: 0.75,
      stagger: { each: 0.1, from: "start" },
    })
    .to(".comp-card-details-container li", { opacity: 1 }, "<")
    .to(".details-btn-container", { opacity: 1 });
};

// changes the main image based on the thumbnail selected
export const cardThumbnailClick = (e, elementRef) => {
  // create image element when thumbnail is clicked to help animate
  const src = e.target.firstChild.src;
  createImage(elementRef.current, src);

  // update thumbnails class
  const thumbnails = Array.from(
    document.querySelectorAll(".card-thumbnail-btn")
  );
  thumbnails.forEach((thumbnail) => {
    thumbnail.classList.remove("selected");
  });
  e.target.classList.add("selected");
};

// handles image creation and animation
const createImage = (element, src) => {
  // remove img elements in main image parent from the dom if img elements are more than two
  const elementRefArray = element.children;

  if (elementRefArray.length > 2) {
    element.removeChild(element.firstChild);
  }

  const selectedImage = document.createElement("img");
  selectedImage.src = src;
  selectedImage.alt = "";
  element.appendChild(selectedImage);

  gsap.to(".card-main-image img", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1,
    ease: "power3.out",
  });
};

// sets the first thumbnail as selected on initial load or refresh
export const setInitialThumbnail = () => {
  const thumbnails = Array.from(
    document.querySelectorAll(".card-thumbnail-btn")
  );
  thumbnails.forEach((thumbnail) => {
    thumbnail.classList.remove("selected");
  });
  thumbnails[0].classList.add("selected");
};
