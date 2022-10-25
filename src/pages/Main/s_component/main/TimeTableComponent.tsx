import React, { useEffect, useState } from 'react';
import { Container, Button, Text2, Text1 } from '@/components';
import { CSS } from '@stitches/react';
import { styled } from '#/stitches.config';
import { Hexile, Vexile } from '@haechi/flexile';
import { useTimetable, useMyData } from '@/hooks/api';
import { LoadingType } from '@/types';
import moment, { Moment } from 'moment-timezone';
import { MomentEngDay, Student, TimeTable, UserType } from '@/constants/types';

const weekDayCss = {
  textAlign: 'center',
  fontSize: '1.8rem',
  fontWeight: 700,
  lineHeight: '2.1rem',
};
// 과목 css
const timeCss = {
  textAlign: 'center',
  fontSize: '1.8rem',
  fontWeight: 700,
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
    if (date.format('Y-M-D') === (table && table[e].date)) return true;
  };

  return (
    <Container padding={padding} css={css} title={title}>
      <TimeTableContainer>
        <Week>
          {weekDays.map((weekDay, idx) => (
            <Text1
              active={todayTimeTable(idx) && true}
              css={weekDayCss}
              key={idx}
            >
              {weekDay}
            </Text1>
          ))}
        </Week>
        <Hr />
        <TimeTableBox>
          {table &&
            table.map((day, idx1) => (
              <Table key={idx1}>
                {day.sequence.map((item, idx2) => (
                  <Text1
                    css={timeCss}
                    active={todayTimeTable(idx1) && true}
                    key={idx2}
                  >
                    {item}
                  </Text1>
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
