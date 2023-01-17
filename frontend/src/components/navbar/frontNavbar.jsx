import "./frontnavbar.scss";


const NavScrollExample = () => {
 

  return (
    <nav className="navbar background">
    <ul className="nav-list">
        <div className="logo">
            <img src="logo.png"/>
        </div>
        <li><a href="#web">HOME</a></li>
        <li><a href="#program">LOGIN</a></li>
        <li><a href="#course">CONTACT</a></li>
        <li><a href="#course">HELP</a></li>
    </ul>
</nav>
  );
};

export default NavScrollExample;