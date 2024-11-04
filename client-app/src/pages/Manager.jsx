import { useState, useEffect } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import '../App.css'
import ImageBrush from '/brush.png'
import Clientes from '../components/Clientes';
import Promocoes from '../components/Promocoes';
import Pedidos from '../components/Pedidos';
import Categorias from '../components/Categorias';
import SubCategorias from '../components/Subcategorias';
import Pagamentos from '../components/Pagamentos';
import Estoques from '../components/Estoques';

function Manager() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderBy, setOrderBy] = useState('preco');
  const [route, setRoute] = useState('reset');
  const [direction, setDirection] = useState('ASC');
  const [marca, setMarca] = useState([]);
  const [data, setData] = useState();




  // Função para alterar o conteúdo baseado na opção selecionada
  const handleMenuClick = async (option) => {
    const response = await axios.get(`http://localhost:9005/${option}`);
    setData(response.data)
    setRoute(option)
    console.log('data:', data);


  }
  const renderContent = () => {
    switch (route) {
      case 'Clientes':
        return <Clientes data={data} />;
      case 'Pedidos':
        return <Pedidos data={data} />;
      case 'Promocoes':
        return <Promocoes data={data} />;
      case 'Categorias':
        return <Categorias data={data} />;
      case 'Pagamentos':
        return <Pagamentos data={data} />;
        case 'Subcategorias':
          return <SubCategorias data={data} />;
          case 'Estoque':
          return <Estoques data={data} />;
      default:
        return <p>Bem-vindos(as) a administração da T-Beauty!</p>;
    }
  }

  return (
    <Main>
      <MenuLateral>
        <h4>Manager T-Beauty</h4>
        <button onClick={() => handleMenuClick("Clientes")}>Clientes</button>
        <button onClick={() => handleMenuClick("Pedidos")}>Pedidos</button>
        <button onClick={() => handleMenuClick("Promocoes")}>Promoções</button>
        <button onClick={() => handleMenuClick("Categorias")}>Categorias</button>
        <button onClick={() => handleMenuClick("Subcategorias")}>Subcategorias</button>
        <button onClick={() => handleMenuClick("Estoque")}>Estoque</button>
        <button onClick={() => handleMenuClick("Pagamentos")}>Pagamentos</button>
      </MenuLateral>

      <Container>{renderContent(route)}</Container>
    </Main>

  )
}




export default Manager


const Container = styled.main`
  margin: auto;
  font-family: "Poppins", serif;
  display: flex;
  flex-direction: column;
  max-width: 75%;
  margin-left: 25vw;
  color: gray;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  
  `

const MenuLateral = styled.main`
  height: 100vh;
  width: 25vw;
  position: fixed;
  background-color: #94654c ;
  font-family: "Poppins", serif;
  display: flex;
  flex-direction: column;

  button{
    background-color: transparent;
    color: #ffffff;
    border-radius: 0;
    border-left: 8px outset #ffffff;
    margin-top: 10px;
  }

  button:active{
    background-color: #ffffff;
  }
  button:focus{
    background-color: #ffffff;
    color: #94654c;
  }
  h4{
    color:#ffffff;
  }
  
  `

const Main = styled.main`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: "Poppins", serif;
  background-color: white;
  color: aliceblue;
  
  
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