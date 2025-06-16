import styled from "styled-components";

export const Input = styled.input`
    width: 100%;
    padding: 16px 16px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.colors.solid.white};
    border: 1px solid ${({ theme }) => theme.colors.border.primary};
    color: ${({ theme }) => theme.colors.font.primary};
    font-size: ${({ theme }) => theme.font.base.size};
    line-height: ${({ theme }) => theme.font.base.lineHeight};
    font-weight: ${({ theme }) => theme.font.base.weight};
    transition: border-color 0.3s ease;

    &::placeholder {
        color: ${({ theme }) => theme.colors.font.secondary};
        font-size: ${({ theme }) => theme.font.sm.size};
        line-height: ${({ theme }) => theme.font.sm.lineHeight};
        font-weight: ${({ theme }) => theme.font.sm.weight};
    }
    &:focus {
        border-color: ${({ theme }) => theme.colors.border.primaryFocus};
        outline: none;
    }
`;
