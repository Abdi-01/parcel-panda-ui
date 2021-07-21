import React from 'react';
import { Button, Col, Container, Row, Alert } from 'reactstrap';
import regis1 from '../../asset/img/regis1.jpg';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import "../register/registerPage.css"
import axios from 'axios';
import { URL_API } from "../../helper"

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            this.setState({ alert: !this.state.alert, message: "Lengkapi semua form!", alertType: 'danger' })
            setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '', }), 3000)
        } else {
            if (email.includes('@') && email.includes('.com' || '.co.id')) {
                axios.get(URL_API + `/auth/get?email=${email}`)
                    .then(res => {
                        if (res.data.length > 0) {
                            this.setState({ alert: !this.state.alert, message: "Email sudah terdaftar", alertType: 'warning' })
                            setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '' }), 3000)
                            // this.regisUsername.value = null
                            // this.regisEmail.value = null
                            // this.regisFullname.value = null
                        } else {
                            axios.post(URL_API + `/auth/regis`, { username, fullname, email, password })
                                .then(res => {
                                    this.setState({ alert: !this.state.alert, message: "Registrasi akun sukses!", alertType: 'success' })
                                    setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '', }), 3000)
                                    console.log(res.data)
                                    // this.regisUsername.value = null
                                    // this.regisEmail.value = null
                                    // this.regisFullname.value = null
                                }).catch(err => console.log("Error Register", err))
                        }
                    }).catch(error => console.log(error))
            } else {
                this.setState({ alert: !this.state.alert, message: 'Email Anda salah', alertType: 'warning' })
                setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '' }), 3000)
            }
        }
    }
    render() {
        return (
            <div>
                <Container>
                    <Row className="mt-5 box">
                        <Col md="6" className="p-0">
                            <img className="img" alt={"..."} src={regis1} />
                        </Col>
                        <Col md="6" className="col2">
                            <h4>Get Started.</h4>
                            <p className="label">Alredy have an account? <Link className="link">Log in</Link> </p>
                            <br></br>
                            <Alert isOpen={this.state.alert} color={this.state.alertType}>
                                {this.state.message}
                            </Alert>
                            <div className="p-field p-fluid input">
                                <div>
                                    <label className="p-d-block label">Username</label>
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-user" />
                                        <InputText value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} />
                                    </span>
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
                            </div>
                            <div className="p-field p-fluid input">
                                <label className="p-d-block label">Email</label>
                                <div>
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-envelope" />
                                    <InputText value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                                    </span>
                                </div>
                            </div>
                            <div className="p-field p-fluid input">
                                <label className="p-d-block label">Password</label>
                                <div>
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-lock" />
                                    <Password value={this.state.pass} onChange={(e) => this.setState({ pass: e.target.value })} toggleMask />
                                    </span>
                                </div>
                            </div>
                            <Button onClick={this.onBtRegis} className="btncustom1" style={{ background: "#FFC107", color: "white" }}>
                                Sign Up
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default RegisterPage;