import express from 'express';
import handlebars from 'express-handlebars';
//kursim aplikacija

const app = express();
const port = 8081; //pasirenkam porta
app.use(express.static('public')); // per cia bus tiesiogiai pasiekiami resursai

app.set('view engine', 'hbs'); //serverio kintamasis, ka naudosim, jis zinos kad reikia paimti hbs failus ir sukompiliuti juos i html, hbs yra failiko extension kuri mes kursim
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

app.get('/test', (req, res) => res.render('test')); // ieskos test failiuko
app.get('/test2', (req, res) => res.render('test2')); // ieskos test failiuko





//kuriam router, t.y. koks bus narsykles adresas
app.get('/', (req, res) => res.send('Hello World'));

app.listen(port, () => console.log(`Starting server on port ${port}`));
