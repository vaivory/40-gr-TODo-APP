//cia bus viso puslapio logika
export default function renderMainPage(req, res) {
    const model={};
    model.title='My To-Do App';
    res.render('index',{model})
}