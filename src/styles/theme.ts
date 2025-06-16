import type { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
    colors: {
        font: {
            primary: "#202128",
            secondary: "rgba(102, 102, 102, 0.5)",
            tertiary: "rgba(102, 102, 102, 0.3)",
        },
        border: {
            primaryFocus: "#CAC8C8",
            primary: "#e4e4e4",
            secondary: "#d2d2d2",
        },
        translucent: {
            primary: "#484F8A1A",
        },
        solid: {
            white: "#ffffff",
        },
        background: {
            primary: "#ebecf5",
        },
        brand: {
            primary: "#e83c77",
            secondary: "#e83c787b",
        },
        button: {
            primary: "#e83c77",
            primaryHover: "#d32f6a",
            primaryActive: "#b22a5e",
            disabled: "#f0f0f0",
        },
    },
    font: {
        sm: {
            size: "0.875rem",
            lineHeight: "20px",
            weight: "400",
        },
        base: {
            size: "1rem",
            lineHeight: "20px",
            weight: "400",
        },
        baseBold: {
            size: "1rem",
            lineHeight: "20px",
            weight: "600",
        },
        baseHeavy: {
            size: "1.125rem",
            lineHeight: "20px",
            weight: "700",
        },
        lg: {
            size: "1.125rem",
            lineHeight: "20px",
            weight: "400",
        },
        xl: {
            size: "1.5rem",
            lineHeight: "24px",
            weight: "600",
        },
        xlBold: {
            size: "1.5rem",
            lineHeight: "20px",
            weight: "600",
        },
    },
};
