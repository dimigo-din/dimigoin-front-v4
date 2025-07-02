// styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    Colors: {
      Background: {
        Standard: {
          Primary: string;
          Secondary: string;
          Tertiary: string;
        };
        Inverted: {
          Primary: string;
          Secondary: string;
          Tertiary: string;
        };
      };
      Content: {
        Standard: {
          Primary: string;
          Secondary: string;
          Tertiary: string;
          Quaternary: string;
        };
        Inverted: {
          Primary: string;
          Secondary: string;
          Tertiary: string;
          Quaternary: string;
        };
      };
      Line: {
        Divider: string;
        Outline: string;
      };
      Components: {
        Fill: {
          Standard: {
            Primary: string;
            Secondary: string;
            Tertiary: string;
          };
          Inverted: {
            Primary: string;
            Secondary: string;
            Teritary: string;
          };
        };
        Translucent: {
          Primary: string;
          Secondary: string;
          Tertiary: string;
          Interactive: string;
        };
        Interaction: {
          Hover: string;
          Pressed: string;
          Focussed: string;
        };
      };
      Solid: {
        Red: string;
        Orange: string;
        Yellow: string;
        Green: string;
        Blue: string;
        Indigo: string;
        Purple: string;
        Pink: string;
        Brown: string;
        Translucent: {
          Red: string;
          Orange: string;
          Yellow: string;
          Green: string;
          Blue: string;
          Indigo: string;
          Purple: string;
          Pink: string;
          Brown: string;
        };
        Black: string;
        White: string;
      };
      Core: {
        Brand: {
          Primary: string;
          Secondary: string;
          Teritary: string;
        };
        Status: {
          Positive: string;
          Warning: string;
          Negative: string;
          Translucent: {
            Positive: string;
            Warning: string;
            Negative: string;
          };
        };
      };
      Calendar: {
        Exam: string;
        Home: string;
        Vacation: string;
        Event: string;
        Stay: string;
      };
    };
    Font: {
      [key in | "Display"
        | "Title"
        | "Headline"
        | "Body"
        | "Callout"
        | "Footnote"
        | "Caption"
        | "Paragraph_Large"
        | "Paragraph_Small"]: {
        size: string;
        lineHeight: string;
        weight: { [key: string]: number };
      };
    };
  }
}