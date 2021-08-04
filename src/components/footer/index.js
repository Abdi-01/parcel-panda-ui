import React from "react";
import IconButton from '@material-ui/core/IconButton'
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import {
  Wrapper,
  LeftHeader,
  FooterContainer,
  ContentContainer,
  IconWrapper,
} from "./Footer";

const FooterComp = () => {
  return (
    <div>
      <FooterContainer>
        <Wrapper>
          <ContentContainer>
            <LeftHeader>2021 © Parcelpanda. All Rights Reserved.</LeftHeader>
            <IconWrapper>
                <IconButton aria-label="instagram">
                    <InstagramIcon style={{fill: "#4c68d7"}}/>
                </IconButton>
                <IconButton aria-label="facebook">
                    <FacebookIcon style={{fill: "#4267B2"}}/>
                </IconButton>
                <IconButton aria-label="twitter">
                    <TwitterIcon style={{fill: "#00acee"}}/>
                </IconButton>
            </IconWrapper>
          </ContentContainer>
        </Wrapper>
      </FooterContainer>
    </div>
  );
};

export default FooterComp;
