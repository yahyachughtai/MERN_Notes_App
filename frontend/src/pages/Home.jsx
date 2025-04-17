import React, { useEffect, useState } from "react";
import AddNote from "../components/AddNote";
import NoteCard from "../components/NoteCard";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api";

export default function Home() {
    const msgStyle = {
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        height: "50vh",
        color: "#aaa",
        letterSpacing: "1px",
        fontSize: "1.3em",
    };

    const [notes, setNotes] = useState([]);

    // Function to fetch notes
    const fetchNotes = async () => {
        try {
            const res = await axios.get(`${API_URL}/allNotes`);
            if (res.data.content) {
                setNotes(res.data.content);
            } else {
                setNotes([]);
            }
        } catch (err) {
            console.error("Error fetching notes:", err);
        }
    };

    // Fetch notes on component mount
    useEffect(() => {
        fetchNotes();
    }, []);

    // Function to handle adding a new note (called by AddNote component)
    const handleAddNote = async (note) => {
        try {
            await axios.post(`${API_URL}/addNote`, note);
            // Refresh notes after adding
            fetchNotes();
        } catch (err) {
            console.error("Error adding note:", err);
        }
    };

    return (
        <div>
            <h1 className="headline">
                Save Your <span>Notes</span> Here
            </h1>

            <div className="cards">
                {notes && notes.length > 0 ? (
                    notes.map((note) => (
                        <NoteCard key={note._id} note={note} />
                    ))
                ) : (
                    <p style={msgStyle}>No Notes To Show</p>
                )}
            </div>
            <AddNote onAddNote={handleAddNote} />
        </div>
    );
}