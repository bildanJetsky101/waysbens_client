import { Button } from 'react-bootstrap'
import { useParams } from 'react-router'
import Product from '../dataDummy/dataProduct'
import NavbarWB from '../components/NavbarWB'
import { UserContext } from '../context/UserContext'
import { useContext, useState } from 'react'
import AuthAlert from '../components/popUp/Auth'
import { API } from '../config/api'
import { useQuery } from 'react-query'
import { useMutation } from 'react-query'

export default function DetailProduct(){

    const [state] = useContext(UserContext)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const [productData, setProductData] = useState({
        price: 0,
        qty: 0
    })

    let { id } = useParams()


    
    let { data: product, refetch } = useQuery('productCache', async () => {
        const response = await API.get('/product/' + id);
        return response.data.data;
      });

      console.log(product)


    const addToCart = async (e) => {
        try {
          e.preventDefault();

          if(!state.isLogin){
            return setShow(true)
         }
 
    
          // Store data with FormData as object
          const dataToCart = {
            product_id: product.id,
            subtotal: product.price,
            qty: 1,
            status: "pending"
          }
    
          console.log(dataToCart);
          // Configuration
          const config = {
            headers: {
              "Content-type": "multipart/form-data",
            },
          };
          
          const body = JSON.stringify(dataToCart);

          console.log(body)
          // Insert product data
          const response = await API.post("/addCart", body, config);
          
          console.log(response)

          alert("berhasil menambahkan product");
         
         
        } catch (error) {
          console.log(error);
        }
      };

    return(
        <>
            <NavbarWB/>
            <AuthAlert show={show} handleClose={handleClose}/>
            <div style={styles.container}>
                <img style={styles.productPic} src={product?.image} alt="Bean's pic"/>
                <div style={styles.productBody}>
                    <div style={styles.info}>
                        <h1 style={styles.infoTitle}>{product?.title}</h1>
                        <p style={styles.infoStock}>Stock: {product?.stock}</p>
                        <p style={styles.infoDesc}>{product?.desc}</p>
                        <p style={styles.infoPrice}>Rp. {product?.price}</p>
                    </div>
                    <Button onClick={addToCart} style={styles.btn}>Add to Cart</Button>
                </div>
            </div>
        </>
    )
}

const styles = {
    container: {
        paddingTop:'60px',
        width:'85%',
        margin:'auto',
        display:'flex',
        flexDirection:'row',
        justifyContent:"space-between",
        marginBottom:'3rem'
    },
    productPic: {
        borderRadius:'5px',
        width:"39%",
        height:'555px'
    },
    productBody: {
        display:"flex",
        width:"56%",
        paddingTop:'30px',
        flexDirection:'column',
        //backgroundColor:'aqua'
    },
    infoTitle: {
        color:'rgba(97, 61, 43, 1)',
        fontWeight:800,
    },
    btn: {
        backgroundColor:'rgba(97, 61, 43, 1)',
        color:'white',
        borderStyle:'none'
    },
    infoDesc: {
        marginTop:'10px',
        //backgroundColor:'tomato',
        minHeight:'25vh'
    },
    infoPrice: {
       float:'right',
       color:'rgba(151, 74, 74, 1)',
       fontSize:'24px',
       fontWeight:700
    },
    infoStock: {
        color:'rgba(151, 74, 74, 1)',
        marginTop:'-5px'
    }

}