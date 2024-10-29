async function connect() {
    //estrategia connection pull -> ele reusa, fecha e abre novas conections
    if (global.connection) {
      return global.connection.connect(); // Retorna uma nova conexão do pool existente
    }
  
    const { Pool } = require("pg"); // Trazendo apenas o pool
  
    const pool = new Pool({
      connectionString: process.env.CONNECTION_STRING
    });
  
    global.connection = pool;
    console.log("Criou o Pool de conexão.");
  
    return pool.connect(); // Retorna uma conexão do novo pool criado
  
  }
  
  connect();

  async function selectProdutos(OrderBy) {
    const {orderBy,direction} = OrderBy
    const client = await connect();
    try {
      const res = await client.query(`SELECT * FROM vw_produtos_and_marcas ORDER BY ${orderBy} ${direction}`);
      console.log(`SELECT * FROM vw_produtos_and_marcas ORDER BY ${orderBy} ${direction}`);
      
      return res.rows;
    } finally {
      client.release(); // Libera a conexão após o uso
    }
  }

  async function selectProdutosById(id) {
    const client = await connect();
    try {
      const res = await client.query("select * from produtos where produto_id=$1", [id]); //prepating query -> faz uma limpeza para evitar sql inject
      return res.rows;
    } finally {
      client.release(); // Libera a conexão após o uso
    }
  }

  async function selectProdutosByNomeOrCategoria(palavra) {
    const client = await connect();
    try {
      const res = await client.query("SELECT * FROM vw_produtos_and_marcas WHERE nome LIKE '%" + [palavra] + "%' OR descricao LIKE '%" + [palavra] + "%'");
      return res.rows;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      client.release(); // Libera a conexão após o uso
    }
  }

  async function selectAllCategorias() {
    const client = await connect();
    try {
      const res = await client.query(`select * from categorias`);
      return res.rows;
    } finally {
      client.release(); // Libera a conexão após o uso
    }
  }

  async function selectByCategoria(categoria) {
    const client = await connect();
    try {
      const res = await client.query(`SELECT * FROM vw_produtos_and_marcas WHERE nome_categoria = '${categoria}'`);
      return res.rows;
    } finally {
      client.release(); // Libera a conexão após o uso
    }
  }

  async function selectAllMarcas() {
    const client = await connect();
    try {
      const res = await client.query(`select * from marcas`);
      return res.rows;
    } finally {
      client.release(); // Libera a conexão após o uso
    }
  }

  async function selectProdutoByMarca(marca_id) {
    const client = await connect();
    try {
      const res = await client.query(`select * from produtos where marca_id =${marca_id}`);
      return res.rows;
    } finally {
      client.release(); // Libera a conexão após o uso
    }
  }

  async function selectClienteByCidade(cidade) {
    const client = await connect();
    try {
      const res = await client.query(`SELECT * FROM enderecos where cidade = '${cidade}'`);
      return res.rows;
    } finally {
      client.release(); // Libera a conexão após o uso
    }
  }


  module.exports = {
    selectProdutos,
    selectProdutosById,
    selectProdutosByNomeOrCategoria,
    selectAllCategorias,
    selectAllMarcas,
    selectProdutoByMarca,
    selectClienteByCidade,
    selectByCategoria
}