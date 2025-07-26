import styled from "styled-components";

interface ButtonProps {
  width?: string;
}

export const Button = styled.button<ButtonProps & {type?: "primary" | "normal" | "danger"}>`
    padding: 16px 20px;
    border-radius: 12px;
    border: none;
    background-color: ${({theme, type}) => type === "normal" ? theme.Colors.Components.Translucent.Secondary : type === "danger" ? theme.Colors.Core.Status.Negative : theme.Colors.Core.Brand.Primary};
    color: ${({theme, type}) => type === "normal" ? theme.Colors.Solid.Black : theme.Colors.Solid.White};
    width: ${({width}) => width || "100%"};

    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.1s ease;

    &:active {
        background-color: ${({theme}) => theme.Colors.Core.Brand.Secondary};
    }

    &:disabled {
        background-color: ${({theme}) => theme.Colors.Components.Translucent.Secondary};
        cursor: not-allowed;
    }
`;
export const LightButton = styled.button<ButtonProps & {type?: "primary" | "danger"}>`
    padding: 16px 20px;
    border-radius: 12px;
    border: 1px solid ${({theme, type}) => type === "danger" ? theme.Colors.Solid.Red : theme.Colors.Solid.White};
    background-color: ${({theme, type}) => type === "danger" ? theme.Colors.Solid.Translucent.Red : theme.Colors.Core.Brand.Secondary};
    color: ${({theme, type}) => type === "danger" ? theme.Colors.Solid.Red : theme.Colors.Solid.White};
    width: ${({width}) => width || "100%"};

    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.1s ease;

    &:active {
        background-color: ${({theme}) => theme.Colors.Core.Brand.Secondary};
    }

    &:disabled {
        background-color: ${({theme}) => theme.Colors.Components.Translucent.Secondary};
        cursor: not-allowed;
    }
`;
