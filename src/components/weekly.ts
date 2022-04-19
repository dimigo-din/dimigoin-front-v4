import MondayAccent from '@/asset/icons/accent/Monday.svg';
import TuesdayAccent from '@/asset/icons/accent/Tuesday.svg';
import WednesdayAccent from '@/asset/icons/accent/Wednesday.svg';
import ThursdayAccent from '@/asset/icons/accent/Thursday.svg';
import FridayAccent from '@/asset/icons/accent/Friday.svg';
import SaturdayAccent from '@/asset/icons/accent/Saturday.svg';

import MondayDisable from '@/asset/icons/disable/Monday.svg';
import TuesdayDisable from '@/asset/icons/disable/Tuesday.svg';
import WednesdayDisable from '@/asset/icons/disable/Wednesday.svg';
import ThursdayDisable from '@/asset/icons/disable/Thursday.svg';
import FridayDisable from '@/asset/icons/disable/Friday.svg';
import SaturdayDisable from '@/asset/icons/disable/Saturday.svg';

export const Weekly = [
  {
    title: '월요일',
    route: '/mon',
    Accent: MondayAccent,
    Disable: MondayDisable,
  },
  {
    title: '화요일',
    route: '/tue',
    Accent: TuesdayAccent,
    Disable: TuesdayDisable,
  },
  {
    title: '수요일',
    route: '/wed',
    Accent: WednesdayAccent,
    Disable: WednesdayDisable,
  },
  {
    title: '목요일',
    route: '/thr',
    Accent: ThursdayAccent,
    Disable: ThursdayDisable,
  },
  {
    title: '금요일',
    route: '/fri',
    Accent: FridayAccent,
    Disable: FridayDisable,
  },
  {
    title: '토요일',
    route: '/sat',
    Accent: SaturdayAccent,
    Disable: SaturdayDisable,
  },
];