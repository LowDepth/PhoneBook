const Dropdown = ({ listExample }) => {
  return (
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            List of Exercises
          </a>

          <ul className="dropdown-menu">
            {listExample.map((item) => (
              <li key={item.path}>
                <DropdownList link={item.path} name={item.name} />
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

const DropdownList = ({ link, name }) => {
  return (
    <a className="dropdown-item" href={link}>
      {name}
    </a>
  );
};

function Navbar({ listExample }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/Exercise1">
          FullStack Course
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Dropdown listExample={listExample} />
      </div>
    </nav>
  );
}

export default Navbar;
