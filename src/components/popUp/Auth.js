import { Modal, Alert } from "react-bootstrap";
import React from 'react';


export default function Auth({show, handleClose}){
    return(
        <Modal show={show} onHide={handleClose} style={styles.modal}>
            <p style={styles.text}>You must login first to add to your cart</p>
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
        color:'rgba(189, 7, 7, 1)', 
        paddingTop:'35px', 
        paddingBottom:'35px'
    }
}