import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { IoSearch } from "react-icons/io5";


const ProductListAll = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderBy, setOrderBy] = useState('preco');
  const [direction, setDirection] = useState('ASC');
  const [marca, setMarca] = useState([]);
  const categories = ['Todos', 'Perfumes', 'Maquiagem', 'Cuidados com a pele','Higiene Pessoal','Cabelos'];


  useEffect(() => {
    fetchProducts(searchTerm ? `/busca/${searchTerm}` : '/');
    fetchAllMarcas()
  }, [searchTerm]);

  useEffect(() => {
    fetchProducts(searchTerm ? `/busca/${searchTerm}` : '/');
  }, [orderBy, direction]);

  const fetchProducts = async (endpoint) => {
    setIsLoading(true);
    const url = `http://localhost:9005/produtos${endpoint}`;
    try {
      const response = await axios.get(url, { params: { orderBy, direction } });
     
      setProducts(response.data);
      console.log(response.data);
      
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleCategorySelect = (category) => {
    const endpoint = category === 'Todos' ? '/' : `/categoria/${category}`;
    fetchProducts(endpoint);
  };

  const handleOrderByChange = (event) => {
    const orderMapping = {
      maior_preco: { orderBy: 'preco', direction: 'DESC' },
      menor_preco: { orderBy: 'preco', direction: 'ASC' },
      mais_relevante: { orderBy: 'nota_avaliacao', direction: 'DESC NULLS LAST' },
      mais_recente: { orderBy: 'produto_id', direction: 'ASC' },
    };

    const selectedOrder = orderMapping[event.target.value];
    if (selectedOrder) {
      setOrderBy(selectedOrder.orderBy);
      setDirection(selectedOrder.direction);
    
      
    }
    
  };

  const handleSelectByMarca = (event) => {
    const endpoint = event.target.value > 1 ?  `/marca/${event.target.value}` : '/' ; 
    fetchProducts(endpoint);
  };

  const fetchAllMarcas = async () => {
    try {
      const response = await axios.get('http://localhost:9005/marcas');
      setMarca(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      // setIsLoading(false);
    }
  };
  // fetchAllMarcas()

  return (
    <Container>
      <SearchBar>
        <SearchInput>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            onBlur={() => fetchProducts('')}
          />
          <IoSearch className="search-icon" />
        </SearchInput>
        <select onChange={handleOrderByChange}>
          <option value="">Ordenar por:</option>
          <option value="maior_preco">Maior preço</option>
          <option value="menor_preco">Menor preço</option>
          <option value="mais_relevante">Mais relevante</option>
          <option value="mais_recente">Mais recente</option>
        </select>
        <select onChange={handleSelectByMarca}>
          <option value="">Marca</option>
          {marca.map((marca) => (
            <option key={marca.marca_id} value={marca.marca_id}>{marca.nome_marca}</option>

          ))}
        </select>


      </SearchBar>
      <CategoryButtons>
        {categories.map((category) => (
          <button key={category} onClick={() => handleCategorySelect(category)}>
            {category}
          </button>
        ))}
      </CategoryButtons>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.produto_id} product={product} />
        ))}
        {isLoading && <div>Carregando dados...</div>}
      </ProductGrid>
    </Container>
  );
};

const ProductCard = ({ product }) => (
  <Card>
    <CardInfo>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdwXtAOL0wCTsYOlr33hJX33swJ5ItWUmeRA&s" alt="" />
      <h3>{product.nome_produto}</h3>
      <p>{product.descricao} </p>
      <h4>{product.preco}</h4>
      <button>Comprar</button>
    </CardInfo>
  </Card>
);

// Styled Components
const Container = styled.div`
  width: 90%;
  margin: 2% auto;
  display: flex;
  flex-direction: column;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 2% auto;
  width: 95%;

  select {
    height: 60px;
    width: 12%;
  }
`;

const CategoryButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin: 1% auto;

  button {
    background-color: #f7e6af;
    border-radius: 20px;
  }
`;

const SearchInput = styled.div`
  position: relative;
  background-color: #f8ccce;
  border-radius: 50px;
  width: 60%;
  padding: 10px;

  .search-icon {
    position: absolute;
    right: 36px;
    top: 29px;
    color: #f3a2a2;
  }

  input {
    width: 95%;
    padding: 12px 0px 12px 15px;
    border: none;
    font-size: 18px;
    border-radius: 50px;
    outline: none;
    border: 5px solid #ebb0c8;
    filter: drop-shadow(0px 2px 2px #4240403c);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  max-width: 90vw;
  margin: 0 auto;
  padding: 20px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
  `;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 15px;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 0 0 0.25px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.02);
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%; /* Garante que o conteúdo interno também preencha o espaço */
  h3 {
    font-size: 18px;
    margin: 0;
  }

  p {
    margin: 0;

    font-size: 14px;
    color: #888;
    display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
  -webkit-box-orient: vertical;
    
  }
  button{
    margin-top: auto;
    background-color: #f89fa1;
    border-radius: 100px;
    padding: 10px;
    width: 60%;
    
  }
  h4{
    margin: 0;
    padding: 0;
  }
`;

export default ProductListAll;
