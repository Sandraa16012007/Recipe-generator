import logoIcon from '../images/logo.png';

export default function Header() {
  return (
    <header className="header">
        <div className="logo-container">
            <img src={logoIcon} alt="Logo" className="logo" />
        </div>
        <h1>Recipe Generator</h1>
    </header>
  )
}