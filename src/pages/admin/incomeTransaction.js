import NavbarWB from '../../components/NavbarWB'
import { Container, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from '../../config/api'

export default function IncomeTransaction(){

    let { data: transaction } = useQuery("transactionsCache", async () => {
        const response = await API.get("/transactions");
        return response.data.data;
      });
    

    return(
        <>
        <NavbarWB/>
        <div style={styles.parentList}>
            <Container className="mt-4">
                <Table bordered style={{ borderColor: "#828282" }}>
                <thead style={{ backgroundColor: "#E5E5E5" }}>
                    <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>email</th>
                    <th>Income</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {transaction?.map((item, index) => (
                    <tr key={index} >
                        <td>{index + 1}</td>
                        <td>{item?.user.name}</td>
                        <td>{item?.user.profile?.address}</td>
                        <td>{item?.user.email}</td>
                        <td>{item?.total}</td>
                        <td>{item?.status}</td>
                    </tr>
                    ))} */}
                </tbody>
                </Table>
            </Container>

        </div>
        </>
    )
}
const styles = {
    parentList:{
        margin:'auto'
    }
}