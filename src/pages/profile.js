import NavbarWB from "../components/NavbarWB";
import Product from "../dataDummy/dataProduct";
import Logo from '../assets/wb-icon.svg'
import QrCode from '../assets/qr-code-wb.png'
import ProfilePic from '../assets/maan.jpg'
import {API} from '../config/api'
import { useQuery } from 'react-query'
import { useState } from "react";
import ProfileModal from "../components/popUp/Profile";
import editIcon from '../assets/edit-icon.png'
import PersonIcon from '../assets/person-icon.png'

export default function Profile(){

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    let { data: getUser } = useQuery("user", async () => {
        const response = await API.get("/get-user");
        return response.data.data;
      });


    console.log(getUser.profile.address)
    const addProfile = () => {
        setShow(true)
    }

    return(
        <>
            <NavbarWB/>
            <div style={styles.container}>
                <div style={{width:'50%'}} >
                <h2>My Profile</h2>
                <div style={styles.profileSection}>
                    {getUser.profile.image?
                    <img style={styles.profileImg} src={getUser.profile.image} alt="Profile" /> :
                    <div style={{width:'200px', height:"350px", backgroundColor:"grey", borderRadius:'5px'}}>
                        <h5 style={{margin:'auto'}}>No Image</h5>
                    </div>    
                    }

                    <div style={styles.bioData}>
                        <p style={{fontWeight:'700'}}>Name</p>
                        <p>{getUser?.name}</p>
                        <br/>
                        <p style={{fontWeight:'700'}}>Email</p>
                        <p>{getUser?.email}</p>
                        <br/>
                        <p style={{fontWeight:'700'}}>Address</p>
                        {getUser.profile.address?
                         <p>{getUser.profile.address}</p> : 
                         <p>-</p>
                        }
                        <br/>
                        <p style={{fontWeight:'700'}}>Phone</p>
                        {getUser.profile.phone?
                         <p>{getUser.profile.phone}</p> : 
                         <p>-</p>
                        }
                        <br/>
                        <p style={{fontWeight:'700'}}>Gender</p>
                        {getUser.profile.gender?
                         <p>{getUser.profile.gender}</p> : 
                         <p>-</p>
                        }
                    </div>
                    <div style={styles.btnProfile} onClick={addProfile}>
                         
                        <img style={{width:'25px'}}src={editIcon} alt="edit"/>
                       
                    </div>
                </div>
              
                </div>
                <div style={styles.transactionSection}>
                    <h2>My Transaction</h2>
                    <div style={styles.transactionCard}>
                        <div style={styles.productInfo}>
                            <img style={styles.img} src={Product[0].image} alt="" />
                            <div style={styles.productInfoText}>
                                <h6>{Product[0].title}</h6>
                                <p style={{marginBottom:'25px'}}>Add at</p>
                                <p>Price: {Product[0].price}</p>
                                <p>Qty: 1</p>
                                <p>subtotal: Rp. 55000</p>
                            </div>
                        </div>
                        <div style={styles.qrCodeSection}>
                            <img style={styles.logo} src={Logo} alt="" />
                            <img style={styles.qrCode}src={QrCode} alt="" />
                            <p style={styles.infoTransaction}></p>
                        </div>
                    </div>

                    <div style={styles.transactionCard}>
                        <div style={styles.productInfo}>
                            <img style={styles.img} src={Product[0].image} alt="" />
                            <div style={styles.productInfoText}>
                                <h6>{Product[0].title}</h6>
                                <p style={{marginBottom:'25px'}}>Add at</p>
                                <p>Price: {Product[0].price}</p>
                                <p>Qty: 1</p>
                                <p>subtotal: Rp. 55000</p>
                            </div>
                        </div>
                        <div style={styles.qrCodeSection}>
                            <img style={styles.logo} src={Logo} alt="" />
                            <img style={styles.qrCode}src={QrCode} alt="" />
                            <p style={styles.infoTransaction}></p>
                        </div>
                    </div>

                    <div style={styles.transactionCard}>
                        <div style={styles.productInfo}>
                            <img style={styles.img} src={Product[0].image} alt="" />
                            <div style={styles.productInfoText}>
                                <h6>{Product[0].title}</h6>
                                <p style={{marginBottom:'25px'}}>Add at</p>
                                <p>Price: {Product[0].price}</p>
                                <p>Qty: 1</p>
                                <p>subtotal: Rp. 55000</p>
                            </div>
                        </div>
                        <div style={styles.qrCodeSection}>
                            <img style={styles.logo} src={Logo} alt="" />
                            <img style={styles.qrCode}src={QrCode} alt="" />
                            <p style={styles.infoTransaction}></p>
                        </div>
                    </div>

                </div>
            </div>
            <ProfileModal show={show} handleClose={handleClose} />
        </>
    )
}

const styles = {
    container: {
        width:'75%',
        paddingTop:'30px',
        margin:'auto',
        minHeight:'70vh',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:'5rem'
    },
    profileSection: {
        marginTop:'20px',
        display:'flex',
        width:"100%",
        flexDirection:'row',
    },
    profileImg: {
        height:'250px',
        width:'45%',
        borderRadius:'5px',
        objectFit:'cover'
    },
    bioData: {
        display:'flex',
        width:'50%',
        flexDirection:'column',
        paddingLeft:"20px"
        
    },
    transactionSection: {
        display:'flex',
        width:'50%',
        flexDirection:'column',
        justifyContent:'flex-start',
       
       height:'fitContent'
    },
    transactionCard: {
        display:'flex',
        height:'130px',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'rgba(246, 230, 218, 1)',
        padding:'10px',
        marginTop:'10px'
    },
    productInfo: {
        display:'flex',
        flexDirection:'row',

    },
    img: {
        width:'76px',
        height:'110px'
    },
    productInfoText: {
        display:'flex',
        height:'70%',
        lineHeight:'1px',
        fontSize:'10px',
        flexDirection:'column',
        backgrounColor:'wheat',
        padding:'8px'
    },
    qrCodeSection:{
        display:'flex',
        flexDirection:'column',
       justifyContent:'center',
       alignItems:'center'
    },
    logo: {
        width:'50px',
        height:'50px'
    },
    qrCode: {
        width:'40px',
        height:'40px'
    },
    btnProfile:{
       height:"fit-content",
        color:"white",
        cursor:'pointer'
    }
}