import { useEffect, useRef, useState } from 'react'
import type { Note as NoteType } from '../../types'
import './Note.css'

interface NoteProps {
  note: NoteType
  onUpdate: (id: string, text: string) => void
}

export function Note({ note, onUpdate }: NoteProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(note.text)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing) {
      textareaRef.current?.focus()
    }
  }, [isEditing])

  function startEditing() {
    setDraft(note.text)
    setIsEditing(true)
  }

  function save() {
    onUpdate(note.id, draft)
    setIsEditing(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Escape') {
      setDraft(note.text)
      textareaRef.current?.blur()
    }
  }

  return (
    <div
      className={`note${isEditing ? ' note--editing' : ''}`}
      style={{ left: note.x, top: note.y }}
    >
      {isEditing ? (
        <textarea
          ref={textareaRef}
          className="note__textarea"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className="note__body" onClick={startEditing}>
          {note.text ? (
            <p className="note__text">{note.text}</p>
          ) : (
            <p className="note__placeholder">Click to add a note…</p>
          )}
        </div>
      )}
    </div>
  )
}
