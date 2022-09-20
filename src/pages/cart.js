import Bin from '../assets/bin.png'
import NavbarWB from '../components/NavbarWB'
import Payment from '../components/popUp/Payment'
import React, { useState, useContext, useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { API } from '../config/api'
import { useQuery } from 'react-query'

export default function Cart(){

    //let history = useHistory();
    const [show, setShow] = useState(false)
    const [donePay, setDonePay] = useState(false)
    let [qtyProduct, setQtyProduct] = useState(1)
    const [transaction, setTransaction] = useState({
        qty:0,
        total:0,
    })

    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = "SB-Mid-client-NNwTaG08JpIkHZNZ";

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);


    const handleClose = () => setShow(false);

    let navigate = useNavigate()
    //let {id} = useParams()

      let { data: userCarts, refetch } = useQuery("carts", async () => {
        const response = await API.get("/carts");
        
        return response.data.data;
      });

     // console.log(userCarts)

       let { data: transactions } = useQuery("transactions", async () => {
        const response = await API.get("/transactions");
        
        return response.data.data;
      });

      //console.log(transactions)

      let product = []
    
    for (let i = 0; i < userCarts?.length; i++){
        product.push(userCarts[i]?.product)
    }

    //console.log(product)

    useEffect(() =>{
        if(product.length < 1) {
          setQtyProduct(0)
          setDonePay(true)
        } else setDonePay(false)
    },[product])

    const increaseQty = () => {
        //let [qtyProduct, setQtyProduct] = useState(1)
        setQtyProduct(qtyProduct+1)
    }

    const decreaseQty = () => {
        if(qtyProduct >= 1){
           return setQtyProduct(qtyProduct-1)
        }
    }
    

     let subtotal = 0
     for(let i = 0; i< product.length; i++){
         subtotal += product[i].price * qtyProduct
     }


    const payProduct = async () => {
        try{
        setTransaction({
            qty: qtyProduct,
            total:subtotal,
        })

        const dataTransaction = {
            qty: transaction.qty,
            total: transaction.total,
        }

        // console.log(dataTransaction)
        // console.log(product)
        const body = JSON.stringify(dataTransaction);  
        
        const config = {
            method: "POST",
            headers: {
              Authorization: "Basic " + localStorage.token,
              "Content-type": "application/json",
            },
            body,
        };

        
        console.log(config)

        // Insert transaction data
        const response = await API.post('/add-transaction', config)

        const token = response.data.data.token;
        console.log(response)

        window.snap.pay(token, {
        onSuccess: function (result) {
            /* You may add your own implementation here */
            console.log(result);
            //history.push("/profile");
        },
        onPending: function (result) {
            /* You may add your own implementation here */
            console.log(result);
            //history.push("/profile");
        },
        onError: function (result) {
            /* You may add your own implementation here */
            console.log(result);
        },
        onClose: function () {
            /* You may add your own implementation here */
            alert("you closed the popup without finishing the payment");
        },
        });

        
        setShow(true)
        await API.delete(`/clean-cart`);
        // setDonePay(true)
        //navigate("/profile")
        }
        catch(error){
            console.log(error)
        }
    }

    const deleteProduct = async (index) => {
        try{
            const response = await API.delete(`cart/${userCarts[index].id}`);
            console.log(response.data)
            refetch();
        } catch(error){
            console.log(error)
        }
    }
    var path_file = "http://localhost:5000/uploads/"
    return(
        <>
        <NavbarWB/>
        <Payment show={show} handleClose={handleClose} />
        <div style={styles.container}>
            <h1 style={styles.h1}>My Cart</h1>
            <p style={styles.p}>Review Your Order</p>
            <div style={styles.innerContainer}>
                <div style={styles.order}>
                    {!donePay?
                    product?.map((item, index) =>(
                        <div key={index} style={styles.productContent}>
                            <img style={{height:'80px', width:'80px'}} src={path_file+item.image} alt="" />
                            <div style={styles.productBody}>
                                <div style={styles.info}>
                                    <p style={{fontWeight:'800'}}>{item.title}</p>
                                    <p>Rp. {item.price * qtyProduct}</p>
                                </div>
                                <div style={styles.info2}>
                                    <div style={styles.qtyControler}>
                                        <button  onClick={decreaseQty} style={styles.btnQty}> - </button> 
                                        <p  style={styles.qtyProduct}>{qtyProduct}</p>
                                        <button onClick={increaseQty} style={styles.btnQty}> + </button>
                                    </div>
                                    <img style={{cursor:"pointer", width:"20px", height:"20px"}} onClick={()=> deleteProduct(index)} src={Bin} alt="" />
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <div style={{margin:'auto', paddingTop:'5rem',paddingBottom:'5rem'}}>  
                        <h1 style={{textAlign:'center'}}>You Have No Order</h1>
                    </div>}

                </div>
                <div style={styles.pay}>
                    <div style={styles.subtotal}>
                        <p>Subtotal</p>
                        <p>Rp. {subtotal}</p>
                    </div>
                    <div style={styles.qty}>
                        <p>Qty</p>
                        <p>{qtyProduct}</p>
                    </div>
                    <div style={styles.total}>
                        <p>Total</p>
                        <p>Rp. {subtotal}</p>
                    </div>
                    <button onClick={()=>payProduct()} style={styles.btnPay}>Pay</button>
                </div>
            </div>

        </div>
        </>
    )
}

const styles = {
    container: {
        width:'75%',
        margin:'auto',
        marginTop:'3rem',
        color:'rgba(97, 61, 43, 1)'
    },
    innerContainer:{
        display:'flex',
        flexDirection:'row'

    },
    h1: {
        marginBottom:'25px'
    },
    order: {
        width:'60%',
        height:'100%',
        borderTop:'1px solid rgba(97, 61, 43, 1)',
        borderBottom:'1px solid rgba(97, 61, 43, 1)',
        marginRight:'100px',
        paddingBottom:'15px'
    },
    pay: {
        borderTop:'1px solid rgba(97, 61, 43, 1)',
        width:'33%',
        height:'500px',
        paddingTop:'10px'
    },
    subtotal: {
        display:'flex',
        justifyContent:'space-between',
       
    },
    qty: {
        borderBottom:'1px solid rgba(97, 61, 43, 1)',
        display:'flex',
        justifyContent:'space-between'
    },
    total: {
        fontWeight:'800',
        paddingTop:'10px',
        display:'flex',
        justifyContent:'space-between'
    },
    btnPay:{
        marginTop:'2rem',
        height:'40px',
        borderRadius:'5px',
        backgroundColor:'rgba(97, 61, 43, 1)',
        color:'white',
        width:'100%',
        borderStyle:'none'
    },
    productContent: {
        display:'flex',
        flexDirection:'row',
       // backgroundColor:'rgb(250, 250, 250)',
        marginTop:'15px'
    },
    productBody:{
        position:'relative',
        display:'flex',
        marginLeft:'10px',
        justifyContent:'center',
        flexDirection:'column',
        width:'180%',
    },
    info: {
        position:'relative',
        display:'flex',
        flexDirection:'row',
        paddingTop:'5px',
        height:'35px',
        justifyContent:'space-between'
    },
    info2: {
        display:'flex',
        flexDirection:'row',
        height:'30px',
        justifyContent:'space-between',
    },
    qtyControler: {
        display:'flex',
        flexDirection:'row',
        width:'90px',
        justifyContent:'space-between'
    },
    btnQty: {
        backgroundColor:'transparent',
        display:'flex',
        justifyContent:'Center',
        alignItems:'center',
        borderStyle:'none',
        height:'25px',
        paddingBottom:'5px',
        fontSize:'26px'
    },
    qtyProduct: {
        width:'25px',
        height:'25px',
        backgroundColor:'rgba(246, 230, 218, 1)',
        borderRadius:'5px',
        textAlign:'center'
    }


}