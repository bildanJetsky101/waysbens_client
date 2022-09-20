import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../config/api";
import NavbarWB from "../../components/NavbarWB";
import { Container, Table } from "react-bootstrap";
import { useQuery } from "react-query";

export default function ListProduct() {
  let { data: products, refetch } = useQuery("products", async () => {
    const response = await API.get("/product");
    return response.data.data;
  });

  let handleDelete = async (id) => {
  
      await API.delete(`product/${id}`);

    refetch();
  };
  return (
    <div>
      <NavbarWB/>
      <Container className="mt-5">
        <h3>List Product</h3>
        <Table
          bordered
          className="text-center mt-4"
          style={{ borderColor: "#828282" }}
        >
          <thead style={{ backgroundColor: "#E5E5E5" }}>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
               <th>Stock</th>
              <th colspan="2">Edit</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {products?.map((item, index) => (
              <tr
                // onClick={() => handleShow(item?.id)}
                key={index}
                // style={{ display: "none" }}
                className={item.length === 0 ? "fd" : ""}
              >
                <td>{index + 1}</td>
                <td>
                  <img src={item.image} alt="bab" style={{ width: 80 }} />
                </td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.stock}</td>
                <td>
                  <Link
                    to={"/update-product/" + item.id}
                    className=" text-decoration-none"
                    
                  >
                    <button  className="btn btn-success mt-3 px-4" type="submit">
                      
                      Edit
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger mt-3 px-4"
                    type="submit"
                    onClick={() => handleDelete(item.id)}
                  >
                    {" "}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}