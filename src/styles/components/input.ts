import styled from "styled-components";

export const Input = styled.input`
    width: 100%;
    padding: 16px 16px;
    border-radius: 12px;
    background-color: ${({theme}) => theme.Colors.Solid.White};
    border: 1px solid ${({theme}) => theme.Colors.Line.Outline};
    color: ${({theme}) => theme.Colors.Content.Standard.Primary};
    font-size: ${({theme}) => theme.Font.Paragraph_Large.size};
    line-height: ${({theme}) => theme.Font.Paragraph_Large.lineHeight};
    font-weight: ${({theme}) => theme.Font.Paragraph_Large.weight.regular};
    transition: border-color 0.3s ease;

    &::placeholder {
        color: ${({theme}) => theme.Colors.Content.Standard.Secondary};
        font-size: ${({theme}) => theme.Font.Paragraph_Large.size};
        line-height: ${({theme}) => theme.Font.Paragraph_Large.lineHeight};
        font-weight: ${({theme}) => theme.Font.Paragraph_Large.weight.regular};
    }
    &:focus {
        border-color: ${({theme}) => theme.Colors.Line.Outline};
        outline: none;
    }
`;
