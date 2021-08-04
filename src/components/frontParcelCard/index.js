import React from "react";
import {
  Card,
  Content,
  Face1,
  Face1Heading,
  Face2,
  Face2Heading,
  ImageWrapper,
  Img,
  TextWrapper,
} from "./frontParcelCard";

const FrontParcelCard = ({item}) => {
  return (
    <div>
        <Card>
          <Face1>
              <Content>
                <Face1Heading>{item.title}</Face1Heading>
                <ImageWrapper>
                    <Img src={`https://drive.google.com/uc?export=view&id=${item.url}`} alt="..."/>
                </ImageWrapper>
                <TextWrapper>
                    <Face1Heading>Parcel 0{item.id}</Face1Heading>
                    <Face1Heading>IDR {item.price.toLocaleString()}</Face1Heading>
                </TextWrapper>
              </Content>
          </Face1>
          <Face2>
            {/* <Face2Title>Parcel</Face2Title> */}
            <Face2Heading>0{item.id}</Face2Heading>
          </Face2>
        </Card>
    </div>
  );
};

export default FrontParcelCard;
