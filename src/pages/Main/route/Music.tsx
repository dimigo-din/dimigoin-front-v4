import React, { useEffect, useState } from 'react';
import { styled } from '#/stitches.config';
import { Container } from '@/components';
import { Hexile, Vexile } from '@haechi/flexile';
import { LikeTicket, MusicInfo } from '../s_component/Music/MusicComponent';

const ContainerCss = {
  display: 'flex',
  flexDirection: 'column',
};

const Music: React.FC = () => {
  const [Musics, setMusics] = useState<number[] | undefined | null>(undefined);

  useEffect(() => {
    setMusics([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
    // setMusics([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  }, []);

  return (
    <Wrapper>
      <LeftBox>
        <Container
          padding="3.2rem"
          css={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
          title="기상송 차트"
        >
          <SubTitle>
            {'6'}월 {'24'}일 {'금'}요일
          </SubTitle>
          <MusicList>
            {Musics &&
              Musics.map((idx) => (
                <MusicInfo
                  musicTitle={'asdf'}
                  SVG={null}
                  singer={'whguswo'}
                  like={false}
                  idx={idx}
                  key={idx}
                />
              ))}
          </MusicList>
        </Container>
      </LeftBox>
      <RightBox>
        <Container
          padding="3.2rem"
          css={ContainerCss}
          title="보유한 좋아요 티켓 수"
        >
          <LikeTicket count={10} />
          <Warning>
            기상송을 신청하거나, 기상송에 좋아요를
            <br />
            누를 때 마다 한 개 씩 차감됩니다.
          </Warning>
        </Container>
        <Container
          padding="3.2rem"
          css={{
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          <Container padding="0" css={ContainerCss} title="좋아요 누른 노래">
            <div></div>
          </Container>
        </Container>
      </RightBox>
    </Wrapper>
  );
};

export default Music;

const Wrapper = styled('div', {
  width: '100%',
  height: 'calc(100vh - 14.5rem)',
  position: 'relative',
  color: '$gray6',
  display: 'grid',
  gridGap: '2rem',
  gridTemplateColumns: '1fr 45rem',
});

const LeftBox = styled(Vexile, {
  position: 'relative',
  height: '100%',
  gap: '2rem',
});

const RightBox = styled('div', {
  display: 'grid',
  gridTemplateRows: '22.9rem 1fr',
  position: 'relative',
  height: 'calc(100vh - 14.5rem)',
  gap: '2rem',
});

const SubTitle = styled(Hexile, {
  fontSize: '1.4rem',
  fontWeight: 500,
  lineHeight: '1.7rem',
  color: '$gray3',
  marginTop: '.6rem',
  marginBottom: '3.2rem',
});

const MusicList = styled(Vexile, {
  position: 'relative',
  width: '100%',
  height: 'calc(100vh - 29rem)',
  overflow: 'auto',
  gap: '1rem',
});

const Warning = styled('div', {
  fontSize: '1.4rem',
  fontWeight: 500,
  lineHeight: '2.2rem',
  color: '$gray3',
});

const NO_AFTERSCHOOL_DATA = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '20rem',
  fontSize: '1.8rem',
  fontWeight: 500,
  textAlign: 'center',
  color: '$gray2',
});
