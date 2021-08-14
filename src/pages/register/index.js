import React from 'react';
import { Button, Col, Container, Row, Spinner } from 'reactstrap';
import regis1 from '../../asset/img/regis1.jpg';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import "../register/registerPage.css"
import axios from 'axios';
import { URL_API } from "../../helper"
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

toast.configure()
class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            pass: '',
            email: '',
            fullname: '',
            username: '',
            alert: false,
            message: '',
            alertType: ''
        }
    }

    onBtRegis = () => {
        let username = this.state.username
        let fullname = this.state.fullname
        let email = this.state.email
        let password = this.state.pass
        console.log(password)
        if (username === '' || fullname === '' || email === '' || password === '') {
            toast.error('Complete all the form!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
        } else {
            if (username.length >= 6) {
                if (email.includes('@') && email.includes('.com' || '.co.id')) {
                    if (password.length >= 6 && password.match(/[a-z]/ig) && password.match(/[0-9]/ig)) {
                        axios.get(URL_API + `/auth/get?username=${username}`)
                            .then(resUname => {
                                if (resUname.data.length > 0) {
                                    toast.warn('Username Unavailable!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                } else {
                                    axios.get(URL_API + `/auth/get?email=${email}`)
                                        .then(res => {
                                            if (res.data.length > 0) {
                                                toast.warn('Email has been registered!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                            } else {
                                                this.setState({ loading: true })
                                                axios.post(URL_API + `/auth/regis`, { username, fullname, email, password })
                                                    .then(res => {
                                                        this.setState({ loading: false })
                                                        toast.success('Hey 👋 Registration Success, Please check your Email!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                                        this.props.history.push('/')
                                                        console.log(res.data)
                                                    }).catch(err => console.log("Error Register", err))
                                            }
                                        }).catch(error => {
                                            console.log(error)
                                            this.setState({ loading: false })
                                        })
                                }
                            }).catch(errUname => console.log(errUname))
                    } else {
                        toast.warn('Password must contains min. 6 digit alphabet AND numberic', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                    }
                } else {
                    toast.warn('Your Email Invalid', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                }
            } else {
                toast.warn('Username must contains min. 6 digit alphabet OR numberic', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
            }

        }
    }
    render() {
        return (
            <div>
                <Container>
                    <Row className="mt-5 box">
                        <Col md="6" className="p-0">
                            <img className="img" src={regis1} alt="register" />
                        </Col>
                        <Col md="6" className="col2">
                            <h4>Get Started.</h4>
                            <div className="p-field p-fluid input">
                                <div>
                                    <label className="p-d-block label">Username</label>
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-user" />
                                        <InputText value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} />
                                    </span>
                                    <small className="p-d-block username1-help">Username must be more than or equal to 6 letters or numbers.</small>
                                </div>
                            </div>
                            <div className="p-field p-fluid input">
                                <label className="p-d-block label">Full Name</label>
                                <div>
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-user" />
                                        <InputText value={this.state.fullname} onChange={(e) => this.setState({ fullname: e.target.value })} />
                                    </span>
                                </div>
                                <small className="p-d-block username1-help">Enter your Full Name.</small>
                            </div>
                            <div className="p-field p-fluid input">
                                <label className="p-d-block label">Email</label>
                                <div>
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-envelope" />
                                        <InputText value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                                    </span>
                                </div>
                                <small className="p-d-block username1-help">Enter your Email.</small>
                            </div>
                            <div className="p-field p-fluid input">
                                <label className="p-d-block label">Password</label>
                                <div>
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-lock" />
                                        <Password value={this.state.pass} onChange={(e) => this.setState({ pass: e.target.value })} toggleMask />
                                    </span>
                                </div>
                                <small className="p-d-block username1-help">Password must contain more than or equal to 6 digits letters and numbers.</small>
                            </div>
                            <Button onClick={this.onBtRegis} className="btncustom1" color="warning" style={{ background: "#FAB629", color: "black" }}>
                                {this.state.loading === true ? <Spinner color="secondary" style={{ alignItems: 'center' }} /> : <span>Sign Up</span>}
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default withRouter(RegisterPage);