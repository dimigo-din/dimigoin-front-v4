import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 480px;
  margin: 0 auto;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: ${({theme}) => theme.Colors.Background.Secondary};
`;

export const Content = styled.main<{ noPadding: boolean }>`
  flex: 1;
  min-height: 0;
  
  display: flex;
  
  padding: ${({noPadding}) => (noPadding ? '0' : '24px')};
  overflow-y: auto;
`;
