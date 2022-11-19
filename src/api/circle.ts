import { Doc, Circle } from '@/constants/types';
import { api } from './api';
// import { AllCircle, GetCircleById } from './interfaces/circle';

export const getAllCircle = (): Promise<Circle[]> =>
  api<'allCircle'>('GET', '/circle').then((e) => e.circles);

export const getCircleById = (circleId: String): Promise<Circle> =>
  api<'getCircleById'>('GET', `/circle/${circleId}`).then((e) => e.circle);

export const getMyCircle = (): Promise<Circle> =>
  api<'getMyCircle'>('GET', '/circle/my-circle').then((e) => e.circle);
