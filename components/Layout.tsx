import React from 'react';
import {Footer} from './Footer';
import {Header} from './Header';
import {ContentContainer} from './UI/ContentContainer';
import {MainContainer} from './UI/MainContainer';

type Props = {
  children: React.ReactNode;
  toggleTheme: () => void;
};

const Layout: React.FC<Props> = ({children, toggleTheme}) => {
  return (
    <MainContainer>
      <Header toggleTheme={toggleTheme} />
      <ContentContainer>{children}</ContentContainer>
      <Footer />
    </MainContainer>
  );
};

export default Layout;
