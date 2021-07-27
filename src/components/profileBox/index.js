import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import axios from 'axios';
import { URL_API } from '../../helper'
import picture_profile from "../../asset/img/profile-user.png";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";
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
import { getProfile } from '../../actions';

const ProfileBox = () => {
    const [openDialogFullname, setOpenDialogFullname] = useState(false);
    const [openDialogGender, setOpenDialogGender] = useState(false);
    const [openDialogVerify, setOpenDialogVerify] = useState(false);
    const [imageLoading, setImageLoading] = useState(false)
    const dispatch = useDispatch()

    const editFullname = () => {
      setOpenDialogFullname(true);
    };

    const editGender = () => {
      setOpenDialogGender(true);
    };

    const verifyAccount = () => {
      setOpenDialogVerify(true);
    };

    const handleImageUpload = async (event) => {
      try {
        setImageLoading(true)
        var formData = new FormData()
        formData.append('images', event.target.files[0])
        let token = localStorage.getItem("tkn_id")
        console.log("formdata", [...formData])
        console.log("images", event.target.files[0])
        let config = {
          method: 'patch',
          url: URL_API + '/profile/update-photo',
          data: formData,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        let response = await axios(config)
        dispatch(getProfile(token))
        handleNotify(response.status, response.data.message)
        setImageLoading(false)
      } catch (error) {
        console.log(error)
        handleNotify(400, "Can't update photo")
        setImageLoading(false)
      }
    }

    const handleNotify = (status, message) => {
      if (status === 200) {
          toast.success(`Success, ${message} !`, {
              position: toast.POSITION.TOP_CENTER, autoClose: 3000
          });
      } else {
          toast.error(`Error, ${message} !`, {
              position: toast.POSITION.TOP_CENTER, autoClose: 3000
          });
      }
    }

    const { profile } = useSelector(({ authReducer }) => {
      return {
        profile: authReducer.profile
      }
    })

    useEffect(() => {
  
    }, [imageLoading])

    // console.log(profile)

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
                    invisible={imageLoading}
                    badgeContent={
                      <label htmlFor="icon-button-file">
                        <Input 
                          accept="image/*" 
                          id="icon-button-file"
                          type="file" 
                          onChange={handleImageUpload}
                        />
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
                    <LargeAvatar 
                      alt="profile" 
                      src={profile.url_photo === null ? picture_profile : `${URL_API}/static/images/${profile.url_photo}`}
                      loading={imageLoading}
                    />
                    <SyncLoader 
                      color={'#FAB629'} 
                      loading={imageLoading} 
                      size={10} 
                    />
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
        </div>
    )
}

export default ProfileBox
