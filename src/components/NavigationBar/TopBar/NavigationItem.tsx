import React from "react";
import { ItemBox, Icon } from "./style";
import { NavigationItem } from "@/components/NavigationBar/SideBar/NavigationItem";

export interface IconItem {
  [key: string]: Array<NavigationItem>;
};

export const TopBarItem: React.FC<
  NavigationItem
> = ({ title, Accent, Disable, selected = false, route }) => (
  <ItemBox to={route} selected={selected}>
    <Icon src={selected ? Accent : Disable} />
    {title}
  </ItemBox>
);