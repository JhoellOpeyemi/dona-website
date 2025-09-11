import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const tags = [
  "Creative Edge",
  "Bold Statements",
  "Portraits",
  "Commercial",
  "Everyday Stories",
];

// handles the selected state of the tag btns and updates the image gallery accordingly
export const tagBtnClick = (e, tag, elementRef, setSelected, allImages) => {
  const thumbnails = gsap.utils.toArray(
    document.querySelectorAll(".image-thumbnail")
  );

  gsap.set(thumbnails, {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  });

  const tags = Array.from(document.querySelectorAll(".tag-btn"));
  const splittedTag = tag.split(" ")[0].toLowerCase();
  setSelected(allImages[splittedTag]);

  // update tags class
  tags.forEach((tag) => {
    tag.classList.remove("selected");
  });
  e.target.classList.add("selected");

  // get tag images and create image element to animate
  const src = allImages[splittedTag][0].filename;
  createImage(elementRef.current, src, "tag");

  gsap.to(thumbnails, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ease: "power3.out",
    duration: 0.75,
    stagger: { each: 0.1, from: "start" },
  });
};

// changes the main image based on the thumbnail selected
export const thumbnailClick = (e, elementRef) => {
  // create image element when thumbnail is clicked to help animate
  const src = e.target.firstChild.src;
  createImage(elementRef.current, src, "thumbnail");

  // update thumbnails class
  const thumbnails = Array.from(
    document.querySelectorAll(".image-thumbnail-btn")
  );
  thumbnails.forEach((thumbnail) => {
    thumbnail.classList.remove("selected");
  });
  e.target.classList.add("selected");
};

// sets the first thumbnail as selected on initial load or refresh
export const setInitialThumbnail = () => {
  const thumbnails = Array.from(
    document.querySelectorAll(".image-thumbnail-btn")
  );
  thumbnails.forEach((thumbnail) => {
    thumbnail.classList.remove("selected");
  });
  thumbnails[0].classList.add("selected");
};

// handles image creation and animation
const createImage = (element, src, type) => {
  // remove img elements in main image parent from the dom if img elements are more than two
  const elementRefArray = element.children;

  if (type == "thumbnail") {
    if (elementRefArray.length > 2) {
      element.removeChild(element.firstChild);
    }
  } else if (type == "tag") {
    if (elementRefArray.length >= 2) {
      element.removeChild(element.firstChild);
    }
  }

  const selectedImage = document.createElement("img");
  selectedImage.src = src;
  selectedImage.alt = "";
  element.appendChild(selectedImage);

  gsap.to(".main-image img", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1,
    ease: "power3.out",
  });
};

// reveal portfolio on scroll
export const portfolioScroll = (tl, ref, setInitial) => {
  gsap.set(".tag-btn .word", { y: "140%" });
  gsap.set(".tag-btn-container", { x: "100%" });
  gsap.set(".image-thumbnail", {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  });
  gsap.set(".main-image img", {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  });

  tl.current = gsap
    .timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 30%",
      },
      onComplete: () => setInitial(false),
    })
    .to(".main-image img", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: "power3.out",
    })
    .to(
      ".image-thumbnail",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power3.out",
        duration: 0.75,
        stagger: { each: 0.1, from: "start" },
      },
      "<"
    )
    .to(
      ".tag-btn-container",
      {
        x: 0,
      },
      "<"
    )
    .to(".tag-btn .word", {
      y: 0,
      duration: 0.75,
      ease: "power3.out",
      stagger: {
        from: "start",
      },
    });
};

export const mobilePortfolioScroll = (tl, ref, setInitial) => {
  gsap.set(".tag-btn .word", { opacity: 0 });
  gsap.set(".tag-btn-container", { opacity: 0, y: "100%" });
  gsap.set(".image-thumbnail", {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  });
  gsap.set(".main-image img", {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  });

  tl.current = gsap
    .timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 30%",
      },
      onComplete: () => setInitial(false),
    })
    .to(".main-image img", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: "power3.out",
    })
    .to(
      ".image-thumbnail",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power3.out",
        duration: 0.75,
        stagger: { each: 0.1, from: "start" },
      },
      "<"
    )
    .to(
      ".tag-btn-container",
      {
        opacity: 1,
        y: 0,
      },
      "<"
    )
    .to(".tag-btn .word", {
      opacity: 1,
      duration: 0.75,
      ease: "power3.out",
      stagger: {
        from: "start",
      },
    });
};

export const actionBtnClick = (
  action,
  elementRef,
  setSelected,
  allImages,
  actionIndex,
  setActionIndex
) => {
  const tags = Array.from(document.querySelectorAll(".tag-btn"));
  const thumbnails = gsap.utils.toArray(
    document.querySelectorAll(".image-thumbnail")
  );
  const imageTagsContainer = document.querySelector(".tag-btn-wrapper");

  gsap.set(thumbnails, {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  });

  if (action == "next") {
    if (actionIndex === tags.length - 1) {
      return;
    }

    setActionIndex((prev) => prev + 1);

    tags.forEach((tag) => {
      tag.classList.remove("selected");
      tags[actionIndex + 1].classList.add("selected");

      if (tag.classList.contains("selected")) {
        const splittedTag = tag.textContent.split(" ")[0].toLowerCase();
        setSelected(allImages[splittedTag]);

        // get tag images and create image element to animate
        const src = allImages[splittedTag][0].filename;
        createImage(elementRef.current, src, "tag");
      }
    });

    // move the tags container to the left
    gsap.to(imageTagsContainer, {
      x: `-=${100 / tags.length}%`,
      duration: 0.75,
    });

    gsap.to(thumbnails, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power3.out",
      duration: 0.75,
      stagger: { each: 0.1, from: "start" },
    });
  } else if (action == "prev") {
    if (actionIndex === 0) {
      return;
    }

    setActionIndex((prev) => prev - 1);
    tags.forEach((tag) => {
      tag.classList.remove("selected");
      tags[actionIndex - 1].classList.add("selected");

      if (tag.classList.contains("selected")) {
        const splittedTag = tag.textContent.split(" ")[0].toLowerCase();
        setSelected(allImages[splittedTag]);

        // get tag images and create image element to animate
        const src = allImages[splittedTag][0].filename;
        createImage(elementRef.current, src, "tag");
      }
    });

    // move the tags container to the right
    gsap.to(imageTagsContainer, {
      x: `+=${100 / tags.length}%`,
      duration: 0.75,
    });

    gsap.to(thumbnails, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power3.out",
      duration: 0.75,
      stagger: { each: 0.1, from: "start" },
    });
  }
};
