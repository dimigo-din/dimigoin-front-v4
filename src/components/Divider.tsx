import styled from "styled-components";

const DividerElement = styled.div`
  height: 4px;
  width: calc(100% - 16px);
  margin: 8px;
  
  border-radius: 2px;
  
  background-color: ${({theme}) => theme.Colors.Line.Divider};
`;
function Divider() {
  return ( <DividerElement>&nbsp;</DividerElement>);
}

export default Divider;