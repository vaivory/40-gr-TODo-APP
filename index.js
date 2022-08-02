import express from 'express';
import handlebars from 'express-handlebars';
import mysql from 'mysql2';
//kursim aplikacija

const app = express();
const port = 8081; //pasirenkam porta
app.use(express.static('public')); // per cia bus tiesiogiai pasiekiami resursai

app.set('view engine', 'hbs'); //serverio kintamasis, ka naudosim, jis zinos kad reikia paimti hbs failus ir sukompiliuti juos i html, hbs yra failiko extension kuri mes kursim
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

//app.get('/test', (req, res) => res.render('test')); // ieskos test failiuko
//app.get('/test2', (req, res) => res.render('test2')); // ieskos test failiuko

app.get('/'), (req, test) => res.rendes('index');

//const arr = ['Foo', 'Bar', 'Baz'];
// DB start
const connection = mysql.createConnection({  //per sita connection objekta galesim daryti uzklausas
    host: 'localhost',  //jei tas pats PC tai local host ,je ikitas tai IP adresas
    database: 'classicmodels',
    user: 'classicmodels',
    password: 'bit'

})
app.get('/db', (req, res) => {
    connection.execute('SELECT productLine, textDescription FROM productlines', (err, rows) => {
        const data = rows.map(row => row);
        res.render('db', { data: data });
    });
}); // i musu template mes paduodam musu masyva
// DB end

//kuriam router, t.y. koks bus narsykles adresas
//app.get('/', (req, res) => res.send('Hello World'));


app.listen(port, () => console.log(`Starting server on port ${port}`));
