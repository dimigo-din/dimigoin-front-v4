import React from 'react';
import { containerCustom } from './style';

export const Container: React.FC<{
  padding: string;
  children: React.ReactElement[];
}> = (props) => {
  const Ctn = containerCustom(props.padding);

  return (
    <Ctn>
      {props.children}
    </Ctn>
  );
};