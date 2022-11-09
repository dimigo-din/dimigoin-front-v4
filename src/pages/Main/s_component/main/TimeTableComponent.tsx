import React, { useEffect } from 'react';
import { Container, Text } from '@/components';
import { CSS } from '@stitches/react';
import { styled } from '#/stitches.config';
import { Vexile } from '@haechi/flexile';
import { useTimetable, useMyData } from '@/hooks/api';
import moment, { Moment } from 'moment-timezone';

const weekDayCss = {
  textAlign: 'center',
  fontSize: '1.8rem',
  fontWeight: 500,
  lineHeight: '2.1rem',
};
// 과목 css
const timeCss = {
  textAlign: 'center',
  fontSize: '1.8rem',
  fontWeight: 500,
  lineHeight: '2.1rem',
  height: '2.1rem',
  marginTop: '2.4rem',
  overflow: 'hidden',
};

const weekDays = ['월', '화', '수', '목', '금'];

export const TimeTableComponent: React.FC<{
  padding: string;
  css: CSS;
  title: string;
}> = ({ padding, css, title }) => {
  const date: Moment = moment().add(0, 'd');
  const myData = useMyData();
  const table = useTimetable(myData?.grade, myData?.class);

  const todayTimeTable = (e: number) => {
    console.log(typeof date.format('Y-M-D'), typeof (table && table[e].date));
    if (table && date.format('Y-M-D') === table[e].date) {
      console.log('true!');
      return true;
    }
  };

  return (
    <Container padding={padding} css={css} title={title}>
      <TimeTableContainer>
        <Week>
          {weekDays.map((weekDay, idx) => (
            <Text
              active={todayTimeTable(idx) && true}
              css={weekDayCss}
              key={idx}
            >
              {weekDay}
            </Text>
          ))}
        </Week>
        <Hr />
        <TimeTableBox>
          {table &&
            table.map((day, idx1) => (
              <Table key={idx1}>
                {day.sequence.map((item, idx2) => (
                  <Text
                    css={timeCss}
                    active={todayTimeTable(idx1) && true}
                    key={idx2}
                  >
                    {item}
                  </Text>
                ))}
              </Table>
            ))}
        </TimeTableBox>
      </TimeTableContainer>
    </Container>
  );
};

const TimeTableContainer = styled(Vexile, {
  position: 'relative',
  width: '100%',
  marginTop: '2.5rem',
  color: '$gray1',
});

const Week = styled('div', {
  display: 'grid',
  width: '100%',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
});

const Hr = styled('div', {
  marginTop: '2.5rem',
  '&::before': {
    content: '',
    width: '100%',
    border: '1px solid $subWhite2',
    borderRadius: '.5rem',
    position: 'absolute',
    top: '4.6rem',
    left: '50%',
    transform: 'translateX(-50%)',
  },
});

const TimeTableBox = styled('div', {
  position: 'relative',
  display: 'grid',
  width: '100%',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
});

const Table = styled(Vexile);