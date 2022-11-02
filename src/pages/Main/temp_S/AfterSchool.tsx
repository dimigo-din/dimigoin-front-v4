import React, { useEffect, useState } from 'react';
import { styled } from '#/stitches.config';
import { Container } from '@/components';
import { Hexile } from '@haechi/flexile';
import { AfterschoolComponent } from '../s_component/afterschool';

const containerCss = {
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 14.5rem)',
};

const afterSchoolCss = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  maxWidth: '38rem',
  flex: '1 1 38rem',
  flexShrink: 1,
  height: '22rem',
};

const appliedClassCss = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: '18.8rem',
  backgroundColor: '$subWhite1',
};

const AfterSchool: React.FC = () => {
  const [toApplyClass, setToApplyClass] = useState<number[]>([]);
  const [appliedClass, setAppliedClass] = useState<number[]>([]);

  useEffect(() => {
    setToApplyClass([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    setAppliedClass([1, 2, 3, 4, 5]);
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
          {appliedClass
            ? appliedClass.map((idx) => (
                <AfterschoolComponent
                  padding="2.8rem"
                  css={appliedClassCss}
                  btnVal="취소"
                  active={false}
                  key={idx}
                />
              ))
            : '신청강좌x'}
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
  flexWrap: 'wrap',
  overflowY: 'auto',
  gap: '2rem',
});

const ToApplyBox = styled(Hexile, {
  flexWrap: 'wrap',
  overflowY: 'auto',
  gap: '2rem',
});
