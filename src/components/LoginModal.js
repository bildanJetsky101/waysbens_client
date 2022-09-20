import { useContext, useState } from "react";
import { Modal, Form, Button, Alert } from 'react-bootstrap'
import { UserContext } from "../context/UserContext";
import { API } from '../config/api'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query';


export default function LoginModal({show, handleClose}) {

    let navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext)
    const [message, setMessage] = useState(null)
    const [formLogin, setFormLogin] = useState({
        email:'',
        password:''
    })

    let { data: getUser, } = useQuery("user", async () => {
        const response = await API.get("/get-user");
        return response.data.data;
      }); 


    const handleChange = (e) => {
        setFormLogin({
            ...formLogin,
          [e.target.name]: e.target.value,
            
        });
    };

    const goRegisterModal = () => {
        show = false
    }

    const handleSubmit = useMutation (async (e) => {
        try{ 
            e.preventDefault()

           

            const dataUser = {
                email: formLogin.email,
                password: formLogin.password
            }
       
            const config = {
                headers: {
                  'Content-type': 'application/json',
                },
              };

            const body = JSON.stringify(dataUser);

            console.log(body)
            // Insert data user to database
            const response = await API.post('/login', body, config);

            let status = response.data.data.is_Admin

            if (response?.status === 200) {
                dispatch({
                  type: 'LOGIN_SUCCESS',
                  userStat: status,
                  payload: response.data.data,
                })
            console.log(getUser.profile)
                if(!getUser?.profile.address){
                    navigate('/profile')
                }
              }
              
        } catch(error) {
            setFormLogin({
                email:'',
                password:''
            })
            const alert = (
                <Alert variant='danger' className='py-1' style={{width:'fitContent'}}>
                    Failed
                </Alert>
            )
    
            setMessage(alert)
            console.log(error)
        }

        
    })
    return (
        <>
            <Modal style={{marginTop:'3rem',}} show={show} onHide={handleClose} >
                <Form onSubmit={(e) => handleSubmit.mutate(e)} style={{padding:'2rem'}}>
                    <Modal.Title style={styles.modalTitle}>Login</Modal.Title>
                    <Form.Group className="mb-3" >
                        <Form.Control name="email" onChange={handleChange} style={styles.form} type="email" placeholder="Email" />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control name="password" onChange={handleChange} style={styles.form} type="password" placeholder="Password" />
                    </Form.Group>
                    <Button type='submit' variant="primary" style={styles.buttonLogin} onClick={handleClose}>
                        Login
                    </Button>
                    <div style={styles.questionFooter}>
                        <p >Don't Have an Account? Click <span onClick={goRegisterModal} style={{cursor:'pointer'}}><b>Here</b></span></p>
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
    modalTitle: {
      marginBottom:'30px', 
      fontSize:'36px', 
      color:'rgba(97, 61, 43, 1)'
    },
    buttonLogin: {
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