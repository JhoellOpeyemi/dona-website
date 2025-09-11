import ReactLenis from "lenis/react";

const SmoothScroll = ({ children }) => {
  return (
    <ReactLenis root options={{ lerp: 0.05 }}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
