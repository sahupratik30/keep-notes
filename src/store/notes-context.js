import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const NotesContext = React.createContext({
  notes: [],
  addNote: (title, note) => {},
  deleteNote: (id) => {},
});
export const NotesContextProvider = (props) => {
  const [notes, setNotes] = useState([]);
  // Extract notes from localstorage
  useEffect(() => {
    const allNotes = JSON.parse(localStorage.getItem("notes"));
    if (allNotes) {
      setNotes(allNotes);
    }
  }, []);
  const onAddNote = (title, note) => {
    const newNote = {
      id: Date.now(),
      title,
      note,
    };
    setNotes((prevNotes) => {
      return prevNotes.concat(newNote);
    });
    toast.success("Note added successfully!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const onDeleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
    toast.warning("Note deleted!", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  // Save notes to localstorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  const notesContextValue = {
    notes: notes,
    addNote: onAddNote,
    deleteNote: onDeleteNote,
  };
  return (
    <NotesContext.Provider value={notesContextValue}>
      {props.children}
    </NotesContext.Provider>
  );
};

export default NotesContext;
