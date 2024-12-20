import { useState, useEffect } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import '../App.css'
import ProductListAll from '../components/ProductListAll';
import Navbar from '../components/Navbar';
import Capa from '../components/Capa';
import ImageBrush from '/brush.png'
import Footer from '../components/Footer';

function Home() {
 

  return (
    <Container>
      <Navbar/>
      <Capa/>
      <h1>Os queridinhos</h1>
      <h2>A cada escolha, novos produtos para experimentar</h2>
      <ProductListAll />
      <Footer/>
    </Container>
  )
}

export default Home


const Container = styled.main`
  max-width: 100%;
  font-family: "Poppins", serif;
  background-color: white;
  
  h1{
    width: max-content;
    color:black;
    background-image: url(${ImageBrush}) ;
    background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
    padding: 50px;
    margin:0% auto;
  
  }
  /* .color1 { #94654c };
     .color2 { #f89fa1 };
     .color3 { #fabdbd };
     .color4 { #fad6d6 };
     .color5 { #fefcd0 }; #f7e6af */
`;