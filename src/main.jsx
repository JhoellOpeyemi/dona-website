import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import "./fonts.css";
import "./index.css";
import App from "./App.jsx";

const apiKey = import.meta.env.VITE_STORYBLOK_DELIVERY_API_TOKEN;

storyblokInit({
  accessToken: apiKey,
  use: [apiPlugin],
  apiOptions: {
    region: "eu",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
