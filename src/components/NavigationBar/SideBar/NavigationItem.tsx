import React from 'react';
import { ItemBox } from './style';

export interface NavigationItem {
  title?: string;
  SVG?: any;
  selected?: boolean;
  route: string;
  division?: boolean;
  stroke?: boolean;
  black?: boolean;
}

const NavigationItem: React.FC<NavigationItem> = ({
  title,
  SVG,
  selected = false,
  stroke = false,
  black = false,
  route,
}) => (
  <ItemBox to={route} selected={selected}>
    {SVG && (
      <SVG
        fill={selected ? (black ? '#000' : '#E83C77') : '#8D90A0'}
        stroke={stroke && (selected ? (black ? '#000' : '#E83C77') : '#8D90A0')}
      />
    )}
    {title}
  </ItemBox>
);

export default NavigationItem;
