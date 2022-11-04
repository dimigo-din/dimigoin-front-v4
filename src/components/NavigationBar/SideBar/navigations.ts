import { NavigationItem } from './NavigationItem';

import { ReactComponent as Click } from '@/asset/icons/ingang.svg';
import { ReactComponent as Bachelor } from '@/asset/icons/bachelor.svg';
import { ReactComponent as Teach } from '@/asset/icons/teach.svg';
import { ReactComponent as Club } from '@/asset/icons/club.svg';
import { ReactComponent as Book } from '@/asset/icons/book.svg';
import { ReactComponent as Laundry } from '@/asset/icons/laundry.svg';
import { ReactComponent as Music } from '@/asset/icons/music.svg';
import { ReactComponent as Walk } from '@/asset/icons/walk.svg';
import { ReactComponent as Note } from '@/asset/icons/note.svg';

export const studentNavitions: NavigationItem[] = [
  {
    title: '인강실',
    route: '/ingangsil',
    SVG: Click,
  },
  {
    title: '멘토링',
    route: '/mentoring',
    SVG: Bachelor,
  },
  {
    title: '방과후',
    route: '/afterschool',
    SVG: Teach,
  },
  {
    title: '동아리',
    route: '/circle',
    SVG: Club,
  },
  {
    title: 'DETS',
    route: '/dets',
    SVG: Book,
  },
  {
    title: '구분선',
    route: 'division',
    division: true,
  },
  {
    title: '세탁신청',
    route: '/laundry',
    SVG: Laundry,
  },
  {
    title: '기상송 신청',
    route: '/music',
    SVG: Music,
  },
  {
    title: '잔류 / 외출',
    route: '/so',
    SVG: Walk,
  },
  {
    title: '게시판',
    route: '/board',
    SVG: Note,
  },
];
