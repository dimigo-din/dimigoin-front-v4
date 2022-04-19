import { styled } from "#/stitches.config";
import { Link } from "react-router-dom";

export const ItemBox = styled(Link, {
  minWidth: '4rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 4.5rem',
  whiteSpace: 'nowrap',
  variants: {
    selected: {
      true: {
        color: '#000000',
      },
      false: {
        color: '$gray1',
      },
    },
  },
});

export const Icon = styled('img', {
  width: '3rem',
  height: '3rem',
  transition: 'all .3s ease',
  variants: {
    selected: {
      true: {
        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
      },
    },
  },
});