// hooks import
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// utils functions import
import { splitText } from "../../utils";

// animations import
import { contactAnimation } from "./utils";

// images import
import ContactImage from "/assets/portraits/portraits-5.jpg";
import TwitterIcon from "/assets/twitter.svg";
import InstagramIcon from "/assets/instagram.svg";
import TiktokIcon from "/assets/tiktok.svg";

// stylesheet import
import "./contact.css";

gsap.registerPlugin(useGSAP);

const Contact = () => {
  const contactRef = useRef();
  const tl = useRef();

  useGSAP(() => {
    splitText(".contact-heading .section-heading", "chars");
    splitText(".contact-text-intro", "words");
    splitText(".contact-text", "words");

    contactAnimation(tl);
  }, [{ scope: contactRef.current }]);

  return (
    <section className="contact-section" ref={contactRef}>
      <div className="container">
        <div className="contact-heading" id="contact">
          <h2 className="section-heading">Contact</h2>
        </div>

        <div className="contact-content">
          <div className="contact-details-container">
            <div className="contact-text-container">
              <p className="contact-text-intro">Let’s Work Together!</p>
              <p className="contact-text">
                Looking to collaborate, book a shoot, or request more details?
                Feel free to reach out. I’d love to hear from you!
              </p>
            </div>

            <div className="contact-links-container">
              <div className="contact-image-container">
                <img src={ContactImage} alt="" />
              </div>

              <div className="socials-container">
                <div className="socials-n-other-container">
                  <div className="socials">
                    <a
                      href=""
                      className="social"
                      aria-label="View my Twitter account"
                    >
                      <img src={TwitterIcon} alt="" />
                    </a>

                    <a
                      href=""
                      className="social"
                      aria-label="View my Instagram account"
                    >
                      <img src={InstagramIcon} alt="" />
                    </a>

                    <a
                      href=""
                      className="social"
                      aria-label="View my Tiktok account"
                    >
                      <img src={TiktokIcon} alt="" />
                    </a>
                  </div>
                  <div className="other-links">
                    <a href="" className="phone other-link">
                      +2349053888888
                    </a>

                    <a
                      href="mailto:blessingudofia@gmail.com"
                      className="email other-link"
                    >
                      blessingudofia@gmail.com
                    </a>
                  </div>
                </div>

                <p className="copyright">
                  &copy; 2025 Blessing Udofia. All rights reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
