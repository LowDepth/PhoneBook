const NumberCard = ({
  searchedNames,
  handleNameSearch,
  filteredPersons,
  handleDelete,
}) => {
  //console.log(handleDelete);
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card p-4 mt-3 w-100" style={{ maxWidth: "800px" }}>
          <h2 className="d-flex justify-content-center align-items-center">
            Number List
          </h2>
          <input
            id="search_name"
            className="form-control mb-3 text-center"
            type="text"
            placeholder="Search Name"
            value={searchedNames}
            onChange={handleNameSearch}
          />
          <ul className="list-group list-group-flush">
            {filteredPersons.map((person) => (
              <li
                key={person.id}
                className="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2"
              >
                <span className="me-auto">
                  {person.name} - {person.number}
                </span>
                <span className="d-flex gap-2">
                  <span
                    className="material-symbols-outlined edit-icon"
                    onClick={() => console.log(`Test Editing - ${person.name}`)}
                  >
                    edit
                  </span>
                  <span
                    className="material-symbols-outlined delete-icon"
                    onClick={() => handleDelete(person.id, person.name)}
                  >
                    delete
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NumberCard;
