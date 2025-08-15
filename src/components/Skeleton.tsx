import styled from "styled-components";

const SkeletonBox = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, ${({theme}) => theme.Colors.Skeleton.first} 25%, ${({theme}) => theme.Colors.Skeleton.second} 50%, ${({theme}) => theme.Colors.Skeleton.first} 75%);
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