export type NoteColor = 'yellow' | 'blue' | 'red'

export interface Note {
  id: string
  text: string
  x: number
  y: number
  color: NoteColor
  createdAt: number
}
