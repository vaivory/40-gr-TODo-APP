const savedText = {};

function editNote(id, clickedButton) {
    // const container = element.parentElement  //gaunam elementa paspausti mygtuka
    //     .parentElement //einam i jo teva ir poto dar i viena div teva
    //const container=containerOfButton(clickedButton);
    // const noteText = container.querySelector('.note-text');
    // noteText.contentEditable = true; //cia leidzia tiesiogiai i ji rasyti texta
    const elements = getNoteElements(id, clickedButton);
    const { container, noteText } = elements
    savedText[id] = noteText; //issaugom elementa atmintyje

    const input = createNoteEditInput(noteText.initialText);

    container.replaceChild(input, noteText);

    input.focus();

    // setTimeout(() => {
    //     noteText.focus(); //reikia kad uzfocusuotu kad galima butu iskart rasyti ir nereiketu spausti su pele
    //     const range = document.createRange(); //toliau eina aprasymas kaip padeti zymekli eilutes pabaigoj
    //     const selection = window.getSelection(); //pazymetas tekstas
    //     const childNode = noteText.childNodes[0]; //not valid if multiline, istaukiam pirma tekstine eilute, reikes poto su uzbluokoti kad dauhiau nepridetu su Enter nauju eiluciu
    //     range.setStart(childNode, childNode.length);
    //     range.collapse(true);
    //     selection.removeAllRanges(); //pasalynam pazymeta texta
    //     selection.addRange(range); // atsiranda eilutes pabaigoj
    // }, 0);

    enableButtonGroup(container, 'edit');
}

function createNoteEditInput(initialText) {
    const input = document.createElement('input');
    input.classList.add('note-edit')
    input.type = 'text';
    input.value = initialText;
    return input;
}

function containerOfButtons() {

}


function saveEdit(id, clickedButton) {
    // const container = element.parentElement
    //     .parentElement;
    const elements = getNoteElements(id, clickedButton);
    const { container, noteEdit, noteText } = elements;

    // const noteText = container.querySelector('.note-text');
    // noteText.contentEditable = false;

    // const noteEdit = container.querySelector('.note-edit')
    // const noteText = savedText[id];

    // container.replaceChild(noteText, noteEdit);
    // delete savedText[id];
    restoreNoteTextElement(elements);
    noteText.innerText = noteEdit.value;// switch input and text, SAVE input
    enableButtonGroup(container, 'standard');

    fetch('/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }, //kad html galetu issiusti objekta
        body: JSON.stringify({ id, note: noteEdit.value })
    })


    //enableButtonGroup('standart');

}

function deleteNote(id) {
    fetch(`/?id=${id}`, { method: 'delete' })
        .then(res => window.location = res.url);
}

function undoEdit(id, element) {
    // const container = element.parentElement
    //     .parentElement;
    const elements = getNoteElements(id, clickedButton);
    const { container } = elements;

    // const noteEdit = container.querySelector('.note-edit')
    // const noteText = savedText[id];
    restoreNoteTextElement(elements); // switch input and text, don't save input
    enableButtonGroup(container, 'standard');
    //noteText.contentEditable = false;

    // container.replaceChild(noteText, noteEdit);
    // delete savedText[id];

    // enableButtonGroup('standart');

}

function getNoteElements(id, clickedButton) {
    const container = containerOfButton(clickedButton);
    const noteEdit = container.querySelector('.note-edit');
    if (noteEdit) {
        return {
            container,
            noteEdit,
            noteText: savedText[id]
        }
    } else {
        return {
            container,
            noteText: container.querySelector('.note-text')
        }
    }
}

function containerOfButton(buttonElement) {
    return buttonElement.parentElement.parentElement;
}

function restoreNoteTextElement(elements) {
    const { container, noteEdit, noteText } = elements;

    container.replaceChild(noteText, noteEdit);

}


function enableButtonGroup(container, groupClass) {
    container.querySelectorAll('.buttons>button')
        .forEach(button => button.classList.add('hidden')); // paslepiam visus mygtukus
    container.querySelectorAll(`.${groupClass}`)
        .forEach(button => button.classList.remove('hidden')); //rodom tik reikalingus mygtukus
}