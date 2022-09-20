import { Modal, Alert } from "react-bootstrap";
import React from 'react';

export default function Payment ({show, handleClose}){
    return(
        <Modal show={show} onHide={handleClose} style={styles.modal}>
            <p style={styles.text}>Thank you for ordering, please wait to verify your order</p>
        </Modal>
    )
}

const styles = {
    modal: {
        borderRadius:'2px', 
        paddingTop:'20px', 
        borderStyle:'none'
    },
    text: {
        margin:'auto', 
        color:'rgba(70, 159, 116, 1)', 
        paddingTop:'35px', 
        paddingBottom:'35px'
    }
}