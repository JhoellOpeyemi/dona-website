import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export const splitText = (identifier, type = "chars") => {
  if (Array.isArray(identifier)) {
    identifier.forEach((text) => {
      const split = new SplitText(text, { type: type });

      split.chars.forEach((char) => {
        char.classList.add("char");
      });
      split.words.forEach((word) => {
        word.classList.add("word");
      });
    });
  } else {
    const texts = document.querySelector(identifier);

    const split = new SplitText(texts, { type: type });

    split.chars.forEach((char) => {
      char.classList.add("char");
    });
    split.words.forEach((word) => {
      word.classList.add("word");
    });
  }
};
