import React, { useState } from "react";
import InputIcon from "@material-ui/icons/Input";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { styled } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core/";
import { InputWrapper } from "./dialogActionProductComp";

const Input = styled("input")({
  display: "none",
});

const ActionProduct = ({ open, setOpen, action }) => {
  const [value, setValue] = useState({
    name: null,
    idcategory: null,
    stock: null,
    price: null,
    fileName: "File upload (click on icon left)",
  });

  const handleChangeCategory = (event) => {
    setValue({ ...value, idcategory: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
          {action === "add" ? "Add" : "Edit"} Product
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill every form below, cannot be empty
          </DialogContentText>
          <InputWrapper>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item xs={1}>
                <LocalMallIcon color="primary" />
              </Grid>
              <Grid item xs={11}>
                <TextField autoFocus fullWidth id="name" label="Product name" />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item xs={1}>
                <FastfoodIcon color="primary" />
              </Grid>
              <Grid item xs={11}>
                <InputLabel id="category">Select category</InputLabel>
                <Select
                  labelId="select category"
                  id="select category"
                  value={value.idcategory}
                  onChange={handleChangeCategory}
                  fullWidth
                >
                  <MenuItem value={1}>Food</MenuItem>
                  <MenuItem value={2}>Fruit</MenuItem>
                  <MenuItem value={3}>Drink</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item xs={1}>
                <InputIcon color="primary" />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  id="stock"
                  type="number"
                  label="Initial stock"
                  InputProps={{
                    inputProps: {
                      max: 100,
                      min: 0,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <LocalOfferIcon color="primary" />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  id="price"
                  type="number"
                  label="Product price (IDR)"
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item xs={1}>
                <label htmlFor="icon-button-file">
                  <Input accept="image/*" id="icon-button-file" type="file" />
                  {/* <IconButton color="primary" aria-label="upload picture" component="span"> */}
                  <PhotoCamera color="primary" cursor="pointer" />
                  {/* </IconButton> */}
                </label>
              </Grid>
              <Grid item xs={11}>
                <TextField
                  disabled
                  fullWidth
                  id="image"
                  label={value.fileName}
                />
              </Grid>
            </Grid>
          </InputWrapper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ActionProduct;
