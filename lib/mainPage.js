//cia bus viso puslapio logika
export default function renderMainPage(req, res) {
    const model={};
    const newNote=req.query.note;
    model.title='My To-Do App';
    const notes=['Example note text',
    'Another note',
    'Add another note'
    ];
    if (newNote) {
        notes.push(newNote);
    }
    model.notes=notes;
    res.render('index',{model})
}