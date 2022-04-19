import { IconItem } from "./NavigationItem";
import { Weekly } from "@/components/weekly";

import { ReactComponent as Board } from '@/asset/icons/board.svg';
import { ReactComponent as Chart } from '@/asset/icons/chart.svg';
import { ReactComponent as CheckDocument } from '@/asset/icons/checkDocument.svg';


export const studentNavitions: IconItem = {
  '/': [],
  '/ingangsil': [],
  '/mentoring': [],
  '/afterschool': [
    {
      title: '전체',
      route: '',
      SVG: Board,
      black: true,
    },
    ...Weekly
  ],
  '/circle': [
    {
      title: '전체',
      route: '',
      SVG: Board,
      black: true,
    },
  ],
  '/music': [
    {
      title: '차트',
      route: '',
      SVG: Chart,
      black: true,
    },
    {
      title: '신청',
      route: '/application',
      SVG: CheckDocument,
      black: true,
    },
  ]
}