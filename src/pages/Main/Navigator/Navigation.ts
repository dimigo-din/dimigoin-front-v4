import {
  MainPage,
  AfterSchool,
  CircleC,
  Laundry,
  Dets,
  Music,
  Stay,
} from '@/pages/Main/route';

interface ConponentItem {
  [key: string]: Array<{ Component: React.FC<{}> }>;
}

export const studentComponents: ConponentItem = {
  '/': [{ Component: MainPage }],

  //   '/ingangsil': { conponent: COMPONENT },
  //   '/mentoring': { conponent: COMPONENT },
  '/afterschool': [{ Component: AfterSchool }],
  '/circle': [{ Component: CircleC }],
  '/music': [{ Component: Music }],
  '/dets': [{ Component: Dets }],
  '/laundry': [{ Component: Laundry }],
  '/stay': [{ Component: Stay }],
};
