import React from "react";
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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

const PasswordBox = () => {
    const [values, setValues] = React.useState({
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

    return (
        <div>
        <PassContainer>
            <PassHeader>
            <h3>Replace Password</h3>
            <div>
                For the security of your account, please do not share your password
                with others.
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
                    <Button variant="contained" color="primary">Confirm</Button>
                </ButtonWrapper>
            </DataWrapper>
        </PassContainer>
        </div>
    );
};

export default PasswordBox;
