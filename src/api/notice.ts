import { Doc, Notice } from '@/constants/types';
import { api } from './api';
import { AllNotices, APIDocNotice } from './interfaces/notice';

export const getAllNotice = (): Promise<APIDocNotice[]> =>
  api<'allNotices'>('GET', '/notice').then((e) => e.notices);
