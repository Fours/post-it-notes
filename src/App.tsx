import { useRef } from 'react'
import './App.css'
import { Header } from './components/Header/Header'
import { Note } from './components/Note/Note'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { Note as NoteType } from './types'

function App() {
  const [notes, setNotes] = useLocalStorage<NoteType[]>('post-it-notes', [])
  const wallRef = useRef<HTMLDivElement>(null)

  function addNote() {
    const w = wallRef.current?.clientWidth ?? 800
    const h = wallRef.current?.clientHeight ?? 600
    const newNote: NoteType = {
      id: crypto.randomUUID(),
      text: '',
      x: Math.max(0, (w - 300) / 2),
      y: Math.max(0, (h - 300) / 2),
      createdAt: Date.now(),
    }
    setNotes([...notes, newNote])
  }

  function updateNoteText(id: string, text: string) {
    setNotes(notes.map(n => (n.id === id ? { ...n, text } : n)))
  }

  function updateNotePosition(id: string, x: number, y: number) {
    setNotes(notes.map(n => (n.id === id ? { ...n, x, y } : n)))
  }

  function deleteNote(id: string) {
    setNotes(notes.filter(n => n.id !== id))
  }

  return (
    <>
      <Header onAddNote={addNote} />
      <div className="wall" ref={wallRef}>
        {notes.map(note => (
          <Note
            key={note.id}
            note={note}
            onUpdate={updateNoteText}
            onUpdatePosition={updateNotePosition}
            onDelete={deleteNote}
          />
        ))}
      </div>
    </>
  )
}

export default App
