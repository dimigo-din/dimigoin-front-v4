import type {DefaultTheme} from "styled-components";

export const theme: DefaultTheme = {
  Colors: {
    Background: {
      Standard: {
        Primary: "#ffffff",
        Secondary: "#f6f6fa",
        Tertiary: "#ebecf5",
      },
      Inverted: {
        Primary: "#000000",
        Secondary: "#09090a",
        Tertiary: "#0e0e0f",
      },
    },
    Content: {
      Standard: {
        Primary: "#202128",
        Secondary: "#202128b3",
        Tertiary: "#20212880",
        Quaternary: "#2021284d",
      },
      Inverted: {
        Primary: "#f4f4f5",
        Secondary: "#f4f4f599",
        Tertiary: "#f4f4f566",
        Quaternary: "#f4f4f533",
      },
    },
    Line: {
      Divider: "#797b8a29",
      Outline: "#797b8a1f",
    },
    Components: {
      Fill: {
        Standard: {
          Primary: "#fefeff",
          Secondary: "#fafafa",
          Tertiary: "#f4f4f5",
        },
        Inverted: {
          Primary: "#131314",
          Secondary: "#161617",
          Teritary: "#1b1b1d",
        },
      },
      Translucent: {
        Primary: "#484f8a29",
        Secondary: "#484f8a14",
        Tertiary: "#484f8a0f",
        Interactive: "#fefefff5",
      },
      Interaction: {
        Hover: "#20212814",
        Pressed: "#20212829",
        Focussed: "#2021281f",
      },
    },
    Solid: {
      Red: "#ff4035",
      Orange: "#ff9a05",
      Yellow: "#f5c905",
      Green: "#32cc58",
      Blue: "#057fff",
      Indigo: "#5b59de",
      Purple: "#b756e8",
      Pink: "#ff325a",
      Brown: "#a78963",
      Translucent: {
        Red: "#ff40351a",
        Orange: "#ff9a051a",
        Yellow: "#f5c9051a",
        Green: "#32cc581a",
        Blue: "#057fff1a",
        Indigo: "#5b59de1a",
        Purple: "#b756e81a",
        Pink: "#ff325a1a",
        Brown: "#a789631a",
      },
      Black: "#000000",
      White: "#ffffff",
    },
    Core: {
      Brand: {
        Primary: "#e83c77",
        Teritary: "#e83c771a",
        Secondary: "#e83c7780",
      },
      Status: {
        Positive: "#32cc58",
        Warning: "#f5c905",
        Negative: "#ff4035",
        Translucent: {
          Positive: "#32cc581a",
          Warning:
            "#f5c9051a",
          Negative:
            "#ff40351a",
        }
      },
    },
    Calendar: {
      Exam: "#5b59de",
      Home: "#32cc58",
      Vacation: "#057fff",
      Event: "#f5c905",
      Stay: "#ff4035",
    },
  },
  Font: {
    Display: {size: "3rem", lineHeight: "70px", weight: {weak: 400, regular: 500, strong: 600}},
    Title: {size: "1.5rem", lineHeight: "34px", weight: {weak: 400, regular: 500, strong: 600}},
    Headline: {size: "1.25rem", lineHeight: "28px", weight: {weak: 400, regular: 500, strong: 600}},
    Body: {size: "1rem", lineHeight: "24px", weight: {weak: 400, regular: 500, strong: 600}},
    Callout: {size: "0.875rem", lineHeight: "20px", weight: {weak: 400, regular: 500, strong: 600}},
    Footnote: {size: "0.75rem", lineHeight: "18px", weight: {weak: 400, regular: 500, strong: 600}},
    Caption: {size: "0.625rem", lineHeight: "14px", weight: {weak: 400, regular: 500, strong: 600}},
    Paragraph_Large: {size: "1rem", lineHeight: "28.8px", weight: {weak: 400, regular: 500, strong: 600}},
    Paragraph_Small: {size: "0.875rem", lineHeight: "24px", weight: {weak: 400, regular: 500, strong: 600}},
  },
};
