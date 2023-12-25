import { PropsWithChildren } from 'react';
import './style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="layout-wrapper">
      <Header />
      <div className="layout-main-action-wrapper">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
