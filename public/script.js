const savedText = {};

function editNote(id, element) {
    const container = element.parentElement  //gaunam elementa paspausti mygtuka
        .parentElement //einam i jo teva ir poto dar i viena div teva
    const noteText = container.querySelector('.note-text');
    noteText.contentEditable = true; //cia leidzia tiesiogiai i ji rasyti texta
    savedText[id] = noteText.innerText;
    setTimeout(() => {
        noteText.focus(); //reikia kad uzfocusuotu kad galima butu iskart rasyti ir nereiketu spausti su pele
        const range = document.createRange(); //toliau eina aprasymas kaip padeti zymekli eilutes pabaigoj
        const selection = window.getSelection(); //pazymetas tekstas
        const childNode = noteText.childNodes[0]; //not valid if multiline, istaukiam pirma tekstine eilute, reikes poto su uzbluokoti kad dauhiau nepridetu su Enter nauju eiluciu
        range.setStart(childNode, childNode.length);
        range.collapse(true);
        selection.removeAllRanges(); //pasalynam pazymeta texta
        selection.addRange(range); // atsiranda eilutes pabaigoj
    }, 0);

    container.querySelectorAll('.buttons>button')
        .forEach(button => button.classList.add('hidden'));
    container.querySelectorAll('.edit')
        .forEach(button => button.classList.remove('hidden'));
    console.log(id, element);
}




function saveEdit(id, element) {
    const container = element.parentElement
        .parentElement;

    const noteText = container.querySelector('.note-text');
    noteText.contentEditable = false;

    fetch('/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }, //kad html galetu issiusti objekta
        body: JSON.stringify({ id, note: noteText.innerText })
    })


    container.querySelectorAll('.buttons>button')
        .forEach(button => button.classList.add('hidden'));
    container.querySelectorAll('.edit')
        .forEach(button => button.classList.remove('hidden'));

}

function deleteNote(id) {
    fetch(`/?id=${id}`, { method: 'delete' })
        .then(res => window.location = res.url);
}

function undoEdit(id, element) {
    const container = element.parentElement
        .parentElement;

    const noteText = container.querySelector('.note-text');
    noteText.contentEditable = false;

    noteText.innerText = savedText[id];
    delete savedText[id];

    container.querySelectorAll('.buttons>button')
        .forEach(button => button.classList.add('hidden'));
    container.querySelectorAll('.edit')
        .forEach(button => button.classList.remove('hidden'));

}