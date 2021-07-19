import React from 'react';
import { Button, Col, Container, Row, Alert } from 'reactstrap';
import otp1 from '../../asset/img/otp1.jpg';
import { InputText } from 'primereact/inputtext';
import "../verification/verificationPage.css"
import axios from 'axios';
import { URL_API } from '../../helper';

class VerificationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: '',
            alert: false
        }
    }

    verify = () => {
        let code = this.state.otp
        let headers = {
            headers: {
                'Authorization': `Bearer ${this.props.location.pathname.split('/')[2]}`
            }
        }
        console.log("OTP", code)
        console.log(headers)
        axios.patch(URL_API + `/auth/verify`, {
            otp: code
        }, headers)
            .then(res => {
                console.log(res.data)
                this.setState({ alert: !this.state.alert })
                setTimeout(() => this.setState({ alert: !this.state.alert }), 3000)
            }).catch(err => {
                console.log(err)
            })
    }
    render() {
        console.log(this.props.location.pathname.split('/')[2])
        return (
            <div>
                <Container>
                    <Row className="mt-5 box">
                        <Col md="6" className="p-0">
                            <img className="img" src={otp1} />
                        </Col>
                        <Col md="6" className="col2">
                            <h6>Forgot Password</h6>
                            <h4>Account Verification!</h4>
                            <Alert isOpen={this.state.alert} color="success">
                                Verification Succes!
                            </Alert>
                            <br></br>
                            <div className="p-field p-fluid input">
                                <label className="p-d-block label">Verification Code</label>
                                <div>
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-google" />
                                        <InputText value={this.state.otp} onChange={(e) => this.setState({ otp: e.target.value })} />
                                    </span>
                                </div>
                            </div>

                            <Button onClick={() => this.verify()} style={{background: '#FFC107'}} className="btncustom3">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default VerificationPage;