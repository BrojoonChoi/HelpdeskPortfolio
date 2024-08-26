import users15 from '../assets/images/users/15.jpg';
import users21 from '../assets/images/users/21.jpg';
import users1 from '../assets/images/users/1.jpg';
import users12 from '../assets/images/users/12.jpg';
import users4 from '../assets/images/users/4.jpg';
import pngs4 from '../assets/images/png/4.png';
import pngs1 from '../assets/images/png/1.png';
import pngs3 from '../assets/images/png/3.png';
import pngs6 from '../assets/images/png/6.png';
import pngs8 from '../assets/images/png/8.png';
import logo from '../assets/images/brand/logo.png';
import logowhite from '../assets/images/brand/logo-white.png';
import logo3 from '../assets/images/brand/logo-dark.png';
import loader from '../assets/images/loader.svg';
import chrome from '../assets/images/browsers/chrome.svg';
import opera from '../assets/images/browsers/opera.svg';
import firefox from '../assets/images/browsers/firefox.svg';
import edge from '../assets/images/browsers/edge.svg';
import safari from '../assets/images/browsers/safari.svg';
import netscape from '../assets/images/browsers/netscape.svg';
import us from '../assets/images/flags-img/us_flag.jpg';
import italy from '../assets/images/flags-img/italy_flag.jpg';
import spain from '../assets/images/flags-img/spain_flag.jpg';
import india from '../assets/images/flags-img/india_flag.jpg';
import turkey from '../assets/images/flags-img/turkey.jpg';
import french from '../assets/images/flags-img/french_flag.jpg';
import argentina from '../assets/images/flags-img/argentina.jpg';
import russia from '../assets/images/flags-img/russia_flag.jpg';
import germany from '../assets/images/flags-img/germany_flag.jpg';
import malaysia from '../assets/images/flags-img/malaysia.jpg';
import circle from '../assets/images/svgs/circle.svg';
import bgimg1 from '../assets/images/media/bg-img1.jpg';
import bgimg2 from '../assets/images/media/bg-img2.jpg';
import bgimg3 from '../assets/images/media/bg-img3.jpg';
import bgimg4 from '../assets/images/media/bg-img4.jpg';
import ie from '../assets/images/browsers/ie.svg';
import users2 from '../assets/images/users/2.jpg';
import users11 from '../assets/images/users/11.jpg';
import users10 from '../assets/images/users/10.jpg';
import users13 from '../assets/images/users/13.jpg';
import users7 from '../assets/images/users/7.jpg';
import users9 from '../assets/images/users/9.jpg';
import users14 from '../assets/images/users/14.jpg';
import logo1 from '../assets/images/brand/logo1.png';
export const Imagesdata = (data:any) => {

    const img: any = {users15, users21 , users1, users12, users4, pngs4, pngs1, pngs3, pngs6, pngs8, logo3, logo,italy, germany, russia, french, 
                    argentina, turkey, malaysia, us, loader, spain, india,circle, logowhite, chrome, opera, firefox, edge, safari, netscape,
                    bgimg1, bgimg2, bgimg3, bgimg4, ie, users2, users10, users11, users13, users7, users9, users14, logo1}

    return img[data];
}