import { ReactComponent as Monday } from '@/asset/icons/Monday.svg';
import { ReactComponent as Tuesday } from '@/asset/icons/Tuesday.svg';
import { ReactComponent as Wednesday } from '@/asset/icons/Wednesday.svg';
import { ReactComponent as Thursday } from '@/asset/icons/Thursday.svg';
import { ReactComponent as Friday } from '@/asset/icons/Friday.svg';
import { ReactComponent as Saturday } from '@/asset/icons/Saturday.svg';

export const Weekly = [
  {
    title: '월요일',
    route: '/mon',
    SVG: Monday,
    black: true,
  },
  {
    title: '화요일',
    route: '/tue',
    SVG: Tuesday,
    black: true,
  },
  {
    title: '수요일',
    route: '/wed',
    SVG: Wednesday,
    black: true,
  },
  {
    title: '목요일',
    route: '/thr',
    SVG: Thursday,
    black: true,
  },
  {
    title: '금요일',
    route: '/fri',
    SVG: Friday,
    black: true,
  },
  {
    title: '토요일',
    route: '/sat',
    SVG: Saturday,
    black: true,
  },
];