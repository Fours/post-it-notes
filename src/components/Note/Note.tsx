import { useEffect, useRef, useState } from 'react'
import { MdDragIndicator } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import type { Note as NoteType } from '../../types'
import './Note.css'

interface NoteProps {
  note: NoteType
  onUpdate: (id: string, text: string) => void
  onUpdatePosition: (id: string, x: number, y: number) => void
  onDelete: (id: string) => void
}

export function Note({ note, onUpdate, onUpdatePosition, onDelete }: NoteProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(note.text)
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null)
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

  function handleDragMouseDown(e: React.MouseEvent) {
    e.preventDefault()
    const startMX = e.clientX
    const startMY = e.clientY
    const startNX = note.x
    const startNY = note.y

    function onMove(ev: MouseEvent) {
      setDrag({
        x: startNX + (ev.clientX - startMX),
        y: startNY + (ev.clientY - startMY),
      })
    }

    function onUp(ev: MouseEvent) {
      const finalX = startNX + (ev.clientX - startMX)
      const finalY = startNY + (ev.clientY - startMY)
      onUpdatePosition(note.id, finalX, finalY)
      setDrag(null)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  return (
    <div
      className={`note${isEditing ? ' note--editing' : ''}`}
      style={{ left: drag?.x ?? note.x, top: drag?.y ?? note.y }}
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
        <>
          <div className="note__body" onClick={startEditing}>
            {note.text ? (
              <p className="note__text">{note.text}</p>
            ) : (
              <p className="note__placeholder">Click to add a note…</p>
            )}
          </div>
          <footer>
            <div className="left-col">
              <button className="note__button-drag" onMouseDown={handleDragMouseDown}>
                <MdDragIndicator size={24} />
              </button>
              <button className="color-picker">&nbsp;</button>
              <button className="color-picker blue">&nbsp;</button>
              <button className="color-picker yellow">&nbsp;</button>              
            </div>
            <div className="right-col">
              <button className="note__button-delete" onClick={() => onDelete(note.id)}>
                <FaRegTrashAlt size={20} />
              </button>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}
