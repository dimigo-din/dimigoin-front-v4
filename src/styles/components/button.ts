import styled from "styled-components";

interface ButtonProps {
  width?: string;
}

export const Button = styled.button<ButtonProps>`
    padding: 16px 20px;
    border-radius: 12px;
    border: none;
    background-color: ${(props) => props.theme.Colors.Core.Brand.Primary};
    color: ${(props) => props.theme.Colors.Solid.White};
    width: ${(props) => props.width || "100%"};

    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${(props) => props.theme.Colors.Components.Fill.Inverted.Primary};
    }

    &:active {
        background-color: ${(props) => props.theme.Colors.Components.Fill.Standard.Primary};
    }

    &:disabled {
        background-color: ${(props) => props.theme.Colors.Components.Fill.Standard.Secondary};
        cursor: not-allowed;
    }
`;
