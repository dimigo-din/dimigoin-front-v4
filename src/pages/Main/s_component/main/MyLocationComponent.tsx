import React from 'react';
import { Container } from '@/components';
import { Hexile, Vexile } from '@haechi/flexile';
import { styled } from '#/stitches.config';
import { CSS } from '@stitches/react';
import { ReactComponent as Frame } from '@/asset/icons/Frame.svg';
import { ReactComponent as Bath } from '@/asset/icons/bath.svg';
import { useAllPlace, usePrimaryPlaceList } from '@/hooks/api/usePlace';

export const MyLocationComponent: React.FC<{
  padding: string;
  css: CSS;
  title: string;
  textCss?: CSS;
}> = ({ padding, css, title }) => {
  const allplace = useAllPlace();
  const priplace = usePrimaryPlaceList();
  console.log(priplace);

  return (
    <Container
      padding={padding}
      css={css}
      title={title}
      subTitle={`현재위치 - NO_PLACE_DATA`}
    >
      <Bookmark>즐겨찾기</Bookmark>
      <PlacesBox>
        <Place SVG={Frame} active={true} />
        <Place SVG={Bath} active={false} />
        <Place SVG={Frame} active={false} />
        <Place SVG={Frame} active={false} />
        <Place SVG={Frame} active={false} />
        <Place SVG={Frame} active={false} />
      </PlacesBox>
    </Container>
  );
};

const Place: React.FC<{ active: boolean; SVG: any }> = ({ active, SVG }) => {
  return (
    <PlaceBox>
      <SVG fill={active ? '#E83C77' : '#8D90A0'} />
      <PlaceLocation>
        <Floor active={active}>본관 2층</Floor>
        <PlaceName active={active}>1학년 6반</PlaceName>
      </PlaceLocation>
    </PlaceBox>
  );
};

const Bookmark = styled(Hexile, {
  fontSize: '1.8rem',
  fontWeight: 600,
  lineHeight: '2.1rem',
  color: '$grade8',
});

const PlacesBox = styled(Hexile, {
  width: '100%',
  marginTop: '2.8rem',
  flexWrap: 'wrap',
  rowGap: '3.6rem',
  justifyContent: 'space-around',
});

const PlaceBox = styled(Hexile, {
  width: '30%',
  justifyContent: 'center',
});

const PlaceLocation = styled(Vexile, {
  paddingLeft: '1.2rem',
  alignItems: 'center',
});

const Floor = styled(Hexile, {
  fontSize: '1.4rem',
  fontWeight: 500,
  lineHeight: '1.7rem',
  variants: {
    active: {
      true: {
        color: '$accent',
      },
      false: {
        color: '$grade6',
      },
    },
  },
});

const PlaceName = styled(Hexile, {
  fontSize: '1.6rem',
  fontWeight: 700,
  lineHeight: '1.9rem',
  variants: {
    active: {
      true: {
        color: '$accent',
      },
      false: {
        color: '$grade6',
      },
    },
  },
});
