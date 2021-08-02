import React, { useState } from "react";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DialogAlert from "../dialogAlert";
import ActionProduct from "../dialogActionProduct";
import {
  Badge,
  Button,
  CardContent,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@material-ui/core/";
import { 
  EditDelete, 
  Footer, 
  StyledCard, 
  StyledCardMedia 
} from "./productCardComp";
import { URL_API } from "../../helper";

const ProductCard = ({data, getProductData}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handleClickOpenAlert = () => {
    setOpenAlert(true);
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickOpenEdit = () => {
    setOpenEditProduct(true);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledCard>
      <div>
        <ActionProduct
          open={openEditProduct}
          setOpen={setOpenEditProduct}
          action={"edit"}
          data={data}
          getProductData={getProductData}
        />
        <DialogAlert open={openAlert} setOpen={setOpenAlert} id={data.id} getProductData={getProductData}/>
        <Menu
          id="sub-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClickOpenEdit}>Edit</MenuItem>
          <MenuItem onClick={handleClickOpenAlert}>Delete</MenuItem>
        </Menu>
        <StyledCardMedia image={`${URL_API}/static/images/${data.url}`} title={data.name} />
        <CardContent>
          <Typography gutterBottom variant="body1">
            {data.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.category}
          </Typography>
        </CardContent>
      </div>
      <div>
        <Footer>
          <Tooltip title="Price" placement="top">
            <Button size="medium" color="primary">
              IDR {data.price.toLocaleString()}
            </Button>
          </Tooltip>
          <Tooltip title="Stock" placement="top">
            <Badge badgeContent={data.stock} color={data.stock > 5 ? "primary" : "secondary"}>
              <LocalShippingIcon />
            </Badge>
          </Tooltip>
          <Tooltip title="Edit or Delete" placement="top">
            <EditDelete aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </EditDelete>
          </Tooltip>
        </Footer>
      </div>
    </StyledCard>
  );
};

export default ProductCard;
