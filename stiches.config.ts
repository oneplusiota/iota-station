import { createStitches } from "@stitches/react";

export const { styled, getCssText, createTheme, globalCss } = createStitches({
  theme: {
    colors: {
      text: "black",
      background: "white",
    },
  },
});

export const darkTheme = createTheme({
  colors: {
    text: "white",
    background: "black",
  },
});

const GlobalStyles = globalCss({
  body: {
    background: "$background",
    color: "$text",
  },
});

GlobalStyles();
