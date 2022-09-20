import { Route, Routes, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import LandingPage from './pages/landingPage'
import DetailProduct from './pages/detailProduct'
import AddProduct from './pages/admin/addProduct'
import ListProduct from './pages/admin/listProduct'
import UpdateProduct from './pages/admin/updateProduct'
import Profile from './pages/profile'
import Cart from './pages/cart'
import IncomeTransaction from './pages/admin/incomeTransaction'
import { useEffect, useContext } from "react";
import { API, setAuthToken } from "./config/api";

import { UserContext } from "./context/UserContext";


function App() {

  let navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext)

  

  useEffect(() => {
    // pengalihan halaman jika login berhasil maka akan bernilai true dan akan dialihkan ke halaman utama
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    if (state.isLogin === false) {
        navigate('/')
    } else if (state.isLogin === true) {
        if (state.isAdmin) {
          navigate('/income-transaction')
        }
      }
  },[state])


  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "LOGIN_USER",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);



  return (
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path="/detailProduct/:id" element={<DetailProduct/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/add-product" element={<AddProduct/>}/>
      <Route path="/list-product" element={<ListProduct/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/income-transaction" element={<IncomeTransaction/>}/>
      <Route path="/update-product/:id" element={<UpdateProduct/>}/>
    </Routes>
  )
}

export default App;
