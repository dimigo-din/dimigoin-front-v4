import React, { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { UserType } from "@/constants/types";
import { useMyData } from "@/hooks/api/useMyData";
import { studentNavitions } from "./navigations";
import { useLocation } from "react-router-dom";
import { TopBarItem } from './NavigationItem';

export const TopBar: React.FC = () => {
  const [path, setPath] = useState<string>('/');
  const { pathname } = useLocation();
  const myData = useMyData();

  useEffect(() => {
    const p = `${pathname}/`;
    setPath(p.substring(0, p.indexOf('/', 1)));
    console.log(path);
  }, [pathname]);

  return (
    <Container padding='2rem 4.5rem' css={{
      width: '100%',
      height: '10rem'
    }}>
      {myData?.userType === UserType.S && (
        studentNavitions[path] && studentNavitions[path].map(({
          title,
          Accent,
          Disable,
          route
        }) => {
          return (
            <TopBarItem
              title={title}
              Accent={Accent}
              Disable={Disable}
              route={`${path}${route}`}
              selected={pathname === `${path}${route}`}
              key={`${path}${route}`}
            />
          );
        })
      )}
    </Container>
  );
};