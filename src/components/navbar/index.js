import React from 'react';
import { Button, Container, Form, Nav, Navbar, Badge } from 'react-bootstrap';
import logo from "../../asset/img/logo.png"
// import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Modal, ModalBody, Row, Col, FormGroup, Input, Label, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import login2 from "../../asset/img/login2.jpg";
import { Link } from "react-router-dom";
import "../navbar/navbarComp.css"
import 'react-toastify/dist/ReactToastify.css';
import { authLogin, authLogout } from "../../actions"
import { connect } from 'react-redux';

class NavbarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false, modal: false, password: '' }
    }

    onBtLogin = () => {
        this.props.authLogin(this.inputUsername.value, this.state.password)
        this.setState({ modal: false, });
        this.setState({ password: '' });
    }

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
                                            <div className="p-field p-fluid">
                                                <span className="p-input-icon-left">
                                                    <i className="pi pi-lock" />
                                                    <Password value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} toggleMask />
                                                </span>
                                            </div>
                                            {/* <Input type="password" innerRef={(elemen) => (this.inputPassword = elemen)} /> */}
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

    totalQty = () => {
        return this.props.cart.map((item, index) => {
            return item.detail.map((val, idx) => {
                return val.amount
            }).reduce((a, b) => a + b, 0)
        }).reduce((a, b) => a + b, 0)
    }

    render() {
        return (
            <div style={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '99', boxShadow: '5px 5px 5px #DDDDDD', width: '100%' }}>
                {this.printLogin()}
                <Navbar expand="md" >
                    <Container>
                        <Navbar.Brand href="/">
                            <img src={logo} width="200px" alt="logo" className="d-inline-block align-top " />
                        </Navbar.Brand>
                        <Nav>
                            <Nav.Link href="/parcel" style={{ display: 'flex' }}><span style={{ paddingLeft: '3px' }} className="material-icons">
                                takeout_dining
                            </span>Parcel</Nav.Link>
                            <Nav.Link href="/product" style={{ display: 'flex' }}><span style={{ paddingRight: '3px' }} className="material-icons">
                                sell
                            </span>Product</Nav.Link>
                        </Nav>
                        <Nav>
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
                                                    {
                                                        this.props.role === "user" ?
                                                            <>
                                                                <DropdownItem>
                                                                    <Link to="/user-profile" className="nav-link" style={{ display: 'flex' }}>
                                                                        <span class="material-icons">
                                                                            account_circle
                                                                        </span>
                                                                        Profile
                                                                    </Link>
                                                                </DropdownItem>
                                                                <DropdownItem>
                                                                    <Link to={`/user-transaction/${this.props.id}`} className="nav-link" style={{ display: 'flex' }}>
                                                                        <span class="material-icons">
                                                                            shopping_bag
                                                                        </span>
                                                                        My Order
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
                                                            </> :
                                                            <>
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
                                                            </>
                                                    }

                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </Nav.Link>
                                        <Nav.Link><span className="material-icons">
                                            favorite_border
                                        </span></Nav.Link>
                                        <Nav.Link href={`/cart/${this.props.iduser}`}>
                                            <span className="material-icons">
                                                shopping_cart
                                            </span><Badge style={{ color: "black", backgroundColor: '#FAB629' }}>{this.totalQty()}</Badge>
                                        </Nav.Link>
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
                {/* <Navbar >
                    <Container>
                        <Nav className=" my-2 my-lg-0 " style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link href="/parcel" style={{ display: 'flex' }}><span style={{ paddingLeft: '3px' }} className="material-icons">
                                bolt
                            </span>Parcel</Nav.Link>
                            <Nav.Link href="/product" style={{ display: 'flex' }}><span style={{ paddingRight: '3px' }} className="material-icons">
                                sell
                            </span>Product</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar> */}
            </div>
        );
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        id: authReducer.idstatus,
        username: authReducer.username,
        cart: authReducer.cart,
        iduser: authReducer.id,
        role: authReducer.role
    }
}

export default connect(mapStateToProps, { authLogin, authLogout })(NavbarComp);