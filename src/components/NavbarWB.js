import { Navbar, Nav, Button, Dropdown } from 'react-bootstrap'
import { useNavigate, Link} from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import Cart from '../assets/wb-cart.png'
import CartExist from '../assets/cart-exist.png'
import Logo from '../assets/wb-icon.svg'
import RegisterModal from './RegisterModal'
import LoginModal from './LoginModal'
import Logout from '../assets/logout 1.png'
import User from '../assets/user-icon.svg'
import ProductIcon from '../assets/add-product-icon.png'
import Profile from '../assets/person-icon.png'
import { UserContext } from '../context/UserContext'
import 'bootstrap/dist/css/bootstrap.css';
import { API } from '../config/api'
import { useQuery } from 'react-query'


export default function NavbarWB (){

    //   let { data: carts, refetch } = useQuery("carts", async () => {
    //     const response = await API.get("/carts");
        
    //     return response.data.data;
    //   });

      //console.log(carts?.length)

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [dropdown, setDropdown] = useState(false)
    const [cartStatus, setCartStatus] = useState(false)
    const [state, dispatch] = useContext(UserContext)
    const [profile, setProfile]= useState(Profile)

 
    let { data: userCart } = useQuery("cart-user", async () => {
        const response = await API.get("/carts");
        return response.data.data;
    });

    let { data: getUser } = useQuery("user", async () => {
        const response = await API.get("/get-user");
        return response.data.data;
      });

    useEffect(()=>{
        if(state.isLogin && getUser?.profile?.image){
            setProfile(getUser?.profile?.image)
        }
    },[])

   //console.log(userCart)

    useEffect(()=>{
        if(userCart === undefined || userCart.length < 1 ){
            setCartStatus(false)
        } else setCartStatus(true)
    },[userCart])

    

    let navigate = useNavigate()

    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);

    const goRegister = () => {
        setShow2(true)
    }

    const goLogin = () => {
        setShow(true)
    }

    const addProduct = () => {
        navigate('/add-product')
    }

    const listProduct = () => {
        navigate('/list-product')
    }

    const imgClick = () => {
        setDropdown(true)
        navigate('/cart')
    }

    const toProfile = () => {
        navigate('/profile')
    }

    const logout = () => {
        console.log(state)
        // mengisi state melalui dispatch yang nantinya akan diakses di auth
        dispatch({
            type: "LOGOUT"
        })
    }

    const rightSectionNavbar = () => {

        if(!state.isLogin){
            return(
                <Nav style={styles.notLoginSection}>
                    <button onClick={goLogin} style={styles.loginButton}>Login</button>
                    <button onClick={goRegister} style={styles.registerButton}>Register</button>
                </Nav>
            )
        }
        else if(state.isLogin){
            if(!state.isAdmin){
                return (
                    <Nav style={styles.customerRightSectionNavbar}>
                        {cartStatus?
                            <img onClick={imgClick} src={CartExist} style={styles.cart} alt="" />
                            :
                            <img onClick={imgClick} src={Cart} style={{cursor:'pointer', width:'30px', height:'30px'}} alt="" />
                        } 
                        {/* <img style={{objectFit:'cover', width:'50px', height:'50px', borderRadius:'50%'}} src={Profile}/> */}
                        <Dropdown>
                            <Dropdown.Toggle style={{backgroundImage:`url(${profile})`, backgroundSize:'cover', backgroundPosition:'center', objectFit:'cover', backgroundColor:'black', borderStyle:'none', width:'50px', borderRadius:'60%', height:'50px' }} align="end">
                                {/* <img  style={{backgroundColor:'grey', marginRight:'10rem', marginBottom:'90px', objectFit:'cover', width:'30px', borderRadius:'60%', height:'30px'  }} alt="" /> */}
                            </Dropdown.Toggle>

                            <Dropdown.Menu  align="end" style={{marginTop:'10px', height:'12rem', width:'16rem', }}>
                                <Dropdown.Item onClick={() => toProfile()} style={{height:'45%', display:'flex', fontSize:'24px', fontWeight:'600', alignItems:'center'}} href="#">
                                    <img style={{width:'28px', height:'28px', marginRight:'9px', marginTop:'3x'}} src={User}/>
                                    Profile
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => logout()} style={{height:'45%', paddingLeft:'20px', display:'flex', fontSize:'24px', fontWeight:'600', alignItems:'center'}} href="#">
                                    <img style={{width:'28px', height:'28px', marginRight:'9px', marginTop:'3px'}} src={Logout}/>
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                )
            } else {
                return(
                    <Nav style={styles.customerRightSectionNavbar}>
                        <Dropdown>
                            <Dropdown.Toggle aria-hidden='true' style={{backgroundImage:`url(${Profile})`, backgroundSize:'cover', backgroundPosition:'center', objectFit:'cover', backgroundColor:'black', borderStyle:'none', width:'50px', borderRadius:'60%', height:'50px' }} align="end">
                            </Dropdown.Toggle>

                            <Dropdown.Menu  align="end" style={{marginTop:'10px', height:'12rem', width:'16rem', }}>
                               
                                <Dropdown.Item onClick={() => addProduct()} style={{height:'30%', display:'flex', fontSize:'24px', fontWeight:'600', alignItems:'center'}}>
                                    <img style={{width:'28px', height:'28px', marginRight:'9px', marginTop:'3px'}} src={ProductIcon}/>
                                    Add Product
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => listProduct()} style={{height:'30%', display:'flex', fontSize:'24px', fontWeight:'600', alignItems:'center'}}>
                                    <img style={{width:'28px', height:'28px', marginRight:'9px', marginTop:'3px'}} src={ProductIcon}/>
                                    list Product
                                </Dropdown.Item>

                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => logout()} style={{height:'30%', paddingLeft:'20px', display:'flex', fontSize:'24px', fontWeight:'600', alignItems:'center'}} href="#">
                                    <img style={{width:'28px', height:'28px', marginRight:'9px', marginTop:'3px'}} src={Logout}/>
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>                    
                    </Nav>
                )
            }
        }
    }


    const handleHome = () => {
        if(state.isAdmin){
            return '/income-transaction'
        } else return '/'
    } 

    return(
        <>
            <Navbar style={styles.navbar}>
                <Link as={Link} to={handleHome()}>
                    <Navbar.Brand style={styles.navbarBrand}>
                        <img style={styles.brandLogo} src={Logo} alt="Waysbeans" />
                    </Navbar.Brand>
                </Link>
                {rightSectionNavbar()}
            </Navbar>
            <LoginModal show={show}  handleClose={handleClose} />
            <RegisterModal show={show2} handleClose={handleClose2} />
        </>
    )
}

