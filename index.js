
const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const sql = require('mssql');

//Nessa Linha Como uso Azure nao posso esquecer do (encrypt=tue)
const connStr = "Server=XXX;Database=XXX;User Id=XXX;Password=XXX;encrypt=true";

sql.connect(connStr)
   .then(conn => global.conn = conn)
   .catch(err => console.log(err));

   app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);


//inicia o servidor
app.listen(port);
console.log('Banco de Dados conectado');

function execSQLQuery(sqlQry, res){
    global.conn.request()
               .query(sqlQry)
               .then(result => res.json(result.recordset))
               .catch(err => res.json(err));
}


router.post('/cadastro', (req, res) =>{
    const id = parseInt(req.body.id);
    const recebido = req.body.recebido.substring(0,150);
    const proprietario = req.body.proprietario.substring(0,150);
    const endereco = req.body.endereco.substring(0,150);
    const descricao = req.body.descricao.substring(0,150);
    const codigo = req.body.codigo.substring(0,150);
    execSQLQuery(`INSERT INTO Cadastro(ID, RECEBIDO, PROPRIETARIO,ENDERECO,DESCRICAO,CODIGO) VALUES(${id},'${recebido}','${proprietario}','${endereco}','${descricao}','${codigo}')`, res);
})


router.get('/cadastro', (req, res) =>{
    execSQLQuery('SELECT * FROM Cadastro', res);
})


router.delete('/cadastro/:id', (req, res) =>{
    execSQLQuery('DELETE cadastro WHERE id=' + parseInt(req.params.id), res);
})

// para utilização do filtro de pesquisa

//router.get('/cadastro/:id?', (req, res) =>{
  //  let filter = '';
    //if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    //execSQLQuery('SELECT * FROM Cadastro' + filter, res);
//})
