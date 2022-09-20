import NavbarWB from "../../components/NavbarWB";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import {API} from '../../config/api'
import { useMutation } from "react-query";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

export default function UpdateProduct (){

    let { id } = useParams()
    let navigate = useNavigate()

    const [formProduct, setFormProduct] = useState({
        title: '',
        stock: '',
        price: '',
        desc:'',
        image:'',
    })
    const [preview, setPreview] = useState(null)
    const [productData, setProduct] = useState({})

    let { data: product } = useQuery('productCache', async () => {
        const response = await API.get('/product/' + id);
        return response.data.data;
      });

      useEffect(() => {
        if (product) {
          setPreview(product.image);
          setFormProduct({
            ...formProduct,
            title: product.title,
            desc: product.desc,
            price: product.price,
            stock: product.stock,
          });
        }
          setProduct(product);
        }, [product]);


    const handleChange = (e) => {
        setFormProduct({
            ...formProduct,
          [e.target.name]: 
          e.target.type === "file" ? e.target.files : e.target.value,
            
        });

        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
          }
    };

    const handleSubmit = useMutation(async (e) => {
        try {
          e.preventDefault();
        
          console.log(formProduct)
          // Store data with FormData as object

          const formData = new FormData();
          if (formProduct.image) {
            formData.set("image", formProduct?.image[0], formProduct?.image[0]?.name);
          }
          
          formData.set('title',formProduct.title);
          formData.set('price',formProduct.price);
          formData.set('stock',formProduct.stock);
          formData.set('desc',formProduct.desc);
    
          const objectData = {
            title:formProduct.title,
            price:formProduct.price,
            desc:formProduct.stock,
            image:formData.image
          }

          console.log(objectData);
          // Configuration
          const config = {
            headers: {
              "Content-type": "multipart/form-data",
            },
          };
    
         const response = await API.patch(`/product/${id}`, formData, config);
          console.log(response);
         alert("berhasil mengubah product");
          
          navigate("/list-product");
          setFormProduct({
            title: '',
            stock: 0,
            price: 0,
            desc:'',
            image:'',
        })
        } catch (error) {
          console.log(error);
        }
      });

    return(
        <>
            <NavbarWB/>
            <div style={styles.container}>
                <div style={styles.formWrapper}> 
                <Form onSubmit={(e) =>handleSubmit.mutate(e)} style={{padding:'2rem'}}>
                    <h2 style={styles.modalTitle}>Update Product</h2>
                    <Form.Group className="mb-3" >
                        <Form.Control value={ formProduct?.title } name='title' onChange={handleChange} style={styles.form} type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Control value={ formProduct?.stock } name='stock' onChange={handleChange} style={styles.form} type="number" placeholder="Stock" />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control value={ formProduct?.price } name='price' onChange={handleChange} style={styles.form} type="number" placeholder="Price" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control value={ formProduct?.desc } name='desc' onChange={handleChange} style={styles.form} as="textarea" rows={3} placeholder="Desc"/>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control   name='image' onChange={handleChange} style={styles.form} type="file" />
                    </Form.Group>
                    <Button type='submit' style={styles.button} >
                        Update
                    </Button>
                </Form>
                </div>
                {/* <img style={styles.img} src="" alt="product" /> */}
                {preview && (
                <div>
                    <img
                    src={preview}
                    style={{
                        maxWidth: "300px",
                        maxHeight: "400px",
                        objectFit: "cover",
                        marginTop:'4rem'
                    }}
                    alt={preview}
                    />
                </div>
                )}
            </div>    
        </>
    )
}

const styles = {
    container: {
        paddingTop:"30px",
        width:"85%",
        display:'flex',
        flexDirection:'row',
        justifyContent:"space-around",
        alignItems:'center',
        margin:'auto',
       
    },
    modalTitle: {
        color:'rgba(97, 61, 43, 1)',
        marginBottom:'30px'
    },
    formWrapper: {
        width:"60%",
        height:'70vh'
    },
    form: { 
        color:"rgba(97, 61, 43, 1)",
        backgroundColor:'rgba(97, 61, 43, 0.25)',
        border:'2px solid rgba(97, 61, 43, 1'
    },
    button: {
        backgroundColor:'rgba(97, 61, 43, 1)',
        color:'white',
        width:'300px',
        borderStyle:'none',
        justifySelf:"center",
        margin:'auto'
    },
    img: {
        backgroundColor:'black',
        borderRadius:'5px',
        width:"305px",
        height:'450px'
    }
}