import React, { useState } from 'react'
import profile from "../../asset/img/profile-user.png";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { ToastContainer, toast } from "react-toastify";
import { 
    Badge,
    Button, 
    Fab,
    Typography 
} from "@material-ui/core/";
import {
    EditContainer,
    Input,
    Label,
    LargeAvatar,
    PictContainer,
    ProfileContainer,
    ProfileHeader,
    ProfileWrapper,
    Form,
    Status,
  } from "./profileBoxComp";
import FormDialogProfile from '../dialogFullname';
import FormDialogGender from '../dialogGender';
import FormDialogVerify from '../dialogVerify';

const ProfileBox = () => {
    const [openDialogFullname, setOpenDialogFullname] = useState(false);
    const [openDialogGender, setOpenDialogGender] = useState(false);
    const [openDialogVerify, setOpenDialogVerify] = useState(false);

    const editFullname = () => {
        setOpenDialogFullname(true);
    };

    const editGender = () => {
        setOpenDialogGender(true);
    };

    const verifyAccount = () => {
        setOpenDialogVerify(true);
    };

    const handleNotify = (subject) => {
        toast.success(`Hey 👋, ${subject} has been updated!`);
    };

    return (
        <div>
            <ProfileContainer>
              <ProfileHeader>
                <h3>My Profile</h3>
                <div>
                  Manage your profile information to control, protect and secure
                  your account
                </div>
              </ProfileHeader>
              <ProfileWrapper>
                <Form>
                  <EditContainer>
                    <Label>Username</Label>
                    <Typography variant="subtitle1">idoyudha</Typography>
                  </EditContainer>
                  <EditContainer>
                    <Label>Fullname</Label>
                    <Typography variant="subtitle1">
                      Ido Yudhatama
                      <Button
                        size="small"
                        color="primary"
                        onClick={editFullname}
                        style={{ textTransform: "lowercase", marginLeft: "5px" }}
                      >
                        update
                      </Button>
                    </Typography>
                  </EditContainer>
                  <EditContainer>
                    <Label>Gender</Label>
                    <Typography variant="subtitle1">Male</Typography>
                    <Button
                      size="small"
                      color="primary"
                      onClick={editGender}
                      style={{ textTransform: "lowercase", marginLeft: "5px" }}
                    >
                      update
                    </Button>
                  </EditContainer>
                  <EditContainer>
                    <Label>Email</Label>
                    <Typography variant="subtitle1">
                      idoyudha@gmail.com<Status> verified</Status>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={verifyAccount}
                        style={{ textTransform: "lowercase", marginLeft: "5px" }}
                      >
                        verify
                      </Button>
                    </Typography>
                  </EditContainer>
                </Form>
                <PictContainer>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent={
                      <label htmlFor="icon-button-file">
                        <Input accept="image/*" id="icon-button-file" type="file" />
                        <Fab
                          size="small"
                          color="primary"
                          aria-label="update photo profile"
                          component="span"
                        >
                          <PhotoCamera />
                        </Fab>
                      </label>
                    }
                  >
                    <LargeAvatar alt="Ido Yudhatama" src={profile} />
                  </Badge>
                </PictContainer>
              </ProfileWrapper>
            </ProfileContainer>
            <FormDialogProfile
                open={openDialogFullname}
                setOpen={setOpenDialogFullname}
                handleNotify={handleNotify}
            />
            <FormDialogGender
                open={openDialogGender}
                setOpen={setOpenDialogGender}
                handleNotify={handleNotify}
            />
            <FormDialogVerify
                open={openDialogVerify}
                setOpen={setOpenDialogVerify}
                handleNotify={handleNotify}
            />
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
    )
}

export default ProfileBox
