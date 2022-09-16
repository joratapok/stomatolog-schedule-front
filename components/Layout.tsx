import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import { Footer } from './Footer';
import { Header } from './Header';
import { ContentContainer } from './UI/ContentContainer';
import {useAppSelector} from '../hooks/redux';
import {MainContainer} from './UI/MainContainer';

type Props = {
  children: React.ReactNode;
  toggleTheme: () => void;
};

const Layout: React.FC<Props> = ({ children, toggleTheme }) => {
  const router = useRouter();
  const {isAuth} = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    if (!isAuth) {
      router.push('/sign_in')
        .catch(e => console.log('Redirect sign_up error', e));
    }
  }, [isAuth]);
  return (
    <MainContainer>
      <Header toggleTheme={toggleTheme} />
      <ContentContainer>{children}</ContentContainer>
      <Footer />
    </MainContainer>
  );
};

export default Layout;
