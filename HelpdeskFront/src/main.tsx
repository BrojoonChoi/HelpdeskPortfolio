import React, { Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from './layouts/layoutcomponents/Loader';
import "./index.scss"
import { RouterData } from './commondata/routingdata';
import App from './layouts/app';
import ErrorPages from './layouts/ErrorPages';
import Error400 from './components/Errorpages/Error400/Error400';
import Dashboard from './components/Dashboard/Dashboard';
import QnA from './components/Ticketing/qna';
import PostQuestion from './components/Ticketing/postquestion';
import Auth from './components/SSOAuth/auth';
import SignIn from './components/SSOAuth/authlogin';
import TicketManagement from './components/TicketManagement/ticketmanagement';

import  { lazy } from 'react';
const Admin_Question = lazy(() => import('./components/Admin/adminquestion'));

import './system/languages';

//SSO
import { msalConfig } from './system/authConfig'
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
export const msalInstance = new PublicClientApplication(msalConfig);

const container: HTMLElement | any = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <Fragment>
        <BrowserRouter>
          <React.Suspense fallback={<Loader />}>
            <Routes>

              <Route path={`${import.meta.env.BASE_URL}`} element={<Auth />}>
                <Route index element={<SignIn />} />
                <Route path={`${import.meta.env.BASE_URL}Authentication/firebaseAuth/login`} element={<SignIn />} />
              </Route>

              <Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
                <Route index element={<Dashboard />} />
                  {RouterData.map((idx) => (
                  <Route path={idx.path} element={idx.element} key={Math.random()} />
                  ))}
                <Route path={`${import.meta.env.BASE_URL}qna`} element={<QnA />} />
                <Route path={`${import.meta.env.BASE_URL}qna/postquestion`} element={<PostQuestion />} />

                <Route path={`${import.meta.env.BASE_URL}ticketmanagement`} element={<TicketManagement />} />
                
                <Route path={`${import.meta.env.BASE_URL}admin/question`} element={<Admin_Question />} />
              </Route>

              <Route path={`${import.meta.env.BASE_URL}`} element={<ErrorPages />}>
                <Route path={`${import.meta.env.BASE_URL}errorpages/error400`} element={<Error400 />} />
              </Route>

            </Routes>
          </React.Suspense>
        </BrowserRouter>
      </Fragment>
    </MsalProvider>
  </React.StrictMode>

);

