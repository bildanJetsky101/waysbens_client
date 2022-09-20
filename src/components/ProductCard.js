import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

export default function ProductCard({item, index}){
    return(
        <Link style={{textDecoration:'none', marginTop:'35px', marginRight:'20px'}}to={`/detailProduct/` + item.id} key={index}>
            <Card style={styles.card} >
                <Card.Img variant="top" src={item.image} />
                <Card.Body style={styles.cardBody}>
                    <Card.Title style={styles.cardTitle}>{item.title}</Card.Title>
                    <Card.Text style={styles.cardText}>
                        Rp. {item.price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>

    )
}

const styles = { 
    cardBody: {
        padding:'1rem'
    },
    card: {
        borderRadius:'10px',
        borderStyle:'none',
        backgroundColor:'rgba(246, 218, 218, 1)'
    },
    cardTitle: {
        fontSize:'18px', 
        weight:'900', 
        color:'rgba(97, 61, 43, 1)',
    },
    cardText: {
        color:'rgba(151, 74, 74, 1)'
    }
}