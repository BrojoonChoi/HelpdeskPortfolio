import  { FC, Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Switcher1 from './layoutcomponents/Switcher1';


interface ErrorPagesProps { }

const ErrorPages: FC<ErrorPagesProps> = () => {

document.querySelector("body")?.classList.add( 'login-img');
    return(

    <Fragment>
        <div>
        <Switcher1/>
           <Outlet />
        </div>
    </Fragment>
);}

export default ErrorPages;