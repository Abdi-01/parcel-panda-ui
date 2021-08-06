import React from "react";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
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

const RevenueCard = ({ data, type }) => {
    // console.log("Revenue card data", data,type)
    return (
        <div>
            <Container>
                <Card type={type}>
                    <CardHead>
                        <IconWrapper>
                            {/* <AttachMoneyIcon fontSize="large" style={{fill: "#3f50b5"}}/> */}
                            <AttachMoneyIcon fontSize="large" style={type === 'revenue' ? {fill: "#3f50b5"} : {fill: "#fa8231"}}/>
                        </IconWrapper>
                        <TextHeadWrapper>
                            <TextHeadCategory>{type}</TextHeadCategory>
                            <TextHeaderNumb>{type === 'item' ? "" : "IDR"} {data.filtered === null ? 0 : data.filtered.toLocaleString()}</TextHeaderNumb>
                        </TextHeadWrapper>
                    </CardHead>
                    <hr />
                    <CardFooter>
                        <IconWrapper>
                            <ShowChartIcon />
                        </IconWrapper>
                        <TextFooter>{data.filtered === null ? "Not yet selected" : "Selected date"}</TextFooter>
                    </CardFooter>
                </Card>
                <Card type={type}>
                    <CardHead>
                        <IconWrapper>
                            <LocalAtmIcon fontSize="large" style={type === 'revenue' ? {fill: "#3f50b5"} : {fill: "#fa8231"}}/>
                        </IconWrapper>
                        <TextHeadWrapper>
                            <TextHeadCategory>{type}</TextHeadCategory>
                            <TextHeaderNumb>{type === 'item' ? "" : "IDR"} {data.day === null ? 0 : data.day.toLocaleString()}</TextHeaderNumb>
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
                <Card type={type}>
                    <CardHead>
                        <IconWrapper>
                            <AccountBalanceWalletIcon fontSize="large" style={type === 'revenue' ? {fill: "#3f50b5"} : {fill: "#fa8231"}}/>
                        </IconWrapper>
                        <TextHeadWrapper>
                            <TextHeadCategory>{type}</TextHeadCategory>
                            <TextHeaderNumb>{type === 'item' ? "" : "IDR"} {data.month === null ? 0 : data.month.toLocaleString()}</TextHeaderNumb>
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
                <Card type={type}>
                    <CardHead>
                        <IconWrapper>
                            <AccountBalanceIcon fontSize="large" style={type === 'revenue' ? {fill: "#3f50b5"} : {fill: "#fa8231"}}/>
                        </IconWrapper>
                        <TextHeadWrapper>
                            <TextHeadCategory>{type}</TextHeadCategory>
                            <TextHeaderNumb>{type === 'item' ? "" : "IDR"} {data.total.toLocaleString()}</TextHeaderNumb>
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
            </Container>
        </div>
    );
};

export default RevenueCard;
