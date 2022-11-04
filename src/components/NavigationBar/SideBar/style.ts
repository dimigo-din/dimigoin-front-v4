import { styled } from '#/stitches.config';
import { Link } from 'react-router-dom';
import { Vexile } from '@haechi/flexile';

export const SideBarCustom = styled(Vexile, {
  width: '20rem',
  background: '#fff',
  padding: '4rem 3.2rem',
});

export const Logo = styled(Link, {
  height: '4rem',
  margin: '1rem .5rem 7rem',
});

export const ItemContainer = styled(Vexile, {
  marginTop: '3.8rem',
  height: '70%',
  overflowX: 'auto',
});

export const ItemBox = styled(Link, {
  width: '100%',
  margin: '2.2rem 0',
  lineHeight: '1.9rem',
  display: 'flex',
  alignItems: 'center',
  transition: 'color .2s ease',
  variants: {
    selected: {
      true: {
        color: '$accent',
      },
      false: {
        color: '$gray3',
      },
    },
  },
  '& svg': {
    marginRight: '1.5rem',
  },
});

export const Division = styled('div', {
  width: '100%',
  border: '.05rem solid $subWhite2',
  borderRadius: '.1rem',
  margin: '.7rem 0',
});
