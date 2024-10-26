require('dotenv').config(); // Chamando as váriaveis de ambiente
const cors = require('cors');
const db = require('./db') // Chamando arquivo com conexão com o banco

const port = process.env.PORT; // varavel de ambiente que possui o número da porta

const express = require('express'); //para criação da API

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.json({message:"Funcioando!"})
    
})

app.get('/alunos', async (req,res)=>{ 
    const alunos = await db.selectAlunos(req.query)
    res.json(alunos)
    
})

app.get('/alunos/:id', async (req,res)=>{
    const alunos = await db.selectAlunosById(req.params.id)
    res.json(alunos)
    
})
app.get('/alunos/categoria/:palavra', async (req,res)=>{
    const alunos = await db.selectAlunosByNomeOrCurso(req.params.palavra)
    res.json(alunos)
})

app.post('/alunos', async (req,res)=>{
    await db.createAlunos(req.body)
    res.sendStatus(201)
})

app.delete('/alunos/:id', async (req,res)=>{
    const alunos = await db.deleteAluno(req.params.id)
    res.json(alunos)   
})

app.patch('/alunos/:id', async (req,res)=>{
    await db.updateAluno(req.params.id, req.body)
    res.sendStatus(200)
})

app.get('/cursos', async (req,res)=>{
    const alunos = await db.selectAllCursos(req.params.palavra)
    res.json(alunos)
})

app.get('/alunos/curso/:curso', async (req,res)=>{
    const alunos = await db.selectAlunosForCurso(req.params.curso)
    res.json(alunos)
})



app.listen(port);

