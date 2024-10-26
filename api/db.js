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


async function selectAlunos(OrderBy) {
  const {orderBy,direction} = OrderBy
  const client = await connect();
  try {
    const res = await client.query(`select * from alunos ORDER BY ${orderBy} ${direction}`);
    return res.rows;
  } finally {
    client.release(); // Libera a conexão após o uso
  }
}

async function selectAlunosById(id) {
  const client = await connect();
  try {
    const res = await client.query("select * from alunos where aluno_id=$1", [id]); //prepating query -> faz uma limpeza para evitar sql inject
    return res.rows;
  } finally {
    client.release(); // Libera a conexão após o uso
  }
}

async function selectAlunosByNomeOrCurso(palavra) {
  const client = await connect();

  try {
    const res = await client.query("SELECT * FROM alunos WHERE nome LIKE '%" + [palavra] + "%' OR curso LIKE '%" + [palavra] + "%'");
    return res.rows;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.release(); // Libera a conexão após o uso
  }
}
async function selectAlunosByCategoria(categoria) {
  const client = await connect();
  try {
    const res = await client.query("SELECT * FROM alunos WHERE curso LIKE '%" + [categoria] + "%'");
    return res.rows;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.release(); // Libera a conexão após o uso
  }
}


async function selectAllCursos() {
  const client = await connect();
  try {
    const res = await client.query(`select * from cursos`);
    return res.rows;
  } finally {
    client.release(); // Libera a conexão após o uso
  }
}

async function selectAlunosForCurso(curso) {
  const client = await connect();
  try {
    const res = await client.query(`SELECT * FROM alunos WHERE curso = '${curso}'`);
    return res.rows;
  } finally {
    client.release(); // Libera a conexão após o uso
  }
}

async function createAlunos(aluno) {
  try {
    const client = await connect();
    const sql = "INSERT INTO alunos(nome,idade,curso) VALUES ($1,$2,$3)"
    await client.query(sql, [aluno.nome, aluno.idade, aluno.curso])
  }
  catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.release(); // Libera a conexão após o uso
  }

}

async function updateAluno(id, aluno) {
  const client = await connect();
  try {
    const sql = "UPDATE alunos SET nome=$1,idade=$2,curso=$3 WHERE aluno_id = $4"
    values = [aluno.nome, aluno.idade, aluno.curso, id]
    await client.query(sql, values)
  }
  catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.release(); // Libera a conexão após o uso
  }

}

async function deleteAluno(id) {
  const client = await connect();
  try {
    const sql = "delete from alunos where aluno_id=$1"; //prepating query -> faz uma limpeza para evitar sql inject
    return await client.query(sql, [id]);
  }
  catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.release(); // Libera a conexão após o uso
  }
}

// async function selectAlunosIdade() {
//   const client = await connect();
//   try {
//     const res = await client.query("select from alunos where idade >= ");
//     return res.rows;
//   } finally {
//     client.release(); // Libera a conexão após o uso
//   }
// }

module.exports = {
  selectAlunos,
  selectAlunosById,
  createAlunos,
  updateAluno,
  deleteAluno,
  selectAlunosByNomeOrCurso,
  selectAlunosByCategoria,
  selectAllCursos,
  selectAlunosForCurso

}