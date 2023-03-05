import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '#/stitches.config';
import { CSS } from '@stitches/react';
import { Container } from '@/components';
import { Hexile, Vexile } from '@haechi/flexile';
import {
  LikedMusic,
  LikeTicket,
  MusicInfo,
} from '../s_component/Music/MusicComponent';
import { ReactComponent as SearchIcon } from '@/asset/icons/search.svg';

const ContainerCss = {
  display: 'flex',
  flexDirection: 'column',
};

export const Music: React.FC = () => {
  const [Musics, setMusics] = useState<number[] | undefined | null>(undefined);
  const [LikedMusics, setLikedMusics] = useState<number[] | undefined | null>(
    undefined,
  );

  const path: string = useLocation().pathname;
  const applyPath: string = '/music/application';

  console.log(path);

  useEffect(() => {
    setMusics([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
    setLikedMusics([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    // setMusics([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  }, []);

  return (
    <Wrapper>
      <LeftBox>
        <Container
          padding="3.2rem"
          css={{
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            height: '100%',
          }}
          title="기상송 차트"
        >
          <Search marginTop={path === applyPath ? true : undefined}>
            {path === applyPath && <SearchMusicContainer />}
          </Search>
          <MusicList>
            <SubMusicList>
              {Musics &&
                Musics.map((idx) => (
                  <MusicInfo
                    musicTitle={'asdf'}
                    SVG={null}
                    singer={'whguswo'}
                    like={false}
                    key={idx}
                  />
                ))}
            </SubMusicList>
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
        <Container padding="3.2rem" css={ContainerCss} title="좋아요 누른 노래">
          <LikedMusicList>
            {LikedMusics &&
              LikedMusics.map((idx) => (
                <LikedMusic
                  musicTitle={'whguswo'}
                  singer={'whguswo'}
                  like={true}
                  key={idx}
                />
              ))}
          </LikedMusicList>
        </Container>
      </RightBox>
    </Wrapper>
  );
};

const SearchMusicContainer = () => {
  return (
    <SearchContainer>
      <SearchIconBox>
        <SearchIcon />
      </SearchIconBox>
      <SearchMusic placeholder="신청할 곡의 노래명, 혹은 가수명을 입력해주세요"></SearchMusic>
    </SearchContainer>
  );
};

const Wrapper = styled('div', {
  width: '100%',
  height: '100%',
  position: 'relative',
  color: '$grade10',
  display: 'grid',
  gridGap: '2rem',
  gridTemplateColumns: '1fr 45rem',
});

const LeftBox = styled(Vexile, {
  position: 'relative',
  height: 'calc(100vh - 14.5rem)',
});

const RightBox = styled('div', {
  display: 'grid',
  gridTemplateRows: '22.9rem',
  position: 'relative',
  height: '100%',
  gap: '2rem',
});

const Search = styled('div', {
  variants: {
    marginTop: {
      true: {
        marginTop: '2.4rem',
      },
    },
  },
});

const SearchContainer = styled(Hexile, {
  position: 'relative',
  height: '4rem',
  border: '1px solid $grade4',
  borderRadius: '1rem',
  paddingLeft: '1.6rem',
  alignItems: 'center',
});

const SearchMusic = styled('input', {
  width: '100%',
  border: 'none',
  borderRadius: '1rem',
  fontSize: '1.2rem',
  fontWeight: 500,
  lineHeight: '1.4rem',
  padding: '1.2rem',
  paddingLeft: '.8rem',
  '&:focus': {
    outline: 'none',
  },
  '&::placeholder': {
    color: '$grade6',
  },
});

const SearchIconBox = styled(Hexile, {
  alignItems: 'center',
  justifyContent: 'center',
});

const MusicList = styled(Hexile, {
  overflow: 'auto',
  height: '100%',
  marginTop: '3.2rem',
});

const SubMusicList = styled(Vexile, {
  position: 'relative',
  width: '100%',
  height: 'max-content',
  overflow: 'auto',
  gap: '1rem',
});

const LikedMusicList = styled(Vexile, {
  position: 'relative',
  marginTop: '2.4rem',
  width: '100%',
  height: 'calc(100vh - 51.4rem)',
  borderRadius: '0',
  overflow: 'auto',
  gap: '1.6rem',
});

const Warning = styled('div', {
  fontSize: '1.4rem',
  fontWeight: 500,
  lineHeight: '2.2rem',
  color: '$grade6',
});
