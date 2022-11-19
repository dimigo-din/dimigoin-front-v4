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
  flexBasis: '38rem',
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
  const [toApplyClass, setToApplyClass] = useState<number[] | undefined | null>(
    undefined,
  );
  const [appliedClass, setAppliedClass] = useState<number[] | undefined | null>(
    undefined,
  );

  useEffect(() => {
    setToApplyClass([1, 2, 3, 4, 5]);
    setAppliedClass([1, 2, 3, 4, 5]);
  }, []);

  return (
    <Wrapper>
      <LeftBox>
        {toApplyClass ? (
          toApplyClass.map((idx) => (
            <AfterschoolComponent
              padding="3.2rem"
              css={afterSchoolCss}
              active={true}
              btnVal={'신청'}
              key={idx}
            />
          ))
        ) : (
          <NO_AFTERSCHOOL_DATA>신청가능한 방과후가 없어요</NO_AFTERSCHOOL_DATA>
        )}
      </LeftBox>
      <Container padding="4rem 3.5rem" css={containerCss}>
        <Title>내가 신청한 강좌</Title>
        <AppliedBox>
          {appliedClass ? (
            appliedClass.map((idx) => (
              <AfterschoolComponent
                padding="2.8rem"
                css={appliedClassCss}
                btnVal="취소"
                active={false}
                key={idx}
              />
            ))
          ) : (
            <NO_AFTERSCHOOL_DATA>신청한 방과후가 없어요</NO_AFTERSCHOOL_DATA>
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

// window size에 따라서 1~3 정렬 해야함 => how?
const LeftBox = styled(Hexile, {
  position: 'relative',
  height: 'fit-content',
  maxHeight: 'calc(100vh - 14.5rem)',
  flexWrap: 'wrap',
  overflowY: 'auto',
  gap: '2rem',
});

const Title = styled('span', {
  fontSize: '2rem',
  fontWeight: 700,
  lineHeight: '2.4rem',
});

const AppliedBox = styled(Hexile, {
  position: 'relative',
  minHeight: '60rem',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '2.4rem',
  flexWrap: 'wrap',
  overflowY: 'auto',
  gap: '2rem',
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
