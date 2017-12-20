class Adapter {

  static getNotes() {fetch('http://localhost:3000/api/v1/users/1').then
      (res => res.json()).then(json => this.createNotes(json)).then(stuff => this.displayNotes())
        }

  static createNotes(json) {
    json.notes.forEach(note => new Note(note))
  }

  static displayNotes(){
    const container = document.querySelector('#note-list')
    container.innerHTML = ''
    Note.all.forEach(function(note){
      container.innerHTML += `
        <div id="${note.id}">
        <h1>${note.title}</h1>
        <p>${note.body}</p>
        <button class='btn-danger' id="delete${note.id}">Delete Note</button>

        </div>
      `
    })
  }

}
