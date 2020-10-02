import React, { useState } from 'react'
import Modal from 'react-modal'
import "./OtpModal.css"
import CancelIcon from "@material-ui/icons/Cancel";
import { Button, IconButton } from "@material-ui/core";
import AutorenewIcon from '@material-ui/icons/Autorenew';

function OtpModal({ isOpen, close, element }) {
    const [input, setInput] = useState('');
    return (
        <Modal
            isOpen={isOpen}
            className={"Modal"}
            overlayClassName={"Overlay"}
            appElement={element}
            parentSelector={() => document.querySelector("#register_base")}
        >
            <div className="modal__body">
                <div className="close__button">
                    <IconButton className="icon_button" onClick={() => {
                        close();
                    }}>
                        <CancelIcon />
                    </IconButton>
                </div>

                <div className="modal__input">
                    <input type="text" name="otp" placeholder="otp" />
                </div>

                <div className="modal__footer">
                    <div className="send__button">
                        <Button className="otp_verify">Verify</Button>
                    </div>
                    <div className="otp__resend">
                        <IconButton className="resend__button">
                            <AutorenewIcon className="resend__icon"/>
                        </IconButton>
                    </div>
                </div>

            </div>
        </Modal>

    )
}

export default OtpModal
