import { styled } from '#/stitches.config';

export const ContainerCustom = styled('div', {
  display: 'flex',
  position: 'relative',
  borderRadius: '1rem',
  backgroundColor: '#fff',
  overflow: 'auto',
  lineHeight: 2,
  variants: {
    column: {
      true: {
        flexDirection: 'column',
      }
    }
  },
});

export const Title = styled('p', {
  fontSize: '1.8rem',
  lineHeight: '2.2rem',
  fontWeight: 700,
  color: '#000',
});
export const SubTitle = styled('p', {
  fontSize: '1.6rem',
  lineHeight: '1.9rem',
  fontWeight: 700,
  color: '$gray1',
});