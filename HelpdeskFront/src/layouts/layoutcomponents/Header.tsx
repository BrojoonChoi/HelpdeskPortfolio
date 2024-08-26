import  { useState } from 'react';
import { Link} from 'react-router-dom';
import { FormControl, Nav, Modal, Row, Col, Dropdown, Badge, Navbar, InputGroup, Button } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Imagesdata } from '../../commondata/commonimages';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next'; // 추가


const SideMenuIcon: any = () => {

  //leftsidemenu
  document.querySelector(".app")?.classList.toggle("sidenav-toggled");
}
 // Darkmode
 const DarkMode = () => {


  if (document.querySelector("body")?.classList.contains('dark-mode')) {
    document.querySelector("body")?.classList.remove('dark-mode');
    
    let myonoffswitch2 = document.querySelector("#myonoffswitch1") as HTMLInputElement
    myonoffswitch2.checked = true;
    let myonoffswitch5 = document.querySelector("#myonoffswitch3") as HTMLInputElement
    myonoffswitch5.checked = true;
    let myonoffswitch8 = document.querySelector("#myonoffswitch6") as HTMLInputElement
    myonoffswitch8.checked = true;
  }
  else {
    document.querySelector("body")?.classList.add('dark-mode');
    let myonoffswitch2 = document.querySelector("#myonoffswitch2") as HTMLInputElement
    myonoffswitch2.checked = true;
    let myonoffswitch5 = document.querySelector("#myonoffswitch5") as HTMLInputElement
    myonoffswitch5.checked = true;
    let myonoffswitch8 = document.querySelector("#myonoffswitch8") as HTMLInputElement
    myonoffswitch8.checked = true;
  }
};
// FullScreen
var elem: any = document.documentElement;
var i = true
const Fullscreen: any = (vale: any) => {
  switch (vale) {
    case true:
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
      i = false
      break;
    case false:
      document.exitFullscreen()
      i = true
      break;
  }
}

// SwitcherMenu

const SidSwitcherIcon: any = () => {

  //leftsidemenu
  document.querySelector(".demo_changer")?.classList.toggle("active");
  let Rightside: any = document.querySelector(".demo_changer")
  Rightside.style.insetInlineEnd = "0px";

}

