import { Doc, Place } from '@/constants/types';
import { api } from './api';
// import { PlaceList, PrimaryPlaceList } from './interfaces/place';

export const getAllPlaceList = (): Promise<Place[]> =>
  api<'placeList'>('GET', '/place').then((e) => e.places);

export const getPrimaryPlaceList = (): Promise<Place[]> =>
  api<'primaryPlaceList'>('GET', '/place/primary').then((e) => e.places);
