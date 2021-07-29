import React from "react";
import {
  Button,
  CardContent,
  Menu,
  Typography,
} from "@material-ui/core/";
import { 
  Footer, 
  StyledCard, 
  StyledCardMedia 
} from "./parcelCardComp";

const ParcelCard = ({item}) => {
  console.log(item)
  return (
    <StyledCard>
      <div>
        <Menu
          id="sub-menu"
          keepMounted
        >
        </Menu>
        <StyledCardMedia image={`https://drive.google.com/uc?export=view&id=${item.url}`} title={item.name} />
        <CardContent>
          <Typography gutterBottom variant="body1">
            Parcel {item.id}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.title}
          </Typography>
        </CardContent>
      </div>
      <div>
        <Footer>
          <Button size="medium" color="primary">
            IDR {item.price.toLocaleString()}
          </Button>
        </Footer>
      </div>
    </StyledCard>
  );
};

export default ParcelCard;
