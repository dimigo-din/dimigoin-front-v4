import { styled } from '#/stitches.config';
import { Hexile, Vexile } from '@haechi/flexile';

export const UserInfoBox = styled(Hexile, {
  maxWidth: '13.6rem',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const InfoItem = styled(Vexile, {
  justifyContent: 'center',
});

export const ClassNum = styled('span', {
  fontSize: '1.2rem',
  lineHeight: '1.4rem',
  paddingBottom: '.3rem',
  color: '$gray3',
});

export const LogoutBtn = styled(Hexile, {
  cursor: 'pointer',
});

export const Name = styled('span', {
  fontSize: '1.6rem',
  lineHeight: '1.9rem',
});
