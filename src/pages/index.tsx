import loadable from '@loadable/component';

export const Main = {
  Student: loadable(() => import('./Main/Student')),
  Teacher: loadable(() => import('./Main/Teacher')),
  Dormitory: loadable(() => import('./Main/Dormitory'))
};

export const Login = loadable(() => import('./Login'));

export const AfterSchool = {
  Student: loadable(() => import('./AfterSchool/Student')),
  Teacher: loadable(() => import('./AfterSchool/Teacher'))
};
