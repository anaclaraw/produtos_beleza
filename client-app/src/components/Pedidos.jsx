// Pedidos.js
import React from 'react';
import styled from 'styled-components';

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
`;

const ListItem = styled.li`
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  margin-bottom: 10px;
  display: flex;
  justify-content: left;
  align-items: flex-start;
  border-left: 8px solid #f7e6af ;

`;

const PedidoInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PedidoID = styled.span`
  font-weight: bold;
  color: #333;
`;

const PedidoStatus = styled.span`
  font-size: 0.9em;
  color: ${(props) => (props.status === 'Pagamento Aprovado' ? 'green' : 'orange')};
`;

const TransportePedido = styled.span`
  font-size: 0.9em;
  color: #000000b0;
`;

const Pedidos = ({ data }) => (
  <Container>
    <Title>Pedidos</Title>
    <List>
      {data.map((pedido) => (
        <ListItem key={pedido.id}>
          <PedidoInfo>
            <PedidoID>Pedido {pedido.pedido_id}</PedidoID>
            <TransportePedido>
            {pedido.transporte} 
            </TransportePedido> 
            <PedidoStatus status={pedido.status}>{pedido.status}</PedidoStatus>
           
          </PedidoInfo>
        </ListItem>
      ))}
    </List>
  </Container>
);

export default Pedidos;
