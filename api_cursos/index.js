require('dotenv').config(); // Chamando as váriaveis de ambiente
const cors = require('cors');
const db = require('./db') // Chamando arquivo com conexão com o banco

const port = process.env.PORT; // varavel de ambiente que possui o número da porta

const express = require('express'); //para criação da API

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.json({message:"Funcionando!"}) 
})

app.get('/produtos/', async (req,res)=>{ 
    const produtos = await db.selectAllProdutos(req.query)
    res.json(produtos)
})

app.get('/produtos/:id', async (req,res)=>{ 
    const produtos = await db.selectProdutosById(req.params.id) 
    res.json(produtos)
})

app.get('/produtos/marca/:id', async(req,res)=>{
    const marcas = await db.selectProdutoByMarca(req.params.id)
    res.json(marcas)
})

app.get('/produtos/categoria/:categoria', async (req,res)=>{
    const categorias = await db.selectByCategoria(req.params.categoria)
    res.json(categorias)
})

app.get('/produtos/busca/:palavra', async (req,res)=>{
    const produtos = await db.selectProdutosByNomeOrCategoria(req.params.palavra)
    res.json(produtos)
})

app.get('/categorias/', async (req,res)=>{
    const categorias = await db.selectAllCategorias()
    res.json(categorias)
})

app.get('/marcas/', async(req,res)=>{
    const marcas = await db.selectAllMarcas()
    res.json(marcas)
})

app.get('/clientes/', async(req,res)=>{
    const clientes = await db.selectAllClientes()
    res.json(clientes)
})

app.get('/pedidos/', async(req,res)=>{
    const pedidos = await db.selectAllPedidos()
    res.json(pedidos)
})

app.get('/pedidos/data/:dias', async(req,res)=>{
    const pedidos = await db.selectPedidosByData(req.params.dias, req.query)
    res.json(pedidos)
})

app.get('/pagamentos/', async(req,res)=>{
    const pagamentos = await db.selectAllPagamentos()
    res.json(pagamentos)
})

app.get('/promocoes/', async(req,res)=>{
    const promocoes = await db.selectAllPromocoes()
    res.json(promocoes)
})

app.get('/subcategorias/', async(req,res)=>{
    const subcategorias = await db.selectAllSubcategorias()
    res.json(subcategorias)
})

app.get('/estoque/', async(req,res)=>{
    const estoque = await db.selectAllEstoque()
    res.json(estoque)
})



app.get('/clientes/cidade/:cidade', async(req,res)=>{
    const marcas = await db.selectClienteByCidade(req.params.cidade)
    res.json(marcas)
})

app.listen(port);