import React from 'react'
import { URL_API } from '../../helper';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { ViewImage } from './dialogImage';

const DialogImagePayment = ({ openImage, setOpenImage, imageURL }) => {

    const handleClose = () => {
        setOpenImage(false);
    };

    // console.log("Dialog", imageURL)

    return (
        <div>
            <Dialog
                open={openImage}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <ViewImage src={`${URL_API}/static/images/${imageURL}`} alt="payment"/>
                    {/* <img src={`${URL_API}/static/images/${imageURL}`} alt="payment"/> */}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DialogImagePayment
