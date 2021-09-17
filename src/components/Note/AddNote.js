import React, { useContext, useState } from "react";
import NotesContext from "../../store/notes-context";
import Card from "../UI/Card";
import classes from "./AddNote.module.css";
const AddNote = () => {
  const notesCtx = useContext(NotesContext);
  const [isTouched, setIsTouched] = useState(false);
  const [formState, setFormState] = useState({
    title: "",
    note: "",
  });
  const handleTitleChange = (event) => {
    setFormState((prevState) => {
      return {
        title: event.target.value,
        note: prevState.note,
      };
    });
  };
  const handleNoteChange = (event) => {
    setFormState((prevState) => {
      return {
        title: prevState.title,
        note: event.target.value,
      };
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredTitle = formState.title;
    const enteredNote = formState.note;
    if (enteredTitle.trim().length === 0 || enteredNote.trim().length === 0) {
      return;
    }
    notesCtx.addNote(enteredTitle, enteredNote);
    // Save to localstorage...
    setIsTouched(false);
    setFormState({
      title: "",
      note: "",
    });
  };
  return (
    <div className={classes.note}>
      <Card>
        <form className={classes.note__form} onSubmit={submitHandler}>
          {isTouched && (
            <input
              type="text"
              placeholder="Title"
              value={formState.title}
              onChange={handleTitleChange}
            />
          )}
          <textarea
            placeholder="Take a note..."
            onFocus={() => {
              setIsTouched(true);
            }}
            value={formState.note}
            onChange={handleNoteChange}
          ></textarea>
          {isTouched && (
            <button>
              <i className="fas fa-lg fa-plus"></i>
            </button>
          )}
        </form>
      </Card>
    </div>
  );
};

export default AddNote;
