import React from 'react';
import {Footer} from '@box/widgets/footer/Footer';
import {Header} from '@box/widgets/header/Header';
import {ContentContainer, MainContainer} from '@box/shared/ui';

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
