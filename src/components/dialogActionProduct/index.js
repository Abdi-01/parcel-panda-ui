import React, { useState, useEffect } from "react";
import axios from "axios";
import InputIcon from "@material-ui/icons/Input";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { toast } from 'react-toastify';
import { URL_API } from "../../helper";
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

toast.configure()
const ActionProduct = ({ open, setOpen, action, data, getProductData }) => {
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    id: null,
    name: null,
    idcategory: null,
    stock: null,
    price: null,
    fileName: "File upload (click on icon left)",
    fileUpload: null
  });

  const handleClose = () => {
    setOpen(false);
  }

  const handleFile = (event) => {
    // console.log("Files", event.target.files)
    if (event.target.files[0]) {
      setValues({
        ...values,
        fileName: event.target.files[0].name,
        fileUpload: event.target.files[0]
      })
    }
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      let token = localStorage.getItem("tkn_id")
      if (action === "add") {
        let fd = new FormData()
        let tmpAdd = {
          // id: values.id,
          name: values.name,
          idcategory: values.idcategory,
          stock: values.stock,
          price: values.price,
        }
        fd.append('data', JSON.stringify(tmpAdd))
        fd.append('images', values.fileUpload)
        let config = {
          method: 'post',
          url: URL_API + '/product-manage/add-product',
          data: fd,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        let response = await axios(config)
        // getProductData()
        setLoading(false)
        setOpen(false)
        setValues({
          // ...values,
          id: null,
          name: null,
          idcategory: null,
          stock: null,
          price: null,
          fileName: "File upload (click on icon left)",
        })
        toast.success(`Success, ${response.data.message} !`, {
          position: toast.POSITION.TOP_CENTER, autoClose: 3000
        });
      } else {
        let fd = new FormData()
        let tmp = {
          id: values.id,
          name: values.name,
          idcategory: values.idcategory,
          stock: values.stock,
          price: values.price,
        }
        fd.append('data', JSON.stringify(tmp))
        fd.append('images', values.fileUpload)
        let config = {
          method: 'patch',
          url: URL_API + '/product-manage/edit-product',
          data: fd,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        let response = await axios(config)
        getProductData()
        setLoading(false)
        setOpen(false)
        setValues({
          ...values,
          id: null,
          name: null,
          idcategory: null,
          stock: null,
          price: null,
          fileName: "File upload (click on icon left)",
        })
        toast.success(`Success, ${response.data.message} !`, {
          position: toast.POSITION.TOP_CENTER, autoClose: 3000
        });
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      setOpen(false)
      toast.error(`Error, can't edit product !`, {
        position: toast.POSITION.TOP_CENTER, autoClose: 3000
      });
    }
  }

  useEffect(() => {
    if (data) {
      setValues(values => ({
        ...values,
        id: data.id,
        name: data.name,
        idcategory: data.idcategory,
        stock: data.stock,
        price: data.price,
      }))
    }
  }, [data])

  // console.log(data)

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
                <TextField
                  fullWidth
                  value={action === "add" ? null : values.name}
                  id="name"
                  label="Product name"
                  onChange={(event) =>
                    setValues({ ...values, name: event.target.value })
                  }
                />
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
                  value={values.idcategory}
                  onChange={(event) =>
                    setValues({ ...values, idcategory: event.target.value })
                  }
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
                  value={action === "add" ? null : values.stock}
                  onChange={(event) =>
                    setValues({ ...values, stock: event.target.value })
                  }
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
                  value={action === "add" ? null : values.price}
                  onChange={(event) =>
                    setValues({ ...values, price: event.target.value })
                  }
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
                  <Input accept="image/*" id="icon-button-file" type="file" onChange={handleFile} />
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
                  label={values.fileName}
                />
              </Grid>
            </Grid>
          </InputWrapper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {loading ? "Loading..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ActionProduct;
