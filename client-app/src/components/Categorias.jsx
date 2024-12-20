// Categorias.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2%;
  width: 96%;
  background-color: #f4f6f8;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  font-size: 1.5em;
  color: #333;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 8px solid #f89fa1 ;

`;

const CategoriaInfo = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
`;

const CategoriaName = styled.span`
  font-weight: bold;
  color: #333;
`;

const CategoriaId = styled.span`
  font-size: 0.9em;
  color: #666;
`;

const Categorias = ({ data }) => (
  <Container>
    <Title>Categorias</Title>
    <List>
      {data.map((Categoria) => (
        <ListItem key={Categoria.categoria_id}>
          <CategoriaInfo>
            <CategoriaName>{Categoria.nome_categoria}</CategoriaName>
            <CategoriaId>ID: {Categoria.categoria_id}</CategoriaId>
          </CategoriaInfo>
        </ListItem>
      ))}
    </List>
  </Container>
);

export default Categorias;
