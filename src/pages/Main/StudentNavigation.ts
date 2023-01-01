import MainPage from './route/MainPage';
import AfterSchool from './route/AfterSchool';
import Club from './route/Club';
import Laundry from './route/Laundry';
import Dets from './route/Dets';
import Music from './route/Music';

interface ConponentItem {
  [key: string]: Array<{ Component: React.FC<{}> }>;
}

export const studentComponents: ConponentItem = {
  '/': [{ Component: MainPage }],

  //   '/ingangsil': { conponent: COMPONENT },
  //   '/mentoring': { conponent: COMPONENT },
  '/afterschool': [{ Component: AfterSchool }],
  '/circle': [{ Component: Club }],
  '/music': [{ Component: Music }],
  '/dets': [{ Component: Dets }],
  '/laundry': [{ Component: Laundry }],
};
