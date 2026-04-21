import { MdAdd } from 'react-icons/md'
import './Header.css'

interface HeaderProps {
  onAddNote: () => void
}

export function Header({ onAddNote }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header__title">My Post-it Notes</h1>
      <button className="header__add-btn" onClick={onAddNote} aria-label="Add note">
        <MdAdd size={24} />
      </button>
    </header>
  )
}
