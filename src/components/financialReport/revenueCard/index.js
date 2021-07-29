import React from "react";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ShowChartIcon from '@material-ui/icons/ShowChart';
import {
  Card,
  CardFooter,
  CardHead,
  Container,
  IconWrapper,
  TextHeaderNumb,
  TextFooter,
  TextHeadWrapper,
  TextHeadCategory,
} from "./RevenueCard";

const RevenueCard = ({ data }) => {

    return (
        <div>
        <Container>
            <Card>
                <CardHead>
                    <IconWrapper>
                    <AccountBalanceIcon fontSize="large" style={{fill: "#3f50b5"}}/>
                    </IconWrapper>
                    <TextHeadWrapper>
                        <TextHeadCategory>Revenue</TextHeadCategory>
                        <TextHeaderNumb>IDR {data.total.toLocaleString()}</TextHeaderNumb>
                    </TextHeadWrapper>
                </CardHead>
                <hr />
                <CardFooter>
                    <IconWrapper>
                    <ShowChartIcon />
                    </IconWrapper>
                    <TextFooter>All time</TextFooter>
                </CardFooter>
            </Card>
            <Card>
                <CardHead>
                    <IconWrapper>
                    <AccountBalanceIcon fontSize="large" style={{fill: "#3f50b5"}}/>
                    </IconWrapper>
                    <TextHeadWrapper>
                        <TextHeadCategory>Revenue</TextHeadCategory>
                        <TextHeaderNumb>IDR {data.month.toLocaleString()}</TextHeaderNumb>
                    </TextHeadWrapper>
                </CardHead>
                <hr />
                <CardFooter>
                    <IconWrapper>
                    <ShowChartIcon />
                    </IconWrapper>
                    <TextFooter>This month</TextFooter>
                </CardFooter>
            </Card>
            <Card>
                <CardHead>
                    <IconWrapper>
                    <AccountBalanceIcon fontSize="large" style={{fill: "#3f50b5"}}/>
                    </IconWrapper>
                    <TextHeadWrapper>
                        <TextHeadCategory>Revenue</TextHeadCategory>
                        <TextHeaderNumb>IDR {data.day.toLocaleString()}</TextHeaderNumb>
                    </TextHeadWrapper>
                </CardHead>
                <hr />
                <CardFooter>
                    <IconWrapper>
                    <ShowChartIcon />
                    </IconWrapper>
                    <TextFooter>Today</TextFooter>
                </CardFooter>
            </Card>
        </Container>
        </div>
    );
};

export default RevenueCard;
