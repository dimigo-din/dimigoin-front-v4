import { styled } from '#/stitches.config';
import { Link } from 'react-router-dom';

export const ItemBox = styled(Link, {
  minWidth: '4rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 4.5rem',
  whiteSpace: 'nowrap',
  transition: 'color .2s ease',
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
