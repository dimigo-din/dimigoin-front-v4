import { styled } from '#/stitches.config';
import { Hexile } from '@haechi/flexile';

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
      },
    },
  },
});

export const TitleContainer = styled(Hexile, {
  justifyContent: 'space-between',
});

export const Title = styled(Hexile, {
  fontSize: '2rem',
  lineHeight: '2.4rem',
  fontWeight: 700,
  color: '$subBlack',
});

export const InnerTitle = styled(Hexile, {
  fontSize: '1.6rem',
  lineHeight: '1.9rem',
  fontWeight: 600,
  color: '$gray5',
});

export const SubTitle = styled(Hexile, {
  fontSize: '1.6rem',
  lineHeight: '1.9rem',
  fontWeight: 500,
  color: '$gray3',
  marginTop: '.6rem',
  marginBottom: '2.5rem',
});
