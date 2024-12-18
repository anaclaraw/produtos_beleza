// Estoques.js
import React from 'react';
import styled from 'styled-components';
import LineChart from './Char';

const Container = styled.div`
  background-color: #f4f6f8;
  border-radius: 8px;
  padding: 2%;
  width: 96%;
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
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
  border-left: 8px solid #fad6d6 ;

`;

const EstoqueInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const EstoqueTitulo = styled.span`
  font-weight: bold;
  color: #333;
`;

const EstoqueQuantidade = styled.span`
  font-size: 0.9em;
  color: #666;
`;



const Estoques = ({ data }) => (
  <Container>
    <Title>Estoque</Title>
    <List>
      {data.map((Estoque) => (
        <ListItem key={Estoque.Estoque_id}>
          <EstoqueInfo>
            <EstoqueTitulo>Produto {Estoque.produto_id}</EstoqueTitulo>
            <EstoqueQuantidade>Quantidade: {Estoque.quantidade}</EstoqueQuantidade>
          </EstoqueInfo>
        </ListItem>
      ))}
    </List>
   
  </Container>
)

export default Estoques;



