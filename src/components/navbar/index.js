import React from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import logo from "../../asset/img/logo.png"
import { InputText } from 'primereact/inputtext';
import { Modal, ModalBody, Row, Col, FormGroup, Input, Label } from 'reactstrap';
import login1 from "../../asset/img/login1.jpg";
import { Link, NavLink } from "react-router-dom";

class NavbarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false, modal: false }
    }

    printLogin = () => {
        return (
            <div>
                <Modal size="lg" isOpen={this.state.modal} toggle={() => { this.setState({ modal: !this.state.modal }) }}>
                    <ModalBody>
                        <Row className="mt-5 " style={{
                            borderRadius: "15px",
                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                        }} >
                            <Col md="6" className="p-0">
                                <img src={login1} alt={"..."} style={{ objectFit: "fill", borderRadius: "15px 0px 0px 15px", width: "100%", height: "100%" }} />
                            </Col>
                            <Col md="6" >
                                <h6 style={{ marginTop: "5%" }}>
                                    Log in.
                                </h6>
                                <h3>Welcome Back!</h3>
                                <Form>
                                    <FormGroup>
                                        <Label>Username</Label>
                                        <Input type="text" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Password</Label>
                                        <Input type="password" />
                                    </FormGroup>
                                </Form>
                                <h6 style={{ display: "flex", justifyContent: "flex-end" }}>Forgot Password?</h6>
                                <Button color="warning" className="btncustom"
                                    style={{ background: "rgb(254,180,3)", color: "#2E2DA4", width: "100%", borderRadius: "5%" }}>
                                    Login
                                </Button>
                                <p style={{ marginTop: "10%", textAlign: 'center' }}>Don't have an account? <Link to="/regis" style={{ textDecoration: "none", color: 'black' }}><b>Create now.</b></Link></p>
                            </Col>
                        </Row>
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
                            <img src={logo} alt={"..."} width="200px" className="d-inline-block align-top " />
                        </Navbar.Brand>
                        <Nav >
                            <span className="p-input-icon-right">
                                <i className="pi pi-search" />
                                <InputText className="p-inputtext-sm p-d-block p-mb-2" placeholder="Search" />
                            </span>
                        </Nav>
                        <Nav>
                            <div>
                                <h6>8 800 332 65-66 <br></br><span style={{ fontSize: "12px", color: "gray" }}>Support 24/7</span></h6>
                            </div>
                            <Nav.Link onClick={() => {
                                this.setState({ modal: !this.state.modal });
                            }}><span class="material-icons">
                                    person_outline
                                </span></Nav.Link>
                            <Nav.Link><span class="material-icons">
                                favorite_border
                            </span></Nav.Link>
                            <Nav.Link><span class="material-icons">
                                shopping_cart
                            </span></Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <Navbar >
                    <Container>
                        <Navbar.Brand>
                            <Button variant="warning" size="sm" style={{ display: 'flex' }}>
                                <span class="material-icons">
                                    menu
                                </span>
                                SHOP BY CATEGORY</Button>
                        </Navbar.Brand>
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link style={{ display: 'flex' }}>
                                <span class="material-icons" >bolt</span>
                                <NavLink to="/user-profile">Profile</NavLink>
                            </Nav.Link>
                            {/* <Nav.Link style={{ display: 'flex' }}>
                                <span class="material-icons">sell</span>
                                <NavLink to="/product-management">Manage Product</NavLink>
                            </Nav.Link>
                            <Nav.Link style={{ display: 'flex' }}>
                                <span class="material-icons">sell</span>
                                <NavLink to="/transaction-management">Transaction Management</NavLink>
                            </Nav.Link>
                            <Nav.Link style={{ display: 'flex' }}>
                                <span class="material-icons">sell</span>
                                <NavLink to="/sales-report">Sales Report</NavLink>
                            </Nav.Link> */}
                        </Nav>
                        <Nav>
                            <Nav.Link style={{ display: 'flex' }}><span class="material-icons">
                                sync
                            </span>Recently Viewed</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default NavbarComp;