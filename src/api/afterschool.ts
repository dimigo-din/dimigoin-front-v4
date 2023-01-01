import { AfterschoolClass } from '@/constants/types';
import { api } from './api';

export const getAfterschoolClassList = async (): Promise<AfterschoolClass[]> =>
  (await api<'afterschoolClassList'>('GET', '/afterschool')).afterschools;
