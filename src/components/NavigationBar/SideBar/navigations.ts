import { NavigationItem } from './NavigationItem';

import EarthAccent from '@/asset/icons/accent/earth.svg';
import BachelorAccent from '@/asset/icons/accent/bachelor.svg';
import TeachAccent from '@/asset/icons/accent/teach.svg';
import ClubAccent from '@/asset/icons/accent/club.svg';
import BookAccent from '@/asset/icons/accent/book.svg';
import LaundryAccent from '@/asset/icons/accent/laundry.svg';
import MusicAccent from '@/asset/icons/accent/music.svg';
import WalkAccent from '@/asset/icons/accent/walk.svg';
import NoteAccent from '@/asset/icons/accent/note.svg';

import EarthDisable from '@/asset/icons/disable/earth.svg';
import BachelorDisable from '@/asset/icons/disable/bachelor.svg';
import TeachDisable from '@/asset/icons/disable/teach.svg';
import ClubDisable from '@/asset/icons/disable/club.svg';
import BookDisable from '@/asset/icons/disable/book.svg';
import LaundryDisable from '@/asset/icons/disable/laundry.svg';
import MusicDisable from '@/asset/icons/disable/music.svg';
import WalkDisable from '@/asset/icons/disable/walk.svg';
import NoteDisable from '@/asset/icons/disable/note.svg';

export const studentNavitions: NavigationItem[] = [
  {
    title: '인강실',
    route: '/ingangsil',
    Accent: EarthAccent,
    Disable: EarthDisable,
  },
  {
    title: '멘토링',
    route: '/mentoring',
    Accent: BachelorAccent,
    Disable: BachelorDisable,
  },
  {
    title: '방과후',
    route: '/afterschool',
    Accent: TeachAccent,
    Disable: TeachDisable,
  },
  {
    title: '동아리',
    route: '/circle',
    Accent: ClubAccent,
    Disable: ClubDisable,
  },
  {
    title: 'DETS',
    route: '/dets',
    Accent: BookAccent,
    Disable: BookDisable,
  },
  {
    title: '구분선',
    route: 'division',
    division: true
  },
  {
    title: '세탁신청',
    route: '/laundry',
    Accent: LaundryAccent,
    Disable: LaundryDisable,
  },
  {
    title: '기상송 신청',
    route: '/music',
    Accent: MusicAccent,
    Disable: MusicDisable,
  },
  {
    title: '잔류 / 외출 신청',
    route: '/so',
    Accent: WalkAccent,
    Disable: WalkDisable,
  },
  {
    title: '게시판',
    route: '/board',
    Accent: NoteAccent,
    Disable: NoteDisable,
  },
];