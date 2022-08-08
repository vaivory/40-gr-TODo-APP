import { connect } from "./connect.js";
import * as db from "./database.js";

export function getNotes(req, res) {
    const model = {};
    //const newNote = req.query.note;
    model.title = 'My To-Do App';
    // const notes=['Example note text',
    // 'Another note',
    // 'Add another note'
    // ];
    //turim patikrint iar turim nauja irasa
    const connection = connect();
    
        Promise.resolve()
            .then(_ => db.selectNotes(connection))
            .then(notes => ({...model, notes}))
            .then(model => res.render('index', {model}))
            .catch(err => {
                console.log(err);
                //res.send(err.stack);
                res.render('error', { model: { errorName: err.name, message: err.message, stack: err.stack } });
            }); //atvaizduojam klaidos pranesima ir galim atlikti kazkoki veiksma arba praleidziam

        // connect().execute('SELECT note FROM notes;', (err, rows) => {
        //     if (err) throw err;
        //     const notes = rows.map(row => row.note);
        //     model.notes = notes;
        //     res.render('index', { model }); // mes atsiusim atsakyma tik tada ka igausim atsakyma is DB
        // })


    }

   


// if (newNote) {
//     notes.push(newNote);
// }

export function addNote(req, res) {
    console.log(req.body);
    const {note, priority, style} = req.body;
    
    const connection = connect();
    Promise.resolve()
        .then(_ => db.insertNote(connection, newNote, priority))
        .then(_ => res.redirect('/'))
        .catch(err => {
            console.log(err);
            res.render('error', {model: {errorName: err.name, message: err.message, stack: err.stack}});
        });
} 

export function deleteNote(req, res) {
    const id = req.query.id;
    const connection = connect();
    Promise.resolve()
        .then(_ => db.deleteNote(connection, id))
        .then(_ => res.redirect(303, '/'))
        .catch(err => {
            console.log(err);
            res.render('error', {model: {errorName: err.name, message: err.message, stack: err.stack}});
        });
}

export function updateNote(req, res) {
    const id = req.body.id;
    const note = req.body.note;
    Promise.resolve()
           .then(_ => db.updateNote(connect(), id, note))
           .then(_ => res.status(200).send())
           .catch(err => {
                console.log(err);
                res.status(400).send();
            })
} 