const RightSideBar: any = () => {
  //leftsidemenu

  //rightsidebar
  document.querySelector(".sidebar-right")?.classList.toggle("sidebar-open");
  //swichermainright
}
const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng:string) => {
    i18n.changeLanguage(lng);
  };

  document.querySelector('.main-content')?.addEventListener('click', ()=>{
    console.log("search-result");
    document.querySelector(".search-result")?.classList.add("d-none")
  })

  // For CountrySelector Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div className=''>

      <div className='header sticky app-header header1'>
        <div className="container-fluid main-container">
          <div className="d-flex">
            <Link aria-label="Hide Sidebar" className="app-sidebar__toggle" data-bs-toggle="sidebar" to="#" onClick={() => SideMenuIcon()} />
            <Link className="logo-horizontal " to={`${import.meta.env.BASE_URL}Dashboard`}>
              <img src={Imagesdata("logo")} className="header-brand-img desktop-logo" alt="logo" />
              <img src={Imagesdata("logo1")} className="header-brand-img light-logo1" alt="logo" />
            </Link>
            <div className="main-header-center ms-3 d-none d-lg-block">
              <FormControl placeholder="Search for results..." type="search" />
              <button className='btn px-0 pt-2'><i className="fe fe-search" aria-hidden="false"></i></button> 
            </div>

            <Navbar className="d-flex order-lg-2 ms-auto header-right-icons">
              <Dropdown className="dropdown d-none">
                <Link to="#" className="nav-link icon " >
                  <i className="fe fe-search"></i>
                </Link>
                <Dropdown.Menu className="header-search dropdown-menu-start ">
                  <InputGroup className="input-group w-100 p-2">
                    <FormControl type="text" placeholder="Search...." />
                    <InputGroup.Text className="btn btn-primary">
                      <i className="fe fe-search" aria-hidden="true"></i>
                    </InputGroup.Text>
                  </InputGroup>
                </Dropdown.Menu>
              </Dropdown>
              <Navbar.Toggle className="d-lg-none ms-auto header2">
                <span className="navbar-toggler-icon fe fe-more-vertical"></span>
              </Navbar.Toggle>

              <div className="responsive-navbar p-0">

                <Navbar.Collapse className="" id="navbarSupportedContent-4">
                  <div className="d-flex order-lg-2">
                    <Dropdown className="d-lg-none d-flex" >
                      <Dropdown.Toggle href="#" className="nav-link icon no-caret">
                        <i className="fe fe-search"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="header-search dropdown-menu-start">
                        <InputGroup className="w-100 p-2">
                          <FormControl type="text" placeholder="Search...." />
                          <InputGroup.Text>
                            <i className="fa fa-search" aria-hidden="true" ></i>
                          </InputGroup.Text>
                        </InputGroup>
                      </Dropdown.Menu>
                    </Dropdown>

                    {/* Country Select Modal */}

                    <div className="d-flex country">
                      <Link to='#' onClick={handleShow} className="nav-link icon text-center"><i className="fe fe-globe"></i><span className="fs-16 ms-2 d-none d-xl-block">Language</span></Link>
                      <Modal className='modal fade' show={show} onHide={handleClose} centered>
                        <Modal.Header>
                          <Modal.Title as='h6'>Choose Country</Modal.Title>
                          <span className="d-flex ms-auto" onClick={handleClose}><i className='fe fe-x ms-auto' ></i></span>
                        </Modal.Header>
                        <Modal.Body>
                          <Row as='ul' className="p-3">
                            <Col lg={6} as='li' className="mb-2">
                              <Button className="btn btn-country btn-lg btn-block active" onClick={() => changeLanguage('kr')}>
                                <span className="country-selector"><img alt="" src={Imagesdata("us")}
                                  className="me-3 language" /></span>Korean(한국어)
                              </Button>
                            </Col>
                            <Col lg={6} as='li' className="mb-2">
                              <Button className="btn btn-country btn-lg btn-block" onClick={() => changeLanguage('en')}>
                                <span className="country-selector"><img alt=""
                                  src={Imagesdata("italy")}
                                  className="me-3 language" /></span>English
                              </Button>
                            </Col>
                          </Row>
                        </Modal.Body>
                      </Modal>

                    </div>

                    {/* Dark Mode 
                    <div className="dropdown  d-flex">
                      <Nav.Link className="nav-link icon theme-layout nav-link-bg layout-setting" onClick={() => DarkMode()}>
                        <span className="dark-layout"><i className="fe fe-moon"></i></span>
                        <span className="light-layout"><i className="fe fe-sun"></i></span>
                      </Nav.Link>
                    </div>
                    */}
                    {/* <!-- Shopping-Cart Theme-Layout --> */}

                  

                    {/* FullScreen button
                    <div className="dropdown d-flex">
                      <Nav.Link className="nav-link icon full-screen-link nav-link-bg" onClick={() => Fullscreen(i)}>
                        <i className="fe fe-minimize fullscreen-button"></i>
                      </Nav.Link>
                    </div>
                    */}

                    {/* Notification */}

                    <Dropdown className="d-flex notifications">
                      <Dropdown.Toggle variant='' className="nav-link icon no-caret"><i className="fe fe-bell"></i><span className=" pulse"></span></Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-end dropdown-menu-arrow">
                        <div className="drop-heading border-bottom">
                          <div className="d-flex">
                            <h6 className="mt-1 mb-0 fs-16 fw-semibold text-dark">Notifications
                            </h6>
                          </div>
                        </div>
                        <div className="notifications-menu">
                          <Link className="dropdown-item d-flex" to={`${import.meta.env.BASE_URL}Pages/notificationlist/`}>
                            <div
                              className="me-3 notifyimg  bg-primary brround box-shadow-primary">
                              <i className="fe fe-mail"></i>
                            </div>
                            <div className="mt-1">
                              <h5 className="notification-label mb-1">New Application received
                              </h5>
                              <span className="notification-subtext">3 days ago</span>
                            </div>
                          </Link>
                          <Link className="dropdown-item d-flex" to={`${import.meta.env.BASE_URL}Pages/notificationlist/`}>
                            <div
                              className="me-3 notifyimg  bg-secondary brround box-shadow-secondary">
                              <i className="fe fe-check-circle"></i>
                            </div>
                            <div className="mt-1">
                              <h5 className="notification-label mb-1">Project has been
                                approved</h5>
                              <span className="notification-subtext">2 hours ago</span>
                            </div>
                          </Link>
                          <Link className="dropdown-item d-flex" to={`${import.meta.env.BASE_URL}Pages/notificationlist/`}>
                            <div
                              className="me-3 notifyimg  bg-success brround box-shadow-success">
                              <i className="fe fe-shopping-cart"></i>
                            </div>
                            <div className="mt-1">
                              <h5 className="notification-label mb-1">Your Product Delivered
                              </h5>
                              <span className="notification-subtext">30 min ago</span>
                            </div>
                          </Link>
                          <Link className="dropdown-item d-flex" to={`${import.meta.env.BASE_URL}Pages/notificationlist/`}>
                            <div className="me-3 notifyimg bg-pink brround box-shadow-pink">
                              <i className="fe fe-user-plus"></i>
                            </div>
                            <div className="mt-1">
                              <h5 className="notification-label mb-1">Friend Requests</h5>
                              <span className="notification-subtext">1 day ago</span>
                            </div>
                          </Link>
                        </div>
                        <div className="dropdown-divider m-0"></div>
                        <Link to={`${import.meta.env.BASE_URL}Pages/notificationlist/`}
                          className="dropdown-item text-center p-3 text-muted">View all
                          Notification</Link>
                      </Dropdown.Menu>
                    </Dropdown>

                    {/* Messages */}

                    <Dropdown className="d-flex message">
                      <Dropdown.Toggle variant='' className="nav-link icon text-center no-caret">
                        <i className="fe fe-message-square"></i><span className="pulse-danger"></span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-end dropdown-menu-arrow">
                        <div className="drop-heading border-bottom">
                          <div className="d-flex">
                            <h6 className="mt-1 mb-0 fs-16 fw-semibold text-dark">You have 5
                              Messages</h6>
                            <div className="ms-auto">
                              <Link to="#" className="text-muted p-0 fs-12">make all unread</Link>
                            </div>
                          </div>
                        </div>
                        <div className="message-menu">
                          <Link className="dropdown-item d-flex" to={`${import.meta.env.BASE_URL}apps/chat/`}>
                            <img
                              className="avatar avatar-md brround me-3 align-self-center cover-image" alt='user-1'
                              src={Imagesdata("users1")} />
                            <div className="wd-90p">
                              <div className="d-flex">
                                <h5 className="mb-1">Peter Theil</h5>
                                <small className="text-muted ms-auto text-end">
                                  6:45 am
                                </small>
                              </div>
                              <span>Commented on file Guest list....</span>
                            </div>
                          </Link>
                          <Link className="dropdown-item d-flex" to={`${import.meta.env.BASE_URL}apps/chat/`}>
                            <img
                              className="avatar avatar-md brround me-3 align-self-center cover-image" alt='user-15'
                              src={Imagesdata("users15")} />
                            <div className="wd-90p">
                              <div className="d-flex">
                                <h5 className="mb-1">Abagael Luth</h5>
                                <small className="text-muted ms-auto text-end">
                                  10:35 am
                                </small>
                              </div>
                              <span>New Meetup Started......</span>
                            </div>
                          </Link>
                          <Link className="dropdown-item d-flex" to={`${import.meta.env.BASE_URL}apps/chat/`}>
                            <img
                              className="avatar avatar-md brround me-3 align-self-center cover-image" alt='user-12'
                              src={Imagesdata("users12")} />
                            <div className="wd-90p">
                              <div className="d-flex">
                                <h5 className="mb-1">Brizid Dawson</h5>
                                <small className="text-muted ms-auto text-end">
                                  2:17 pm
                                </small>
                              </div>
                              <span>Brizid is in the Warehouse...</span>
                            </div>
                          </Link>
                          <Link className="dropdown-item d-flex" to={`${import.meta.env.BASE_URL}apps/chat/`}>
                            <img
                              className="avatar avatar-md brround me-3 align-self-center cover-image" alt='user-4'
                              src={Imagesdata("users4")} />
                            <div className="wd-90p">
                              <div className="d-flex">
                                <h5 className="mb-1">Shannon Shaw</h5>
                                <small className="text-muted ms-auto text-end">
                                  7:55 pm
                                </small>
                              </div>
                              <span>New Product Realease......</span>
                            </div>
                          </Link>

                        </div>
                        <div className="dropdown-divider m-0"></div>
                        <Dropdown.Item to="#" className="text-center p-3 text-muted">See all
                          Messages</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    {/* Right Side-bar
                    
                    <div className="dropdown d-flex header-settings" onClick={() => RightSideBar()}>
                      <Link to="#;" className="nav-link icon"
                        data-bs-toggle="sidebar-right" data-target=".sidebar-right">
                        <i className="fe fe-align-right"></i>
                      </Link>
                    </div>
                     */}

                    {/* Profile */}
                    <Dropdown className="d-flex profile-1">
                      <Dropdown.Toggle variant='' className="nav-link leading-none d-flex no-caret">
                        <img src={Imagesdata("users21")} alt="profile-user"
                          className="avatar  profile-user brround cover-image" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-end dropdown-menu-arrow">
                        <div className="drop-heading">
                          <div className="text-center">
                            <h5 className="text-dark mb-0 fs-14 fw-semibold">Percy Kewshun</h5>
                            <small className="text-muted">Senior Admin</small>
                          </div>
                        </div>
                        <div className="dropdown-divider m-0"></div>
                        <Link className="dropdown-item" to={`${import.meta.env.BASE_URL}Pages/profile`}>
                          <i className="dropdown-icon fe fe-user"></i> Profile
                        </Link>
                        <Link className="dropdown-item" to={`${import.meta.env.BASE_URL}Pages/mailinbox/`}>
                          <i className="dropdown-icon fe fe-mail"></i> Inbox
                          <span className="badge bg-danger rounded-pill float-end">5</span>
                        </Link>
                        <Link className="dropdown-item" to={`${import.meta.env.BASE_URL}Authentication/lockscreen/`}>
                          <i className="dropdown-icon fe fe-lock"></i> Lockscreen
                        </Link>
                        <Dropdown.Item className="dropdown-item">
                          <i className="dropdown-icon fe fe-alert-circle"></i> Sign out
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                     
                  </div>
                </Navbar.Collapse>
              </div>

              {/* Switcher  
              
              <div className="demo-icon nav-link icon" onClick={() => SidSwitcherIcon()}>
                <i className="fe fe-settings fa-spin  text_primary"></i>
              </div>
              */}
            </Navbar>
          </div>
        </div>
      </div>
    </div>
  )

};

export default Header;
