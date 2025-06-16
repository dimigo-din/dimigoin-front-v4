import styled from "styled-components";

interface ButtonProps {
    width?: string;
}
export const Button = styled.button<ButtonProps>`
    padding: 16px 20px;
    border-radius: 12px;
    border: none;
    background-color: ${(props) => props.theme.colors.brand.primary};
    color: ${(props) => props.theme.colors.solid.white};
    width: ${(props) => props.width || "100%"};

    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${(props) => props.theme.colors.button.primaryHover};
    }

    &:active {
        background-color: ${(props) => props.theme.colors.button.primaryActive};
    }

    &:disabled {
        background-color: ${(props) => props.theme.colors.button.disabled};
        cursor: not-allowed;
    }
`;
