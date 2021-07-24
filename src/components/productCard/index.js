import React, { useState } from "react";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardMedia,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core/";
import { EditDelete, Footer } from "./productCardComp";
import DialogAlert from "../dialogAlert";
import ActionProduct from "../dialogActionProduct";

const useStyles = makeStyles({
  root: {
    width: 200,
    position: "relative",
    margin: "10px 0",
  },
  media: {
    height: 200,
  },
});

const ProductCard = ({data}) => {
  const classes = useStyles();

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

  // console.log(data)

  return (
    <Card className={classes.root}>
      <div>
        <ActionProduct
          open={openEditProduct}
          setOpen={setOpenEditProduct}
          action={"edit"}
        />
        <DialogAlert open={openAlert} setOpen={setOpenAlert} />
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
        <CardMedia className={classes.media} image={`https://drive.google.com/uc?export=view&id=${data.url}`} title={data.name} />
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
          <Button size="medium" color="primary">
            {data.price}
          </Button>
          <Badge badgeContent={5} color="primary">
            <LocalShippingIcon />
          </Badge>
          <EditDelete aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </EditDelete>
        </Footer>
      </div>
    </Card>
  );
};

export default ProductCard;
