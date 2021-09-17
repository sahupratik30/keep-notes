import React, { useContext, useState } from "react";
import NotesContext from "../../store/notes-context";
import Card from "../UI/Card";
import classes from "./NoteItem.module.css";
const NoteItem = (props) => {
  const notesCtx = useContext(NotesContext);
  const [isHovering, setIsHovering] = useState(false);
  const deleteNoteHandler = () => {
    notesCtx.deleteNote(props.id);
  };
  return (
    <div
      className={classes.note__item}
      onMouseOver={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
    >
      <Card>
        <h3>{props.title}</h3>
        <p>{props.note}</p>
        {isHovering && (
          <button onClick={deleteNoteHandler}>
            <i className="fas fa-trash"></i>
          </button>
        )}
      </Card>
    </div>
  );
};

export default NoteItem;
