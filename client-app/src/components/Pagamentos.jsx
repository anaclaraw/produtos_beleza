// Pagamentos.js
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
  border-left: 8px solid #78e075 ;

`;

const PagamentoInfo = styled.div`
  display: flex;
  flex-flow: column;
  padding: 10px;
  gap: 1%;
  align-items: flex-start;
`;

const PagamentoTitulo = styled.div`
  font-weight: 600;
  color: #000000c8;
`;
const PagamentoName = styled.span`
  color: #0c0c0ca2;
  font-weight: 400;
`;


const Pagamentos = ({ data }) => (
  <Container>
    <Title>Pagamentos</Title>
    <List>
      {data.map((Pagamento) => (
        <ListItem key={Pagamento.pagamento_id}>
          <PagamentoInfo>
            <PagamentoTitulo>Pedido ID:  <PagamentoName>{Pagamento.pedido_id}</PagamentoName></PagamentoTitulo>
           
            <PagamentoTitulo>Método de pagamento: <PagamentoName>{Pagamento.metodo_pagamento}</PagamentoName></PagamentoTitulo>
            
            <PagamentoTitulo>Valor pago: <PagamentoName>{Pagamento.valor}</PagamentoName></PagamentoTitulo>
            
            <PagamentoTitulo>Número de parcelas:  <PagamentoName>{Pagamento.numero_parcelas}</PagamentoName></PagamentoTitulo>
           
            <PagamentoTitulo>Data de pagamento: <PagamentoName>{Pagamento.data_pagamento}</PagamentoName></PagamentoTitulo>
            
          </PagamentoInfo>
        </ListItem>
      ))}
    </List>
  </Container>
);

export default Pagamentos;
