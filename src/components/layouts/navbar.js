

function Navbar() {
  return (
    <div className="navbar">
        <nav>
            <div className="navbar-branding">
                <img src="/logo.svg" alt="LOGO" className="app-logo"/>
                <span className="app-name">AuctionApp</span>
            </div>
            <ul>
                <li> <a href="/settings">Settings</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar