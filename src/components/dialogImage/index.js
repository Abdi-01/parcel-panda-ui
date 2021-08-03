import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { URL_API } from '../../helper';
import { ViewImage, ViewAltImage } from './dialogImage';

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
                    <ViewImage data={`${URL_API}/static/transaction/${imageURL}`} type="image/jpg">
                        <ViewAltImage src={`${URL_API}/static/transaction/unpaid.jpg`} alt="payment"/>
                    </ViewImage>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DialogImagePayment
