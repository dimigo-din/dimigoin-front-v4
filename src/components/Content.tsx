import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 0;
  flex: 1;
  
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

function ContentWrapper({children}: { children: React.ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}

export default ContentWrapper;
