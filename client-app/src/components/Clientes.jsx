// Clientes.js
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
  border-left: 8px solid black  ;

`;

const ClienteInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ClienteName = styled.span`
  font-weight: bold;
  color: #333;
`;

const ClienteDados = styled.span`
  font-size: 0.9em;
  color: #666;
`;

const Clientes = ({ data }) => (
  <Container>
    <Title>Clientes</Title>
    <List>
      {data.map((cliente) => (
        <ListItem key={cliente.cliente_id}>
          <ClienteInfo>
            <ClienteName>{cliente.nome_cliente}</ClienteName>
            <ClienteDados> {cliente.email} - {cliente.telefone}</ClienteDados>
            <ClienteDados> </ClienteDados>
            <ClienteDados>CPF: {cliente.cpf} - Gênero: {cliente.genero}</ClienteDados>
            <ClienteDados>Endereço: {cliente.logradouro} {cliente.numero}, {cliente.cidade} - {cliente.estado}</ClienteDados>
            <ClienteDados>Data de nascimento: {cliente.data_nascimento}</ClienteDados>
          </ClienteInfo>
        </ListItem>
      ))}
    </List>
  </Container>
);

export default Clientes;
