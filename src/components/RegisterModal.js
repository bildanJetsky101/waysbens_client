import React, { useState, useContext } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import { useMutation } from 'react-query';
import { UserContext } from '../context/UserContext'
import { API } from '../config/api'
import { useNavigate } from 'react-router';

export default function RegisterModal({show, handleClose}){
    let navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext);
    const [message, setMessage] = useState(null)
    const [formRegister, setFormRegister] = useState({
        name: '',
        email: '',
        password: '',
    })

    const goLoginModal = () => {
        show = false
    }

    const handleChange = (e) => {
        setFormRegister({
            ...formRegister,
          [e.target.name]: e.target.value,
            
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try{
            e.preventDefault()
            const dataUser = {
                name: formRegister.name,
                email: formRegister.email,
                password: formRegister.password,
                is_Admin: true
            }

            console.log(dataUser)

            const config = {
                headers: {
                  'Content-type': 'application/json',
                },
              };

            const body = JSON.stringify(dataUser);

            console.log(body)

            // Insert data user to database
            const response = await API.post('/register', body, config);

            console.log(response.data)
            alert("Success create new profile")
           
            setFormRegister({
                name: '',
                email: '',
                password: '',
              })
            setMessage(null)
            
        } catch(error){
            const alert = (
                <Alert variant='danger' className='py-1' style={{width:'fitContent'}}>
                    Failed
                </Alert>
              )
    
            setMessage(alert)
            console.log(error)
        }
    })


    return(
        <>
        <Modal style={{marginTop:'3rem',}} message={message} show={show} onHide={handleClose} >
            <Form onSubmit={(e) =>handleSubmit.mutate(e)} style={{padding:'2rem'}}>
                <Modal.Title style={styles.modalTitle}>Register</Modal.Title>
                <Form.Group className="mb-3" >
                    <Form.Control name='name' onChange={handleChange} style={styles.form} type="username" placeholder="Username" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Control name='email' onChange={handleChange} style={styles.form} type="email" placeholder="Email" />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Control name='password' onChange={handleChange} style={styles.form} type="password" placeholder="Password" />
                </Form.Group>
                <Button type='submit' style={styles.buttonRegister} onClick={handleClose}>
                    Register
                </Button>
                <div style={styles.questionFooter}>
                    <p>Already Have an Account? Click <span onClick={goLoginModal} style={{cursor:'pointer'}}><b>Here</b></span></p>
                </div>
            </Form>
        </Modal>
        </>
    )
}

const styles = {
    form : {
        border:'2px solid rgba(97, 61, 43, 1)',
        backgroundColor:'rgba(210, 210, 210, 0.25)', 
        height:'50px',
    },
    modalTitle:{
      marginBottom:'30px',
      fontSize:'36px', 
      color:'rgba(97, 61, 43, 1)'
    },
    buttonRegister: {
        width:'100%',
        backgroundColor:"rgba(97, 61, 43, 1)", 
        borderStyle:'none', 
        height:'50px'
    },
    questionFooter: {
        marginTop:'15px', 
        textAlign:'center'
    }
}


