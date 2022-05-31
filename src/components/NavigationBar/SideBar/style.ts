import { styled } from '#/stitches.config';
import { Link } from 'react-router-dom';
import { Vexile } from '@haechi/flexile';

export const SideBarCustom = styled(Vexile, {
  width: '20rem',
  background: '#fff',
  padding: '4rem 2rem',
});

export const Logo = styled(Link, {
  height: '4rem',
  margin: '1rem .5rem 5rem',
});

export const ItemContainer = styled(Vexile, {
  height: '75%',
  overflowX: 'auto',
});

export const ItemBox = styled(Link, {
  width: '100%',
  margin: '2rem 0',
  display: 'flex',
  alignItems: 'center',
  transition: 'color .2s ease',
  variants: {
    selected: {
      true: {
        color: '$accent',
      },
      false: {
        color: '$gray1',
      }
    }
  },
  '& svg': {
    marginRight: '1.5rem',
  },
});

export const Division = styled('div', {
  width: '100%',
  border: '1px solid $gray3',
  margin: '.7rem 0',
});