import styled from "styled-components";

const KindWrapperStyle = styled.div`
  margin-top: -16px;

  border: 1px solid ${({theme}) => theme.Colors.Line.Outline};
  border-radius: 24px;

  background-color: ${({theme}) => theme.Colors.Background.Primary};

  padding: 0 20px 0 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  > span {
    margin: auto 0;

    width: 15dvh;

    align-items: center;
    text-align: left;
    font-size: ${({theme}) => theme.Font.Body.size};
    color: ${({theme}) => theme.Colors.Content.Secondary};
    
    display: flex;
    flex-direction: row;

    > svg > g > path {
      fill: ${({theme}) => theme.Colors.Content.Secondary};
    }
  }
`;

const KindItemStyle = styled.div`
  font-size: ${({theme}) => theme.Font.Body.size};
  color: ${({theme}) => theme.Colors.Content.Secondary};

  height: 4px;

  display: flex;
  align-items: center;
  
  color: ${({theme}) => theme.Colors.Core.Brand.Primary};

`;
export function KindWrapper({children, onClick}: { children: React.ReactNode; onClick?: () => void }) {
    return <KindWrapperStyle onClick={onClick}>{children}</KindWrapperStyle>;
}

export function KindItem({children, onClick}: { children: React.ReactNode; onClick?: () => void }) {
  return <KindItemStyle onClick={onClick}>{children}</KindItemStyle>;
}