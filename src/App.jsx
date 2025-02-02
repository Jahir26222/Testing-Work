import { Route, Routes } from 'react-router-dom'
import './App.css'
import Bell from './RoutePages/Bell'
import Category from './RoutePages/Category'
import SettingProduct from './RoutePages/SettingProduct'
import Order from './RoutePages/Order'
import Product from './RoutePages/Product'
import Layout from './Components/Layout'
import MainSection from './Components/MainSection'
import AddProduct from './RoutePages/AddProduct'
import EditForm from './RoutePages/EditForm'
import { ToastContainer  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import OrderDetail from './RoutePages/OrderDetail'

function App() {


  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Layout/>} >
           <Route path='/' element={<MainSection/>} />
           <Route path='/notification' element={<Bell/>}/>
           <Route path='/category' element={<Category/>}/>
           <Route path='/product' element={<Product/>}/>
           <Route path='/order' element={<Order/>}/>
           <Route path='/add-product' element={<AddProduct/>}/>
           <Route path='/edit/:_id' element={<EditForm/>}/>
           <Route path='/setting-product' element={<SettingProduct/>}/>
           <Route path='/order-detail' element={<OrderDetail/>}/>

      </Route>

    </Routes>
   
    </>
  )
}

export default App
