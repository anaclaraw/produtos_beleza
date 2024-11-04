// Pedidos.js
import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const Pedidos = ({ data }) => {

  const [param, setParam] = useState('pedidos');
  
  const [dados, setDados] = useState(data);
  const [orderBy, setOrderBy] = useState('pedido_id');
  const [direction, setDirection] = useState('DESC');
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    if (shouldFetch) {
      fetchDados(param);
      setShouldFetch(false); // Reseta o controle de fetch após a execução
    }
  }, [shouldFetch, param]);
  
  const handleOrderByChange = (event) => {
    switch (event.target.value) {
      case "todos":
        setParam("pedidos");
        break;
      case "30_dias":
        setDirection("DESC");
        setParam("pedidos/data/30");
        break;
      case "7_dias":
        setDirection("DESC");
        setParam("pedidos/data/7");
        break;
      default:
        return <p>Bem-vindos(as) à administração da T-Beauty!</p>;
    }
    setShouldFetch(true); // Sinaliza que o fetch deve ser feito após alterar param
  };

  const fetchDados = async (endpoint) => {
    const url = `http://localhost:9005/${endpoint}`;
    console.log('dados:',dados);
    
    try {
      const response = await axios.get(url, { params: { orderBy, direction }});
     
      setDados(response.data);
      
    } catch (error) {
      console.error('Erro ao buscar:', error);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title>Pedidos</Title>
      <SelectPedidos onChange={handleOrderByChange}>
        <option value="">Ordenar por:</option>
        <option value="todos">Todos</option>
        <option value="7_dias">Últimos 7 dias</option>
        <option value="30_dias">Últimos 30 dias</option>
      </SelectPedidos>
      <List>
        {dados.map((pedido) => (
          <ListItem key={pedido.id}>
            <PedidoInfo>
              <PedidoID>Pedido {pedido.pedido_id}</PedidoID>
              <TransportePedido>
                {pedido.transporte}
              </TransportePedido>
              <TransportePedido >{pedido.data_pedido}</TransportePedido>
              <PedidoStatus status={pedido.status_pedido}>{pedido.status_pedido}</PedidoStatus>

            </PedidoInfo>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Pedidos;


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

const SelectPedidos = styled.select`
  font-size: 0.9em;
  color: #000000b0;
  padding: 5px;
  border-radius: 20px;
`;
