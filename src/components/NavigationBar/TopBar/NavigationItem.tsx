import React from "react";
import { ItemBox } from "./style";
import { NavigationItem } from "@/components/NavigationBar/SideBar/NavigationItem";

export interface IconItem {
  [key: string]: Array<NavigationItem>;
};

export const TopBarItem: React.FC<
  NavigationItem
> = ({
  title,
  SVG,
  selected = false,
  stroke = false,
  black = true,
  route
}) => (
  <ItemBox to={route} selected={selected}>
    {SVG && <SVG
      fill={selected ? (black ? '#000' :'#FF3284') : '#A6ABC0'}
      stroke={stroke && (selected ? (black ? '#000' :'#FF3284') : '#A6ABC0')}
    />}
    {title}
  </ItemBox>
);