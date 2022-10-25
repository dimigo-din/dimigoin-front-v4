import { styled } from '#/stitches.config';
import { Hexile } from '@haechi/flexile';
import { Link } from 'react-router-dom';

export const TopBarCustom = styled(Hexile, {
  width: '100%',
  minHeight: '10.5rem',
  backgroundColor: '#fff',
  padding: '3rem',
  overflowY: 'visible',
  justifyContent: 'center',
});

export const ItemBox = styled(Link, {
  minWidth: '4rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  // justifyContent: 'space-between',
  margin: '0 4.5rem',
  whiteSpace: 'nowrap',
  transition: 'color .2s ease',
  variants: {
    selected: {
      true: {
        color: '#000',
      },
      false: {
        color: '$gray2',
      },
    },
  },
});

export const MainItemBox = styled(Hexile, {
  justifyContent: 'space-between',
});
