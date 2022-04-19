import { IconItem } from "./NavigationItem";
import { Weekly } from "@/components/weekly";

import BoardAccent from '@/asset/icons/accent/board.svg';
import ChartAccent from '@/asset/icons/accent/chart.svg';
import CheckDocumentAccent from '@/asset/icons/accent/checkDocument.svg';

import BoardDisable from '@/asset/icons/disable/board.svg';
import ChartDisable from '@/asset/icons/disable/chart.svg';
import CheckDocumentDisable from '@/asset/icons/disable/checkDocument.svg';

export const studentNavitions: IconItem = {
  '/': [],
  '/ingangsil': [],
  '/mentoring': [],
  '/afterschool': [
    {
      title: '전체',
      route: '',
      Accent: BoardAccent,
      Disable: BoardDisable,
    },
    ...Weekly
  ],
  '/circle': [
    {
      title: '전체',
      route: '',
      Accent: BoardAccent,
      Disable: BoardDisable,
    },
  ],
  '/music': [
    {
      title: '차트',
      route: '',
      Accent: ChartAccent,
      Disable: ChartDisable,
    },
    {
      title: '신청',
      route: '/application',
      Accent: CheckDocumentAccent,
      Disable: CheckDocumentDisable,
    },
  ]
}