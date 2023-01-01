import { Doc } from '@/constants/types';
import { api } from './api';
import { OutgoRequestForm } from './interfaces/outgo';

export const requestOutgo = (requestForm: OutgoRequestForm) =>
  api<'requestOutgo'>('POST', '/outgo-request');
