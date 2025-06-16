// styled.d.ts
import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            font: {
                primary: string;
                secondary: string;
                tertiary: string;
            };
            border: {
                primaryFocus: string;
                primary: string;
                secondary: string;
            };
            translucent: {
                primary: string;
            };
            solid: {
                white: string;
            };
            background: {
                primary: string;
            };
            brand: {
                primary: string;
                secondary: string;
            };
            button: {
                primary: string;
                primaryHover: string;
                primaryActive: string;
                disabled: string;
            };
        };
        font: {
            sm: {
                size: string;
                lineHeight: string;
                weight: string;
            };
            base: {
                size: string;
                lineHeight: string;
                weight: string;
            };
            baseBold: {
                size: string;
                lineHeight: string;
                weight: string;
            };
            baseHeavy: {
                size: string;
                lineHeight: string;
                weight: string;
            };
            lg: {
                size: string;
                lineHeight: string;
                weight: string;
            };
            xl: {
                size: string;
                lineHeight: string;
                weight: string;
            };
            xlBold: {
                size: string;
                lineHeight: string;
                weight: string;
            };
        };
    }
}
