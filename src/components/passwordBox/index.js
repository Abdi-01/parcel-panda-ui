import React, { useState, useEffect } from "react";
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import {
    Button,
    FilledInput,
    FormControl,
    InputAdornment,
    InputLabel,
} from "@material-ui/core/";
import {
    ButtonWrapper,
    DataWrapper,
    PassContainer,
    PassHeader,
} from "./passwordBoxComp";
import { URL_API } from "../../helper";
import axios from "axios";

// toast.configure();

const PasswordBox = () => {
    const [values, setValues] = useState({
        amount: '',
        password: '',
        newPassword: '',
        confirmPassword: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
    });
    const [loading, setLoading] = useState(false)

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    
    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleClickShowNewPassword = () => {
        setValues({...values, showNewPassword: !values.showNewPassword});
    };

    const handleClickShowConfirmPassword = () => {
        setValues({...values, showConfirmPassword: !values.showConfirmPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSavePassword = async () => {
        try {
            setLoading(true)
            let token = localStorage.getItem("tkn_id");
            let config = {
              method: 'patch',
              url: URL_API + '/profile/update-password',
              data: {
                "password": values.password,
                "confirmPassword": values.confirmPassword
              },
              headers: {
                  Authorization: `Bearer ${token}`
              }
            }
            let response = await axios(config)
            console.log("Response => ", response)
            setLoading(false)
            handleNotify(response.status, response.data.message)
        } catch (error) {
            console.log("Error => ", error)
            setLoading(false)
            handleNotify(400, "error update password")
            alert("error update password")
        }
    }

    const handleNotify = (status, message) => {
        console.log("handle notify", status, message)
        if (status === 200) {
            toast.success(`Hey 👋, ${message}`);
        } else {
            toast.error(`Hey 👋, ${message}`);
        }
    };

    useEffect(() => {
        toast.success(`Hey 👋, trial`);
    }, [])

    return (
        <div>
            <PassContainer>
                <PassHeader>
                <h3>Replace Password</h3>
                <div>
                    For the security of your account, please do not share your password with others.
                </div>
                </PassHeader>
                <DataWrapper>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="password">
                            Password
                        </InputLabel>
                        <FilledInput
                            id="password"
                            type={values.showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange("password")}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="newPassword">
                            New Password
                        </InputLabel>
                        <FilledInput 
                            error={values.newPassword !== values.confirmPassword}
                            id="newPassword"
                            type={values.showNewPassword ? "text" : "password"}
                            value={values.newPassword}
                            onChange={handleChange("newPassword")}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowNewPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showNewPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="confirmPassword">
                            Password Confirmation
                        </InputLabel>
                        <FilledInput
                            error={values.newPassword !== values.confirmPassword}
                            id="confirmPassword"
                            type={values.showConfirmPassword ? "text" : "password"}
                            value={values.confirmPassword}
                            onChange={handleChange("confirmPassword")}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <ButtonWrapper>
                        <Button 
                            disabled={values.password.length < 1 || values.newPassword.length < 1 || values.confirmPassword.length < 1 || (values.newPassword !== values.confirmPassword)}
                            variant="contained" 
                            color="primary"
                            onClick={handleSavePassword}
                            >
                                {loading ? "Loading..." : "Save"}
                        </Button>
                    </ButtonWrapper>
                </DataWrapper>
            </PassContainer>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default PasswordBox;
