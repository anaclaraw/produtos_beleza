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

  const fetchProducts = async (endpoint) => {
    setIsLoading(true);
    const url = `http://localhost:9005/produtos${endpoint}`;
    try {
      const response = await axios.get(url, { params: { orderBy, direction } });
      setProducts(response.data);
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
      mais_recente: { orderBy: 'produto_id', direction: 'DESC' },
    };

    const selectedOrder = orderMapping[event.target.value];
    if (selectedOrder) {
      setOrderBy(selectedOrder.orderBy);
      setDirection(selectedOrder.direction);
      fetchProducts('');
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
      <h3>{product.nome}</h3>
      <p>{product.descricao} </p>
      <p>{product.preco}</p>
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
  background-color: #ceb0b1;
  border-radius: 50px;
  width: 60%;

  .search-icon {
    position: absolute;
    right: 16px;
    top: 16px;
    color: #f3a2a2;
  }

  input {
    width: 100%;
    padding: 12px 16px;
    border: none;
    font-size: 18px;
    border-radius: 50px;
    outline: none;
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

  &:hover {
    transform: scale(1.02);
  }
`;

const CardInfo = styled.div`
  h3 {
    font-size: 18px;
  }

  p {
    font-size: 14px;
    color: #888;
  }
  button{
    background-color: #f89fa1;
    border-radius: 100px;
    padding: 10px;
  }
`;

export default ProductListAll;
