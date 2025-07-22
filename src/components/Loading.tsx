import styled from "styled-components";

import DimigoinLoading from "../assets/icons/dimigoin_loading.svg?react"

const Page = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

function Loading() {
  return (
    <Page>
      <DimigoinLoading />
    </Page>
  )
}

export default Loading;