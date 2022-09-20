import NavbarWB from '../components/NavbarWB'
import ProductCard from '../components/ProductCard'
import Products from '../dataDummy/dataProduct'
import Jumbotron from '../assets/jumbotron-wb.svg'
import { API } from '../config/api'
import { useQuery } from 'react-query'

export default function LandingPage(){

    let { data: products, refetch } = useQuery("products", async () => {
        const response = await API.get("/product");
        return response.data.data;
      });


    return(
        <div>
            <NavbarWB/>
            <div style={styles.main}>
                <div style={styles.jumbotron}>
                    <img src={Jumbotron} alt="Jumbotron Waysbeans" />
                </div>
                <div style={styles.content}>
                    <h1 style={styles.h1Color}>Let's Order</h1>
                    <div style={styles.cardProductParent}>
                        {products?.map((item, index)=>(
                            <ProductCard item={item} key={index}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const styles = {
    main: {
       width:'85%',
       //backgroundColor:'aqua',
       margin:'auto'
    },
    content : {
       // backgroundColor:'tomato',
        width:'92%',
        margin:'auto'
    },
    cardProductParent: {
        display:"flex",
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop:'15px',
        justifyContent:'flex-start',
        marginBottom:'5rem',
    },
    h1Color: {
        fontSize:'36px',
        marginTop:'50px',
        fontWight:'900',
        color:'rgba(97, 61, 43, 1)'
    },
    jumbotron: {
       display:'flex',
       justifyContent:'center',
       paddingTop:'55px'
    }
}