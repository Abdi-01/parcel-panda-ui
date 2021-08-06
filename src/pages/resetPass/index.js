import React from 'react';
import { Button, Col, Container, Row, Alert, Spinner } from 'reactstrap';
import forgett1 from '../../asset/img/forgett1.jpg';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import "../resetPass/resetPassPage.css"
import axios from 'axios';
import { URL_API } from '../../helper';
import { toast } from 'react-toastify';

toast.configure()

class ResetPassPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
            newPass: '',
            confirmPass: '',
            alert: false,
            message: '',
            alertType: ''
        }
    }

    forgetPass = () => {
        let email = this.state.email
        let newPass = this.state.newPass
        let confirmPass = this.state.confirmPass
        if (email.includes('@') && email.includes('.com' || '.co.id')) {
            axios.get(URL_API + `/auth/get?email=${email}`)
                .then(res => {
                    if (res.data.length > 0) {
                        if (newPass === confirmPass) {
                            this.setState({ loading: true })
                            axios.patch(URL_API + `/auth/update-pass`, { email: email, password: newPass })
                                .then(res => {
                                    this.setState({ loading: false })
                                    toast.success('Hey 👋 Your account has been updated!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                                    console.log(res.data)
                                }).catch(errPatch => console.log(errPatch))
                        } else {
                            toast.error('Password Invalid!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                        }
                    } else {
                        toast.error('Email Unregistered, Register First!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                    }
                }).catch(err => {
                    console.log(err)
                    toast.error('Reset Password Failed!', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                })
        } else {
            toast.warn('Your Email Invalid', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
        }
    }


    render() {
        return (
            <div>
                <Container>
                    <Row className="mt-5 box">
                        <Col md="6" className="p-0">
                            <img src={forgett1} className="img" alt="forgetpass" />
                        </Col>
                        <Col md="6" className="col2">
                            <h4>Reset Password</h4>
                            <Alert isOpen={this.state.alert} color={this.state.alertType}>
                                {this.state.message}
                            </Alert>
                            <div className="p-field p-fluid input">
                                <label className="p-d-block label">Email</label>
                                <div >
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-envelope" />
                                        <InputText value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                                    </span>
                                </div>
                                <small className="p-d-block username1-help">Enter your Email.</small>
                            </div>
                            <div className="p-field p-fluid input">
                                <label className="p-d-block label">New Password</label>
                                <div>
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-lock" />
                                        <Password value={this.state.newPass} onChange={(e) => this.setState({ newPass: e.target.value })} toggleMask />
                                    </span>
                                </div>
                                <small className="p-d-block username1-help">Enter your password.</small>
                            </div>
                            <div className="p-field p-fluid input">
                                <label className="p-d-block label">Confirm Password</label>
                                <div>
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-lock" />
                                        <Password value={this.state.confirmPass} onChange={(e) => this.setState({ confirmPass: e.target.value })} toggleMask />
                                    </span>
                                </div>
                                <small className="p-d-block username1-help">Confirm your password.</small>
                            </div>
                            <Button onClick={this.forgetPass} className="btncustom2" style={{ background: "#FAB629", color: "black" }} color="warning">
                            {this.state.loading === true ? <Spinner color="secondary" style={{alignItems: 'center'}} /> : <span>Submit</span>}
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ResetPassPage;