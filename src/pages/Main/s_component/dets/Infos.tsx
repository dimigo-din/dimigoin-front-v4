import { KorDay } from '@/constants/types';
import { Hexile } from '@haechi/flexile';
import { styled } from '#/stitches.config';

export const Infos: React.FC<{
  week?: KorDay;
  time?: string;
  remaining?: number;
  SVG?: any;
}> = ({ week, time, remaining, SVG }) => (
  <Info>
    <SVG />
    {week && <InfoText>{week}요일</InfoText>}
    {time && <InfoText>{time}</InfoText>}
    {remaining && <InfoText>{remaining}/20</InfoText>}
  </Info>
);

const Info = styled(Hexile, {
  alignItems: 'center',
  marginTop: '.8rem',
});

const InfoText = styled('div', {
  fontSize: '1.4rem',
  fontWeight: 500,
  lineHeight: '1.7rem',
  color: '$gray3',
  marginLeft: '.8rem',
});
