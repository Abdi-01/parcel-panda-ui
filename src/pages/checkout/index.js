import React from 'react';
import { Button, Container, Modal, ModalBody, ModalHeader, Table } from 'reactstrap';
import { Link } from "react-router-dom";
import truck from "../../asset/img/truck.png"
import { connect } from 'react-redux';
import {getProfile} from "../../actions"
import axios from 'axios';
import { URL_API } from '../../helper';
class CheckoutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: null,
            isOpen: false,
            modal: false,
        }
    }
    
    getAddress = () => {
        let profile = this.props.profile
        return profile.address.map((item, index) => {
            if (this.state.selectedIndex === index) {
                return (
                    <p style={{ fontSize: '14px', lineHeight: '20px', width: '385px' }}>
                        <span style={{ fontWeight: 'bold' }}>{item.recipient_name}, </span>
                        <span>{item.address} <span>{item.postal_code}</span></span>
                        <br /><span>{item.phone_number}</span>
                    </p>
                )
            }
        })
    }

    handleOtherAddress = () => {
        let profile = this.props.profile
        return profile.address.map((item, index) => {
            return (
                <div style={{ border: '1px solid #FAB629', padding: '15px 15px 15px 15px', borderRadius: '10px', marginTop: '5px' }}>
                    <h4 style={{ fontSize: '12px', letterSpacing: '1px', lineHeight: '16px', color: '#8C8582' }}>MY ADDRESS</h4>
                    <p style={{ fontSize: '14px', lineHeight: '20px', width: '385px' }}>
                        <span style={{ fontWeight: 'bold' }}>{item.recipient_name}, </span>
                        <span>{item.address} <span>{item.postal_code}</span></span>
                        <br /><span>{item.phone_number}</span>
                    </p>
                    <div style={{ borderTop: '1px dashed #DDDDDD', paddingTop: '10px' }}>
                        <Button onClick={() => this.setState({ selectedIndex: index })} outline color="warning">Select</Button>
                    </div>
                </div>
            )
        })
    }

    render() {
        console.log(this.props.profile.address)
        return (
            <div>
                <Container>
                    <div style={{ borderBottom: "1px solid #E5E5E5", borderTop: "1px solid #E5E5E5", height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h2 style={{ fontSize: '24px', letterSpacing: '2px', lineHeight: '17px', }}>CONFIRMATION</h2>
                    </div>
                    {/* MODAL ALAMAT */}
                    <Modal isOpen={this.state.modal} toggle={() => { this.setState({ modal: !this.state.modal }) }}>
                        <ModalBody>
                            <Container>
                                <div>
                                    <h4 style={{ fontSize: '14px', letterSpacing: '1.5px', lineHeight: '18px' }}>PILIH ALAMAT</h4>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p style={{ fontSize: '14px', lineHeight: '18px', color: '#8C8582' }}>
                                        alamat tersimpan</p>
                                    <Link style={{ fontSize: '14px', lineHeight: '18px', color: '#FAB629', textDecoration: 'none' }}>+Tambah Alamat</Link>
                                </div>
                                {this.handleOtherAddress()}
                            </Container>
                        </ModalBody>
                    </Modal>

                    <div className="row f-flex">
                        {/* ALAMAT */}
                        <div className="col-md-9">
                            <div className="mt-5" style={{ border: '1px solid #DDDDDD', borderRadius: '10px', margin: '0 0 20px 0', padding: '15px 15px 15px 15px', }}>
                                <div style={{ height: '40px' }}>
                                    <h2 style={{ fontSize: '14px', letterSpacing: '2px', }}>ALAMAT PENGIRIMAN</h2>
                                </div>
                                <div style={{ height: '28px', display: 'flex', justifyContent: 'space-between' }}>
                                    <p style={{ fontSize: '12px', letterSpacing: '1px', lineHeight: '16px', color: '#8C8582' }}>MY ADDRESS</p>
                                    <Button outline color="warning" size="sm" onClick={() => {
                                        this.setState({ modal: !this.state.modal });
                                    }}>Pilih alamat lainnya</Button>
                                </div>
                                <div style={{ borderBottom: '1px dashed #DDDDDD', paddingTop: '8px' }}>
                                    {this.getAddress()}
                                </div>
                                <div style={{ paddingTop: '8px' }}>
                                    <Link style={{ textDecoration: 'none solid rgb(34, 34, 34)', fontSize: '14px', color: 'black', fontWeight: 'bold' }}>
                                        Tambah alamat baru
                                    </Link>
                                </div>
                            </div>
                            {/* METODE PENGIRIMAN */}
                            <div className="mt-5" style={{ border: '1px solid #DDDDDD', borderRadius: '10px', margin: '0 0 20px 0', padding: '15px 15px 15px 15px', }}>
                                <div style={{ height: '40px' }}>
                                    <h2 style={{ fontSize: '14px', letterSpacing: '2px', }}>METODE PENGIRIMAN</h2>
                                </div>
                                <div style={{ height: '76px', width: '344px', border: '1px solid #FAB629', borderRadius: '10px', display: 'flex', padding: '5px 10px 10px 10px' }}>
                                    <img src={truck} alt="..." width="65px" height="65px" />
                                    <div style={{ paddingLeft: '10px' }}>
                                        <h6 style={{ fontSize: '14px', lineHeight: '20px' }}>
                                            Regular Shipping
                                        </h6>
                                        <p style={{ fontSize: '11px', lineHeight: '17px', }}>
                                            Estimasi Pengiriman: 3-5 hari kerja setelah tanggal konfirmasi pembayaran atau pembayaran sukses.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* RINGKASAN ORDER */}
                            <div className="mt-5" style={{ border: '1px solid #DDDDDD', borderRadius: '10px', margin: '0 0 20px 0', padding: '15px 15px 15px 15px', }}>
                                <div style={{ height: '40px' }}>
                                    <h2 style={{ fontSize: '14px', letterSpacing: '2px', }}>RINGKASAN ORDER</h2>
                                </div>
                                <div>
                                    <Table borderless>
                                        <thead>
                                            <tr style={{ border: '1px solid #DDDDDD' }}>
                                                {/* <th style={{textAlign: 'center'}}>gambar</th> */}
                                                <th style={{ fontSize: '16px', letterSpacing: '1px', lineHeight: '20px', textAlign: 'center' }}></th>
                                                <th style={{ fontSize: '16px', letterSpacing: '1px', lineHeight: '20px', textAlign: 'center' }}></th>
                                                <th style={{ fontSize: '16px', letterSpacing: '1px', lineHeight: '20px', textAlign: 'center' }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {this.getDataCart()} */}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-3 mt-5">
                            <div style={{ border: '1px solid #DDDDDD', margin: '0 0 20px 0', padding: '15px 15px 15px 15px', borderRadius: '10px' }}>
                                <h4 style={{ fontSize: '16px', letterSpacing: '1px', lineHeight: '20px' }}>ORDER</h4>
                                <div style={{ display: 'flex', borderBottom: '1px dashed #DDDDDD', justifyContent: 'space-between' }}>
                                    <h6 style={{ fontSize: '14px', lineHeight: '20px', textAlign: 'left' }}>Total Parcel(s)</h6>

                                    <h6 style={{ fontSize: '14px', lineHeight: '20px', textAlign: 'right', fontWeight: 'bold', }}></h6>
                                </div>
                                <div style={{ borderBottom: '1px dashed #DDDDDD', paddingTop: '8px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <h6 style={{ fontSize: '14px', lineHeight: '20px', textAlign: 'left' }}>Subtotal</h6>
                                        <h6 style={{ fontSize: '14px', lineHeight: '20px', textAlign: 'right', fontWeight: 'bold', }}>Rp.</h6>
                                    </div>
                                    <p style={{ fontSize: '10px', fontStyle: 'italic' }}><span style={{ fontWeight: 'bold' }}>Tanpa biaya tambahan</span> <span>(belum termasuk ongkir)</span></p>
                                </div>
                                <div style={{ paddingTop: '10px' }}>
                                    <Link className="btn btn-warning btn-block" style={{ fontSize: '13px', letterSpacing: '2px', lineHeight: '18px', }}>
                                        PROCEED TO CHECKOUT
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        id: authReducer.id,
        profile: authReducer.profile
    }
}

export default connect(mapStateToProps, {getProfile})(CheckoutPage);