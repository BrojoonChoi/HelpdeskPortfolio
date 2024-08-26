import { FC, Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../layouts/layoutcomponents/Footer';
import Header from '../layouts/layoutcomponents/Header';
import Rightside from '../layouts/layoutcomponents/Rightside';
import Switcher from '../layouts/layoutcomponents/Switcher';
import * as  SwitcherData from '../commondata/switcherdata'
import BacktoTop from '../layouts/layoutcomponents/Backtotop';
import { Sidebar }  from '../layouts/layoutcomponents/Sidebar';
import { useIsAuthenticated } from "@azure/msal-react";

interface AppProps { }

const App: FC<AppProps> = () => {
  const isAuthenticated = useIsAuthenticated();
  document.querySelector("body")?.classList.remove('login-img', 'landing-page', 'horizontal');
  document.querySelector("body")?.classList.add( 'app', 'sidebar-mini', 'ltr','light-mode');

  return(
  <Fragment>
    {!isAuthenticated ? <div>Something went wrong :(. Please sign-in again.</div> : 
    <div className='horizontalMenucontainer' >
      <Switcher />
      <div className="page">
        <div className="page-main">
          <Header />
          <div className="sticky" style={{ paddingTop: "-74px" }}>
            <Sidebar />
          </div>
          <div className="jumps-prevent" style={{ paddingTop: "74px" }}></div>
          <div className="main-content app-content mt-0" onClick={() => SwitcherData.responsiveSidebarclose()}>
            <div className="side-app">
              <div className="main-container container-fluid">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
     
      <Rightside />
      <BacktoTop />
    </div>
    }
  </Fragment>
);}

export default App;
