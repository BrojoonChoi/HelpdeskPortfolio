import { useState, useEffect } from 'react';
import { Form,  InputGroup, Tab, Nav} from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

//SSO
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../system/authConfig";
import { useIsAuthenticated } from "@azure/msal-react";

const SignIn = () => {
  const navigate = useNavigate();
  const { instance } = useMsal();

  const [err, setError] = useState("");
  const [loading, setLoader] = useState(false);
  const [passwordshow, setpasswordshow] = useState(false);
  const [data, setData] = useState({
    "email": "adminreact@gmail.com",
    "password": "1234567890",
  });

  const { email, password } = data;

  const changeHandler = (e:any) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };

  const isAuthenticated = useIsAuthenticated();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } 
  },)

  const handleLogin = () => {
    instance.loginPopup(loginRequest)
        .then(response => {
            instance.setActiveAccount(response.account)
            console.log("Login successful", response);
            navigate("/dashboard");
        })
        .catch(e => {
            console.error(e);
        });
};

  return (
      <div className='login-img'>
        <div className="page">
          <div className="col-login mx-auto mt-7">
            <div className="text-center">
            </div>
          </div>
          <div className="container-login100">
            <div className="wrap-login100 p-6">
          <Tab.Container id="left-tabs-example" defaultActiveKey="react">
                    <Nav variant="pills" className="justify-content-center authentication-tabs">
                    <Nav.Item>
                      </Nav.Item>
                      <Nav.Item>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="react">
                      <form className="login100-form validate-form">
                <span className="login100-form-title pb-5 mt-5"> Login</span>
                    <div className="wrap-input100 validate-input input-group" data-bs-validate="Valid email is required: ex@abc.xyz">
                            <Link to="#" className="input-group-text bg-white text-muted">
                              <i className="zmdi zmdi-email text-muted" aria-hidden="true"></i>
                            </Link>
                            <Form.Control className="input100 border-start-0 form-control ms-0" type="email" placeholder="Email"  value={email}
                                  onChange={changeHandler}/>
                          </div>
                          <InputGroup className="wrap-input100 validate-input" id="Password-toggle">
                        <InputGroup.Text id="basic-addon2" onClick={()=>setpasswordshow(!passwordshow)} className="bg-white p-0">
                            <Link to='#'  className='bg-white text-muted p-3'><i className={`zmdi ${passwordshow ? 'zmdi-eye' : 'zmdi-eye-off'} text-muted`} aria-hidden="true" ></i></Link>
                        </InputGroup.Text>
                        <Form.Control type={(passwordshow) ? 'text' : "password"} name="password" placeholder="Password" value={password}
                          onChange={changeHandler} required />
                    </InputGroup>
                          <div className="container-login100-form-btn">
                            <Link 
                               onClick={handleLogin}
                             className="login100-form-btn btn-primary">
                              Login
                              {loading ? <span role="status" aria-hidden="true" className="spinner-border spinner-border-sm ms-2"></span> :""}
                            </Link>
                          </div>
                          <div className="text-center pt-3">
                            <p className="text-dark mb-0 fs-13">Not a member?<Link to={`${import.meta.env.BASE_URL}authentication/register/`} className="text-primary ms-1">Sign UP</Link></p>
                          </div>
                          <label className="login-social-icon"><span>Login with Social</span></label>
                          <div className="d-flex justify-content-center">
                            <Link to="#">
                              <div className="social-login me-4 text-center">
                                <i className="fa fa-google"></i>
                              </div>
                            </Link>
                            <Link to="#">
                              <div className="social-login me-4 text-center">
                                <i className="fa fa-facebook"></i>
                              </div>
                            </Link>
                            <Link to="#">
                              <div className="social-login text-center mb-5">
                                <i className="fa fa-twitter"></i>
                              </div>
                            </Link>
                          </div>
              </form>
                      </Tab.Pane>
                      <Tab.Pane eventKey="firebase">
                      <form className="login100-form validate-form">
                <span className="login100-form-title pb-5 mt-5"> Login</span>
                    <div> 
                      <div className="wrap-input100 validate-input input-group">
                        <Link to="#" className="input-group-text bg-white text-muted">
                          <i className="zmdi zmdi-email text-muted" aria-hidden="true"></i>
                        </Link>
                        <Form.Control className="input100 border-start-0 form-control ms-0" type="email" name="email" placeholder="Email" value={email}
                          onChange={changeHandler} required />{" "}
                      </div>

                      <InputGroup className="wrap-input100 validate-input" id="Password-toggle">
                        <InputGroup.Text id="basic-addon2" className="bg-white p-0" onClick={()=>setpasswordshow(!passwordshow)}>
                          <Link to='#' className='bg-white text-muted p-3'><i className={`zmdi ${passwordshow ? 'zmdi-eye' : 'zmdi-eye-off'} text-muted`}></i></Link>
                        </InputGroup.Text>
                        <Form.Control className="input100 border-start-0 ms-0" type={(passwordshow) ? 'text' : "password"} name="password" placeholder="Password" value={password}
                          onChange={changeHandler} required />{" "}
                      </InputGroup>
                      
                      <div className="container-login100-form-btn">
                        <Link onClick={handleLogin}className="login100-form-btn btn-primary">
                          Login
                          {loading ? <span role="status" aria-hidden="true" className="spinner-border spinner-border-sm ms-2"></span> :""}
                        </Link>
                      </div>
                      
                      <div className="text-center pt-3">
                            <p className="text-dark mb-0">Not a member? <Link to={`${import.meta.env.BASE_URL}Authentication/firebaseAuth/SignUp/`}>
                            Sign UP
                        </Link></p>
                          </div>
                      <div className="text-center pt-3">
                      
                      </div>
                      <label className="login-social-icon"><span>Login with Social</span></label>
                      <div className="d-flex justify-content-center">
                        <Link to="#">
                          <div className="social-login me-4 text-center">
                            <i className="fa fa-google"></i>
                          </div>
                        </Link>
                        <Link to="#">
                          <div className="social-login me-4 text-center">
                            <i className="fa fa-facebook"></i>
                          </div>
                        </Link>
                        <Link to="#">
                          <div className="social-login text-center">
                            <i className="fa fa-twitter"></i>
                          </div>
                        </Link>
                        
                      </div>

                    </div>
              </form>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                  </div>
                  </div>
                  </div>
                  </div>

  );
};

SignIn.propTypes = {};

SignIn.defaultProps = {};

export default SignIn;
