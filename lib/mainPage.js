//cia bus viso puslapio logika

import mysql from 'mysql2';

export function renderMainPage(req, res) {
    const model = {};
    const newNote = req.query.note;
    model.title = 'My To-Do App';
    // const notes=['Example note text',
    // 'Another note',
    // 'Add another note'
    // ];
    //turim patikrint iar turim nauja irasa
    const connection = connect();
    if (newNote) {
        Promise.resolve()
            .then(_ => saveNote(connection, newNote))
            .then(_ => getNotes(connection))
            .then(notes => ({ ...model, notes }))
            .then(model => res.render('index', { model }))
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

    else {
        Promise.resolve()
            .then(_ => getNotes(connection))
            .then(notes => {
                model.notes = notes;
                res.render('index', { model });
            })

    }
}

// if (newNote) {
//     notes.push(newNote);
// }

export function insertNewNote(req, res) {
    const newNote = req.body.note;
    const connection = connect();
    Promise.resolve()
        .then(_ => saveNote(connection, newNote))
        .then(_ => res.redirect('/'))
        .catch(err => {
            console.log(err);
            res.render('error', { model: { errorName: err.name, message: err.message, stack: err.stack } });
        });
}

export function deleteNote(req, res) {
    const id = req.query.id;
    console.log(id);
    const connection = connect();
    Promise.resolve()
        .then(_ => deleteNoteById(connection, id))
        .then(_ => res.redirect('/'))
        .catch(err => {
            console.log(err);
            res.render('error', { model: { errorName: err.name, message: err.message, stack: err.stack } });
        });

}
//SELECT note from notes
function connect() {  //funkcija kuri sukuria prisijungima
    return mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'todoapp',
        password: 'bit',
        database: 'todoapp'
    });
}


async function getNotes(connection) {
    return await new Promise((resolve, reject) => {
        connection.execute('SELECT noteId, note from notes;', (err, rows) => {
            if (err) return reject(err);

            const notes = rows;
            return resolve(notes);
        })
    });
}

export function editNote(req, res) {
    const id = req.body.id;
    const note = req.body.note;

    Promise.resolve()
        .then(_ => saveNoteChanges(connect(), id, note))
        .then(_ => res.status(200).send())
        .catch(err => {
            console.log(err);
            res.status(400).send()
        });
}

//darom kad issaugoti

async function saveNote(connection, note) {
    return await new Promise((resolve, reject) => {
        connection.execute('INSERT notes(note) VALUES(?)', [note], (err, _) => {
            if (err) return reject(err); // jei klaida tai meta klaida ir viska crashina
            resolve();
        });
    });
}

async function deleteNoteById(connection, noteId) {
    console.log(noteId);
    return await new Promise((resolve, reject) => {
        connection.execute('DELETE FROM notes WHERE noteId = ?', [noteId], (err, _) => {
            if (err) return reject(err);
            resolve();
        });
    })
}

//dabar kursim editinimo f-ja
async function saveNoteChanges(connection, noteId, note) {
    return await new Promise((resolve, reject) => {
        connection.execute('UPDATE notes SET note=? WHERE noteId=?', [note, noteId], (err, _) => {
            if (err) return reject(err);
            resolve();
        });
    })
}