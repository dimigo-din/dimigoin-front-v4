import React from 'react';
import { Container } from '@/components';
import { CSS } from '@stitches/react';
import { useNotice } from '@/hooks/api';
import { styled } from '#/stitches.config';

const NO_NOTICE_DATA = '공지사항이 없습니다';

export const NoticeComponent: React.FC<{
  padding: string;
  css: CSS;
  title: string;
  textCss?: CSS;
}> = ({ padding, css, title, textCss }) => {
  const notice = useNotice();

  return (
    <Container padding={padding} css={css} title={title}>
      <NoticeContainer>
        {notice?.length
          ? notice?.map((item) => <div>{item.content}</div>)
          : NO_NOTICE_DATA}
      </NoticeContainer>
    </Container>
  );
};

const NoticeContainer = styled('div', {
  width: '100%',
  marginTop: '2rem',
  minHeight: '5rem',
  lineHeight: '2.4rem',
  color: '$grade9',
  fontWeight: 400,
});