const styles = {
    navbar : {
        display:'flex',
        width:'100%',
        height:'5rem', 
        flexDirection:'row', 
        justifyContent:'space-between',
        paddingLeft:'4rem',
        paddingRight:'4rem',
        alignItems:'center',
        boxShadow:'0px 3px 20px 0px grey'
    },
    navbarBrand: {
        textDecoration:'none'
    },
    brandLogo: {
        weight:'50px', 
        height:'50px'
    },
    notLoginSection: {
        display:'flex', 
        width:'17%', 
        marginTop:'5px', 
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center' 
    },
    loginButton: {
        cursor:'pointer',
        color:'rgba(97, 61, 43, 1)', 
        border:'2px solid rgba(97, 61, 43, 1)', 
        backgroundColor:'transparent',
        width:'6rem', 
        height:'30px', 
        fontWeight:'550', 
        borderRadius:'5px'
    },
    registerButton: {
        cursor:'pointer',
        border:'1px solid rgba(97, 61, 43, 1)', 
        backgroundColor:'rgba(97, 61, 43, 1)', 
        color:'white', 
        width:'6rem', 
        height:'32px', 
        fontWeight:'550', 
        borderRadius:'5px'
    },
    customerRightSectionNavbar:{
        display:'flex', 
        width:'8%', 
        marginTop:'15px', 
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center'
    },
    cart: {
        cursor:'pointer',
        width:'30px', 
        height:'30px'
    }
}