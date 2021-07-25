import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Container, CardImg } from 'reactstrap';
import snack from "../../asset/img/snack.jpg";
import review from "../../asset/img/review.png";
import shop from "../../asset/img/shop.png";
import "../service/serviceComp.css"

class ServiceComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="mt-5">
                <Container>
                    <div className="row d-flex">
                        <div className="col-md-4">
                            <Card className="service" style={{border: 'none', boxShadow: 'none'}}>
                                <div className="service1">
                                    <CardContent className="service-content">
                                        <Typography component="h5" variant="h5" className="service-judul">
                                            We Try!
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            we travel around the world and find the best snacks to try.
                                        </Typography>
                                    </CardContent>
                                </div>
                                <CardImg className="service-img"
                                 style={{height: '50%', width: '50%'}}
                                    src={snack}
                                    alt="snack"
                                />
                            </Card>
                        </div>
                        <div className="col-md-4">
                            <Card className="service" style={{border: 'none', boxShadow: 'none'}}>
                                <div className="service1">
                                    <CardContent className="service-content">
                                        <Typography component="h5" variant="h5" className="service-judul">
                                            We Review!
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            we give very honest review for the snacks
                                        </Typography>
                                    </CardContent>
                                </div>
                                <CardImg
                                    className="service-img"
                                    style={{height: '50%', width: '50%'}}
                                    src={review}
                                    alt="review"
                                />
                            </Card>
                        </div>
                        <div className="col-md-4">
                            <Card className="service" style={{border: 'none', boxShadow: 'none'}}>
                                <div className="service1">
                                    <CardContent className="service-content">
                                        <Typography component="h5" variant="h5" className="service-judul">
                                            We Sell!
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            we sell you only the ones that we have approved! so no worry!
                                        </Typography>
                                    </CardContent>
                                </div>
                                <CardImg
                                    className="service-img"
                                    style={{height: '50%', width: '50%'}}
                                    src={shop}
                                    alt="shop"
                                />
                            </Card>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default ServiceComp;