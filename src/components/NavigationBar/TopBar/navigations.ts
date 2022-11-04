import { IconItem } from './NavigationItem';
import { Weekly } from '@/components/weekly';

import { ReactComponent as Board } from '@/asset/icons/board.svg';
import { ReactComponent as Chart } from '@/asset/icons/chart.svg';
import { ReactComponent as CheckDocument } from '@/asset/icons/checkDocument.svg';
import { ReactComponent as pinDrop } from '@/asset/icons/pinDrop.svg';
import { ReactComponent as programming } from '@/asset/icons/programming.svg';

export const studentNavitions: IconItem = {
  '/': [{ title: 'NO_PLACE_DATA', route: '', SVG: pinDrop }],
  '/ingangsil': [],
  '/mentoring': [],
  '/afterschool': [
    {
      title: '전체',
      route: '',
      SVG: Board,
      black: true,
    },
    ...Weekly,
  ],
  '/circle': [
    {
      title: '전체',
      route: '',
      SVG: Chart,
      black: true,
    },
    {
      title: '개발',
      route: '/pro',
      SVG: Chart,
      black: true,
    },
    {
      title: '예체능',
      route: '/ANS',
      SVG: Chart,
      black: true,
    },
    {
      title: '학습',
      route: '/study',
      SVG: Chart,
      black: true,
    },
    {
      title: '기술',
      route: '/skill',
      SVG: Chart,
      black: true,
    },
  ],
  '/music': [
    {
      title: '차트',
      route: '',
      SVG: Chart,
      black: true,
    },
    {
      title: '신청',
      route: '/application',
      SVG: CheckDocument,
      black: true,
    },
  ],
  '/dets': [
    {
      title: '전체',
      route: '',
      SVG: Board,
      black: true,
    },
    ...Weekly,
  ],
};
