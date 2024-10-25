/* Nome do banco de dados criado no pgAdmin: registroUsuarios
   Nome da tabela: usuarios */
const {Pool} = require('pg');

const pool = new Pool ({
    user: "postgres",
    host: "localhost",
    database: "registroUsuarios", /*nome do banco de dados criado no postgres/pgAdmin */
    password: "postgres",
    port: 5432,
    max: 5, /* Número máximo de requisições conectadas */
    idleTimeoutMillis: 30000 /* Tempo máximo de conexão */
});

async function selecionarUsuario() {
    try{
        const responseDB = await pool.query("SELECT * FROM usuarios")
        console.log(`Usuários cadastrados: `, responseDB.rows);
    } catch(error) {
        console.log(`A consulta retornou: ${error.message}`);
    }
};

async function cadastrarUsuario(nome, idade, email, senha) {
    try{
        const responseDB = await pool.query(`INSERT INTO usuarios(nome, idade, email, senha) VALUES ($1, $2, $3, $4)`, [nome, idade, email, senha]);
    } catch(error) {
        console.log(`A consulta retornou: ${error.message}`);
    }
};

async function excluirTodosUsuarios() {
    try{
        /* RESTART IDENTIFY: reinicia a contagem dos IDs */
        const responseDB = await pool.query("TRUNCATE TABLE usuarios RESTART IDENTIFY");
        console.log('Lista atual: ', responseDB.row);
    } catch(error) {
        console.log(`A consulta retornou: ${error.message}`);
    }
}

async function executar() {
    await cadastrarUsuario("José", 37, "josé@gmail.com", "kjhgfds");
    await selecionarUsuario();
}

executar()