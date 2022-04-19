import { styled } from "#/stitches.config";
import { Link } from "react-router-dom";

export const SideBarCustom = styled('div', {
  width: '20rem',
  height: '100%',
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
  padding: '4rem 2rem',
});

export const Logo = styled(Link, {
  width: '4rem',
  height: '4rem',
  margin: '1rem .5rem 5rem',
});

export const ItemContainer = styled('div', {
  width: '100%',
  height: '75%',
  overflowX: 'auto',
  display: 'flex',
  flexDirection: 'column',
});

export const ItemBox = styled(Link, {
  width: '100%',
  margin: '2rem 0',
  display: 'flex',
  alignItems: 'center',
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