

document.addEventListener('DOMContentLoaded', function(event) {
  Adapter.getNotes()

// Selecting the from the notes to prepopulate the edit note form
  document.getElementById("note-list").addEventListener("click", event => {
    let myNote = Note.all.find(n => n.id === parseInt(event.path[1].id))
    if (event.target.id === `delete${myNote.id}`) {
      myNote.delete()
    } else {
    document.getElementById('title_input').value = myNote.title
    document.getElementById('body_input').value = myNote.body
    // NOW changes the dataset.id to tell me it is an EDIT form!
    document.getElementById('edit').dataset.id = myNote.id
  }});

  document.getElementById("edit-submit").addEventListener("click", event => {
    //Check whehter form is blank and dataset = "new"
    if(event.path[1].dataset.id === "new"){
      let newTitle = event.target.parentElement.children[1].value
      let newBody = event.target.parentElement.children[4].value
      Note.newNoteDb(newTitle,newBody)
    } else {

      let noteId = event.path[1].dataset.id
      let newTitle = event.target.parentElement.children[1].value
      let newBody = event.target.parentElement.children[4].value
      let updateNote = Note.all.find(n => n.id === parseInt(noteId))
      updateNote.update(newTitle, newBody)
    }
      //Note.update()

      // let myNote = Note.all.find(n => n.id === parseInt(event.path[1].dataset.id))
      // let newTitle = ""
      // let newBody = ""
      // console.log(event)

});







});
