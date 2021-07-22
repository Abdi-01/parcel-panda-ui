import React, { useState } from 'react'
import axios from 'axios';
import { URL_API } from '../../helper'
import picture_profile from "../../asset/img/profile-user.png";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
// import { ToastContainer, toast } from "react-toastify";
// import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { 
    Badge,
    Button, 
    Fab,
    Typography 
} from "@material-ui/core/";
import {
    EditContainer,
    Form,
    Input,
    Label,
    LargeAvatar,
    PictContainer,
    ProfileContainer,
    ProfileHeader,
    ProfileWrapper,
    Status,
    StyledButton,
} from "./profileBoxComp";
import FormDialogProfile from '../dialogFullname';
import FormDialogGender from '../dialogGender';
import FormDialogVerify from '../dialogVerify';
// import { getProfile } from '../../actions';

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

    
    const handleImageUpload = (event) => {
      let formData = new FormData()
      formData.append('images', event.target.files[0])
      axios.post(URL_API + '/profile/update-photo', formData)
        .then(response => {
          console.log(response.data)
        }).catch(error => {
          console.log(error)
        })
      // setImageUpload(URL.createObjectURL(event.target.files[0]))
    }

    const { profile } = useSelector(({ authReducer }) => {
      return {
        profile: authReducer.profile
      }
    })

    return (
        <div>
            <ProfileContainer>
              <ProfileHeader>
                <h3>My Profile</h3>
                <div>
                  Manage your profile information to control, protect and secure your account.
                </div>
              </ProfileHeader>
              <ProfileWrapper>
                <Form>
                  <EditContainer>
                    <Label>Username</Label>
                    <Typography variant="subtitle1">{profile.username}</Typography>
                  </EditContainer>
                  <EditContainer>
                    <Label>Fullname</Label>
                    <Typography variant="subtitle1">
                      {profile.fullname}
                      <StyledButton
                        size="small"
                        color="primary"
                        onClick={editFullname}
                        style={{ textTransform: "lowercase", marginLeft: "5px" }}
                      >
                        update
                      </StyledButton>
                    </Typography>
                  </EditContainer>
                  <EditContainer>
                    <Label>Gender</Label>
                    <Typography variant="subtitle1">{profile.gender}</Typography>
                    <StyledButton
                      size="small"
                      color="primary"
                      onClick={editGender}
                      style={{ textTransform: "lowercase", marginLeft: "5px" }}
                    >
                      update
                    </StyledButton>
                  </EditContainer>
                  <EditContainer>
                    <Label>Email</Label>
                    <Typography variant="subtitle1">
                      {profile.email}
                      { profile.idstatus === 1 ? 
                        <Status> verified</Status> 
                      : 
                        <Button
                          size="small"
                          color="secondary"
                          onClick={verifyAccount}
                          style={{ textTransform: "lowercase", marginLeft: "5px" }}
                        >
                          verify
                        </Button>
                      }
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
                        <Input accept="image/*" id="icon-button-file" type="file" onChange={handleImageUpload}/>
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
                    <LargeAvatar alt="Ido Yudhatama" src={picture_profile} />
                  </Badge>
                </PictContainer>
              </ProfileWrapper>
            </ProfileContainer>
            <FormDialogProfile
                open={openDialogFullname}
                setOpen={setOpenDialogFullname}
                // handleNotify={handleNotify}
                value={profile.fullname}
            />
            <FormDialogGender
                open={openDialogGender}
                setOpen={setOpenDialogGender}
                // handleNotify={handleNotify}
                value={profile.gender}
            />
            <FormDialogVerify
                open={openDialogVerify}
                setOpen={setOpenDialogVerify}
                // handleNotify={handleNotify}
            />
            {/* <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            /> */}
        </div>
    )
}

export default ProfileBox
