import React, { useEffect, useState } from 'react';
import { styled } from '#/stitches.config';
import { Container } from '@/components';
import { Hexile, Vexile } from '@haechi/flexile';
import { LaundryComponent } from '../s_component/laundry';

const containerCss = {
  display: 'flex',
  flexDirection: 'column',
};

const ToApplyLaundryCss = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  maxWidth: '38rem',
  flexBasis: '38rem',
  height: '16.2rem',
};

const appliedLaundryCss = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: '14.1rem',
  backgroundColor: '$subWhite1',
};

const prev_next_css = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: '15.8rem',
  backgroundColor: '$subWhite1',
  marginTop: '2.4rem',
};

const Laundry: React.FC = () => {
  const [toApplyLaundry, setToApplyLaundry] = useState<
    number[] | undefined | null
  >(undefined);
  const [appliedLaundry, setAppliedLaundry] = useState<
    number[] | undefined | null
  >(undefined);
  const [prevLaundry, setPrevLaundry] = useState<number[] | undefined | null>(
    undefined,
  );
  const [nextLaundry, setNextLaundry] = useState<number[] | undefined | null>(
    undefined,
  );

  useEffect(() => {
    setToApplyLaundry([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    setPrevLaundry([1]);
    setNextLaundry([1]);
    setAppliedLaundry([]);
  }, []);

  return (
    <Wrapper>
      <LeftBox>
        {toApplyLaundry ? (
          toApplyLaundry.map((idx) => (
            <LaundryComponent
              padding="3.2rem"
              css={ToApplyLaundryCss}
              active={true}
              btnVal={'예약'}
              key={idx}
            />
          ))
        ) : (
          <NO_AFTERSCHOOL_DATA>신청가능한 세탁이 없어요</NO_AFTERSCHOOL_DATA>
        )}
      </LeftBox>
      <RightBox>
        <Container
          padding="3.2rem"
          css={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: `${appliedLaundry ? '32rem' : '22rem'}`,
          }}
          title="내가 신청한 세탁"
        >
          <AppliedBox>
            {appliedLaundry ? (
              <LaundryComponent
                padding="2.8rem"
                css={appliedLaundryCss}
                btnVal={'취소'}
                active={false}
              />
            ) : (
              <NO_AFTERSCHOOL_DATA>신청한 세탁이 없어요</NO_AFTERSCHOOL_DATA>
            )}
          </AppliedBox>
          <Warning>
            본인 시간을 잊지 말고 세탁해 주시기 바랍니다.
            <br />
            시간이 늦어질 경우 뒷 사람에게 피해가 갑니다.
          </Warning>
        </Container>
        <Container
          padding="3.2rem"
          css={{
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            gap: '3.9rem',
            height: '100%',
          }}
        >
          <Container
            padding="0"
            css={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: `${prevLaundry ? '20.8rem' : '15rem'}`,
            }}
            title="앞 타임 정보"
          >
            {prevLaundry ? (
              <LaundryComponent
                padding="2.8rem"
                css={prev_next_css}
                btnVal={'취소'}
                active={false}
                applingPeo={'김도현'}
              />
            ) : (
              <NO_AFTERSCHOOL_DATA>앞 타임 정보가 없어요</NO_AFTERSCHOOL_DATA>
            )}
          </Container>
          <Container
            padding="0"
            css={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: `${nextLaundry ? '20.8rem' : '15rem'}`,
            }}
            title="뒤 타임 정보"
          >
            {nextLaundry ? (
              <LaundryComponent
                padding="2.8rem"
                css={prev_next_css}
                btnVal={'취소'}
                active={false}
                applingPeo={'김도현'}
              />
            ) : (
              <NO_AFTERSCHOOL_DATA>뒤 타임 정보가 없어요</NO_AFTERSCHOOL_DATA>
            )}
          </Container>
        </Container>
      </RightBox>
    </Wrapper>
  );
};

export default Laundry;

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
  height: 'calc(100vh - 14.5rem)',
  flexWrap: 'wrap',
  overflowY: 'auto',
  gap: '2rem',
});

const RightBox = styled(Vexile, {
  position: 'relative',
  height: 'calc(100vh - 14.5rem)',
  gap: '2rem',
});

const AppliedBox = styled(Hexile, {
  position: 'relative',
  margin: '2.4rem 0',
  minHeight: '4rem',
});

const Warning = styled('div', {
  fontSize: '1.4rem',
  fontWeight: 500,
  lineHeight: '2.2rem',
  color: '$gray3',
  textAlign: 'center',
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
