import styled from "styled-components";

const SkeletonBox = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #fdfdfd 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;

  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const Wrapper = styled.div`
  overflow: hidden;
`;

function Skeleton({ done, children, height = "100%", width = "100%", borderRadius = "12px" } : { done: boolean, children: React.ReactNode, height?: string, width?: string, borderRadius?: string }) {
  return (
    done ? children : (
      <Wrapper style={{height, width, borderRadius}}>
        <SkeletonBox>&nbsp;</SkeletonBox>
      </Wrapper>
    )
  );
}

export default Skeleton;