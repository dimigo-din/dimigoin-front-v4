import styled from "styled-components";

export const Wrapper = styled.div`
    max-width: 480px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.background.primary};
`;

export const Content = styled.main`
    flex: 1;
    padding: 16px;
    overflow-y: auto;
`;
