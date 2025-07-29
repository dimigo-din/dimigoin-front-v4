import styled, {css, keyframes} from "styled-components";
import React from "react";

const brighten = keyframes`
  from {
    backdrop-filter: brightness(90%);
  }
  to {
    backdrop-filter: brightness(100%);
  }
`;
const darken = keyframes`
  from {
    backdrop-filter: brightness(100%);
  }
  to {
    backdrop-filter: brightness(90%);
  }
`;

const DialogBox = styled.div<{ isclosing: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  height: 100%;
  max-width: 480px;
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: end;
  
  backdrop-filter: ${({isclosing}) => isclosing === "true" ? "brightness(90%)" : "brightness(100%)"};
  ${({ isclosing }) => css`
    animation: ${isclosing === "true" ? brighten : darken} 0.3s ease forwards;
  `}
`;

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;
const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

const Dialog = styled.div<{ isclosing: string }>`
  height: fit-content;
  background-color: ${({theme}) => theme.Colors.Background.Standard.Primary};
  border-radius: 32px 32px 0 0;

  display: flex;
  flex-direction: column;
  gap: 1%;

  ${({ isclosing }) => css`
    animation: ${isclosing === "true" ? slideDown : slideUp} 0.3s ease forwards;
  `}

  padding: 12px 4px;
`;

const Handle = styled.div`
  height: 0.5rem;

  > span {
    display: block;
    height: 100%;
    width: 40%;

    background-color: ${({theme}) => theme.Colors.Components.Translucent.Primary};
    border-radius: 32px;

    margin: auto;
  }
`;

const ChildrenWrapper = styled.div`
  height: fit-content;
  width: 100%;
`;

function SelectionDialog({ isOpen, closeAction = () => {}, onOpen = () => {}, children }: { isOpen: boolean, closeAction: () => void | undefined, onOpen?: () => void | undefined, children: React.ReactNode }) {
  const [isClosing, setIsClosing] = React.useState(false);

  const isFirstRender = React.useRef(true);

  const handleAnimationEnd = () => {
    if (isClosing) {
      setIsClosing(false);
    }
  };

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!isOpen) {
      setIsClosing(true);
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) {
    return null;
  }

  return (
    <DialogBox isclosing={isClosing.toString()}
                     onClick={() => closeAction()}
                     onAnimationEnd={handleAnimationEnd}>
      <Dialog isclosing={isClosing.toString()} onAnimationEnd={() => { if (isOpen) onOpen() }} onClick={(e) => {e.preventDefault(); e.stopPropagation();}}>
        <Handle><span>&nbsp;</span></Handle>
        <ChildrenWrapper>
          {children}
        </ChildrenWrapper>
      </Dialog>
    </DialogBox>
  )
}

export default SelectionDialog;