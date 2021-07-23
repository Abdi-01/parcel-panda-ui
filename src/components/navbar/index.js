import React from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from "../../asset/img/logo.png"
import { InputText } from 'primereact/inputtext';
import { Modal, ModalBody, Row, Col, FormGroup, Input, Label, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, } from 'reactstrap';
import login2 from "../../asset/img/login2.jpg";
import { Link } from "react-router-dom";
import "../navbar/navbarComp.css"
import 'react-toastify/dist/ReactToastify.css';
import { authLogin, authLogout } from "../../actions"
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
// import axios from 'axios';
// import { URL_API } from "../../helper"

toast.configure()   
class NavbarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false, modal: false }
    }

    onBtLogin = () => {
        this.props.authLogin(this.inputUsername.value, this.inputPassword.value)
        this.setState({ modal: false });
        this.handleNotify()
    }


    handleNotify = () => {
        toast.success('Hey 👋 Login Success!', {position: toast.POSITION.TOP_CENTER, autoClose: 3000})
    }

    // resendOTP = () => {
    //     axios.patch(URL_API + `/auth/reverif`, {
    //         username: this.inputUsername.value, password: this.inputPassword.value
    //     }).then(res => {
    //         console.log(res.data)
    //     }).catch(err => console.log(err))
    // }

    printLogin = () => {
        return (
            <div>
                <Modal size="lg" isOpen={this.state.modal} toggle={() => { this.setState({ modal: !this.state.modal }) }}>
                    <ModalBody>
                        <Container>
                            <Row className="box">
                                <Col md="6" className="p-0">
                                    <img src={login2} alt="login" className="img-log" style={{ objectFit: "fill", borderRadius: "15px 0px 0px 15px", width: "100%", height: "100%" }} />
                                </Col>
                                <Col md="6" className="col2">
                                    <h6>
                                        Log in.
                                    </h6>
                                    <h3>Welcome Back!</h3>
                                    <Form>
                                        <FormGroup>
                                            <Label>Username/Email</Label>
                                            <Input type="text" innerRef={(elemen) => (this.inputUsername = elemen)} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Password</Label>
                                            <Input type="password" innerRef={(elemen) => (this.inputPassword = elemen)} />
                                        </FormGroup>
                                    </Form>
                                    <Button variant="warning" onClick={() => this.onBtLogin()} className="btncustom"
                                        style={{ background: "#FAB629", color: "black", width: "100%", borderRadius: "5%", marginTop: "15px" }}>
                                        Login
                                    </Button>
                                    <Link to="/forget-pass" className="link1" onClick={() => { this.setState({ modal: !this.state.modal }) }}><p className="b-name">Forgot Password?</p></Link>
                                    <p className="p-regis">Don't have an account? <Link to="/regis" className="link1" onClick={() => { this.setState({ modal: !this.state.modal }) }}><b>Create now.</b></Link></p>
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.printLogin()}
                <Navbar expand="md" >
                    <Container>
                        <Navbar.Brand href="/">
                            <img src={logo} width="200px" alt="logo" className="d-inline-block align-top " />
                        </Navbar.Brand>
                        <Nav >
                            <div className="p-field p-fluid div-search">
                                <div>
                                    <span className="p-input-icon-right">
                                        <InputText placeholder="Search"/>
                                        <i className="pi pi-search" />
                                    </span>
                                </div>
                            </div>
                        </Nav>
                        <Nav>
                            <div>
                                <h6>8 800 332 65-66 <br></br><span className="support">Support 24/7</span></h6>
                            </div>
                            {
                                this.props.username ?
                                    <div style={{ display: 'flex', alignItems: "center" }}>
                                        <Nav.Link style={{ display: 'flex', alignItems: 'center' }}
                                        ><span className="material-icons">
                                                person_outline
                                            </span>
                                            <UncontrolledDropdown>
                                                <DropdownToggle DropdownToggle nav caret style={{ color: 'gray' }}>
                                                    {this.props.username}
                                                </DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem>
                                                        <Link to="/user-profile" className="nav-link" style={{ display: 'flex' }}>
                                                            <span class="material-icons">
                                                                account_circle
                                                            </span>
                                                            Profile
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem onClick={this.props.authLogout}>
                                                        <Link className="nav-link" style={{ display: 'flex' }}>
                                                            <span class="material-icons">
                                                                logout
                                                            </span>
                                                            Log Out
                                                        </Link>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </Nav.Link>
                                        <Nav.Link><span className="material-icons">
                                            favorite_border
                                        </span></Nav.Link>
                                        <Nav.Link><span className="material-icons">
                                            shopping_cart
                                        </span></Nav.Link>
                                    </div> :
                                    <Button style={{ marginLeft: '15px' }} size="sm" variant="outline-secondary" onClick={() => {
                                        this.setState({ modal: !this.state.modal });
                                    }}>
                                        Login
                                    </Button>
                            }
                        </Nav>
                    </Container>
                </Navbar>
                <Navbar >
                    <Container>
                        <Navbar.Brand>
                            <Button variant="warning" className="btncustom" size="sm" style={{ display: 'flex', background: "#FAB629", color: "black" }}>
                                <span className="material-icons">
                                    menu
                                </span>
                                SHOP BY CATEGORY</Button>
                        </Navbar.Brand>
                        <Nav className=" my-2 my-lg-0 " style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link style={{ display: 'flex' }}><span className="material-icons">
                                bolt
                            </span>Deals Today</Nav.Link>
                            <Nav.Link style={{ display: 'flex' }}><span className="material-icons">
                                sell
                            </span>Special Prices</Nav.Link>
                            <NavDropdown title="Fresh" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Frozen" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Demos" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Shop" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link style={{ display: 'flex' }}><span className="material-icons">
                                sync
                            </span>Recently Viewed</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        id: authReducer.idstatus,
        username: authReducer.username
    }
}

export default connect(mapStateToProps, { authLogin, authLogout })(NavbarComp);