class Note {

  constructor(data){
  this.id = data.id
  this.title = data.title
  this.body = data.body
  Note.all.push(this)
}

  static newNoteDb(newTitle, newBody){

    fetch(`http://localhost:3000/api/v1/notes`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({'title': newTitle, 'body': newBody, 'user_id': 1})
    })
      .then(resp => resp.json()).then(note => {let newNote = new Note(note)
        container.innerHTML += `
          <div id="${newNote.id}">
          <h1>${newNote.title}</h1>
          <p>${newNote.body}</p>
          <button id="delete${newNote.id}">Delete Note</button>
          </div>
        `
        document.getElementById('title_input').value = ""
        document.getElementById('body_input').value = ""
        document.getElementById('edit').dataset.id = "new"
      })

    //   let newNote = new Note
    //
    //   document.getElementById(`${this.id}`).querySelector("h1").innerText = this.title
    //   document.getElementById(`${this.id}`).querySelector("p").innerText = this.body
    //   //  After assigning new values, empty the prepopulated form
    //   document.getElementById('title_input').value = ""
    //   document.getElementById('body_input').value = ""
    //   document.getElementById('edit').dataset.id = "new"
    //
    // }.bind(this))
    //

  };


  update (newTitle, newBody){

    fetch(`http://localhost:3000/api/v1/notes/${this.id}`, {method: 'PATCH', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({'title': newTitle, 'body': newBody})}).then(resp => resp.json()).then(function(){
      this.title = newTitle
      this.body = newBody

      document.getElementById(`${this.id}`).querySelector("h1").innerText = this.title
      document.getElementById(`${this.id}`).querySelector("p").innerText = this.body
      //  After assigning new values, empty the prepopulated form
      document.getElementById('title_input').value = ""
      document.getElementById('body_input').value = ""
      document.getElementById('edit').dataset.id = "new"

      }.bind(this))
    };

    delete(){
      fetch(`http://localhost:3000/api/v1/notes/${this.id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
      })
      .then(resp => resp.json())
      .then(function(){
        document.getElementById(`${this.id}`).remove()
        console.log(`${this.id} is line 69`)
        Note.all.filter(x => x.id !== parseInt(this.id))
      }.bind(this))
    };

};

Note.all = []
