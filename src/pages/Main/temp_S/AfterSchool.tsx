import React, { useEffect, useState } from 'react';
import { styled } from '#/stitches.config';
import { Container } from '@/components';
import { Hexile } from '@haechi/flexile';
import { useAfterschool } from '@/hooks/api';
import { AfterschoolComponent } from '../s_component/afterschool';

const containerCss = {
  display: 'flex',
  flexDirection: 'column',
};

const afterSchoolCss = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '38rem',
  flex: '1 1 38rem',
  flexShrink: 1,
  height: '22rem',
};

const appliedClassCss = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '18.8rem',
  backgroundColor: '$subWhite1',
};

const AfterSchool: React.FC = () => {
  const [toApplyClass, setToApplyClass] = useState<number[]>([]);
  const [appliedClass, setAppliedClass] = useState(1);
  const asdf = useAfterschool();
  console.log(asdf);

  useEffect(() => {
    setToApplyClass([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  }, []);

  return (
    <Wrapper>
      <LeftBox>
        <ToApplyBox>
          {toApplyClass
            ? toApplyClass.map((idx) => (
                <AfterschoolComponent
                  padding="3.2rem"
                  css={afterSchoolCss}
                  title={'상업경제 개념잡기'}
                  teacher={'김준식'}
                  time={'방과후 1,2타임'}
                  remaining={11}
                  active={true}
                  btnVal={'신청'}
                  key={idx}
                />
              ))
            : '신청가능한 방과후가 없어요'}
        </ToApplyBox>
      </LeftBox>
      <Container padding="4rem 3.5rem" css={containerCss}>
        <Title>내가 신청한 강좌</Title>
        <AppliedBox>
          {appliedClass ? (
            <AfterschoolComponent
              padding="2.8rem"
              css={appliedClassCss}
              title={'상업경제 개념잡기'}
              teacher={'김준식'}
              time={'방과후 1,2타임'}
              remaining={11}
              btnVal="취소"
              active={false}
            />
          ) : (
            '신청강좌x'
          )}
        </AppliedBox>
      </Container>
    </Wrapper>
  );
};

export default AfterSchool;

const Wrapper = styled('div', {
  width: '100%',
  height: '100%',
  position: 'relative',
  color: '$gray6',
  display: 'grid',
  gridGap: '2rem',
  gridTemplateColumns: '1fr 45rem',
});

const LeftBox = styled(Hexile, {
  height: 'calc(100vh - 14.5rem)',
  justifyContent: 'center',
});

const Title = styled('span', {
  fontSize: '2rem',
  fontWeight: 700,
  lineHeight: '2.4rem',
});

const AppliedBox = styled(Hexile, {
  marginTop: '2.4rem',
});

const ToApplyBox = styled(Hexile, {
  flexWrap: 'wrap',
  overflowY: 'auto',
  gap: '2rem',
});
