import React, { useState, useContext } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import { useMutation } from 'react-query';
import { UserContext } from '../../context/UserContext'
import { API } from '../../config/api'

export default function ProfileModal({show, handleClose}){

    const [state, dispatch] = useContext(UserContext);
    const [message, setMessage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [formProfile, setFormProfile] = useState({
        address: '',
        gender: '',
        phone: '',
        image: '',
    })

    const handleChange = (e) => {
        setFormProfile({
            ...formProfile,
          [e.target.name]:
          e.target.type === "file" ? e.target.files : e.target.value,
        
            
        });
        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    console.log(formProfile)

    const handleSubmit = useMutation(async (e) => {
        try{
            e.preventDefault()


            console.log(formProfile)

            const formData = new FormData();
            formData.set("image",formProfile?.image[0],formProfile?.image[0]?.name);
            formData.set("address",formProfile?.address);
            formData.set("phone",formProfile?.phone);
            formData.set("gender",formProfile?.gender);
    
            console.log(formData);
            // Configuration
            const config = {
                headers: {
                "Content-type": "multipart/form-data",
                },
            };

            // Insert data user to database
           const response = await API.post('/add-profile', formData, config);

            console.log(response.data)

            setFormProfile({
                address: '',
                phone: '',
                gender: '',
              })

            const alert = (
                <Alert variant='danger' className='py-1' style={{width:'fitContent'}}>
                    Success add profile
                </Alert>
              )
            setMessage(alert)

            setFormProfile({
                address: '',
                phone: '',
                gender: '',
              })
            setMessage(null)
            setPreview(null)

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
        <Modal style={styles.modal} message={message} show={show} onHide={handleClose} >
            <div style={{ display:'flex', backgroundColor:"white", width:"60rem", marginLeft:"-16rem", borderRadius:"5px"}}>
            <Form onSubmit={(e) =>handleSubmit.mutate(e)} style={{padding:'2rem', width:"67%"}}>
                <Modal.Title style={styles.modalTitle}>Add Profile</Modal.Title>
                <Form.Group className="mb-3" >
                    <Form.Control name='address' onChange={handleChange} style={styles.formAddress} as="textarea" rows={4} placeholder="Address" />
                </Form.Group>
                <Form.Group className="mb-3" style={{ color:'rgba(97, 61, 43, 1)'}} >
                    <h5>Gender</h5>
                    <div className="mb-3">
                    <Form.Check
                        inline
                        label="Male"
                        name="gender"
                        value="Male"
                        type="radio"
                        id={`inline-radio-1`}
                        onChange={handleChange}
                    />
                    <Form.Check
                        inline
                        label="Female"
                        name="gender"
                        type='radio'
                        value="Female"
                        id={`inline-radio-2`}
                        onChange={handleChange}
                    />
                    </div>
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Control name='phone' onChange={handleChange} style={styles.form} type="number" placeholder="Phone(+62)" />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control name='image' onChange={handleChange} style={styles.formImage} type="file" />
                </Form.Group>
                <Button type='submit' style={styles.buttonProfile} onClick={handleClose}>
                    Add
                </Button>
            </Form>
            <div style={styles.imgBox}>
            {preview && (
                <div>
                    <img
                    src={preview}
                    style={{
                        hidth: "280px",
                        height: "370px",
                        objectFit: "cover",
                    }}
                    alt={preview}
                    />
                </div>
                )}
            </div>
           
            </div>
        </Modal>
        </>
    )
}

const styles = {
    modal: {
        marginTop:'3rem',
        display:'flex',
        justifyContent:'center',
    },
    form : {
        border:'2px solid rgba(97, 61, 43, 1)',
        backgroundColor:'rgba(210, 210, 210, 0.25)', 
        height:'50px',
    },
    formAddress : {
        border:'2px solid rgba(97, 61, 43, 1)',
        backgroundColor:'rgba(210, 210, 210, 0.25)', 
    },
    formImage : {
        border:'2px solid rgba(97, 61, 43, 1)',
        backgroundColor:'rgba(210, 210, 210, 0.25)', 
    },
    modalTitle:{
      marginBottom:'30px',
      fontSize:'36px',  
      color:'rgba(97, 61, 43, 1)'
    },
    buttonProfile: {
        width:'100%',
        backgroundColor:"rgba(97, 61, 43, 1)", 
        borderStyle:'none', 
        height:'50px'
    },
    imgBox: {
        width:"280px",
        height:"370px",
        backgroundColor:"grey",
        margin:"auto",
        borderRadius:"5px",
        marginTop:'115px',
        marginRight:'30px'
    }
}


