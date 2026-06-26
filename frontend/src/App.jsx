import { useState, useEffect } from "react";
import Button from "./components/Button";
import FormCard from "./components/FormCard";
import NumberCard from "./components/NumberCard";
import axios from "axios";
import phoneListService from "./services/phonelist";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchedNames, setSearchedNames] = useState("");
  const [newNotification, setNewNotification] = useState(null);

  useEffect(() => {
    phoneListService
      .getAll()
      .then((inicialPhoneList) => setPersons(inicialPhoneList));
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    if (
      persons.some(
        (person) => person.name.toLowerCase() === nameObject.name.toLowerCase(),
      )
    ) {
      if (
        window.confirm(
          `${nameObject.name} is already on the phonebook, replace the old number with the new one?`,
        )
      ) {
        // IF THE NAME IS ALREADY ON THE LIST IT WILL ASK IF YOU WANT TO CHANGE THE NUMBER
        //
        //
        //
        //
        //
        //

        const personToUpdate = persons.find(
          (n) => n.name.toLowerCase() === newName.toLowerCase(),
        );

        const changedNumber = { ...personToUpdate, number: newNumber };

        phoneListService
          .update(changedNumber.id, changedNumber)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== changedNumber.id ? person : returnedPerson,
              ),
            );
            setNewName("");
            setNewNumber("");
            setNewNotification(
              `${changedNumber.name}'s Phone number was updated to ${changedNumber.number}`,
            );
            setTimeout(() => {
              setNewNotification(null);
            }, 5500);
          });
      }

      //alert(`${newName} is already added to phonebook`);
    } else {
      phoneListService
        .create(nameObject)
        .then((returnedPhoneList) =>
          setPersons(persons.concat(returnedPhoneList)),
        );

      setNewName("");
      setNewNumber("");
      setNewNotification(`${nameObject.name} added to the phonebook`);
      setTimeout(() => {
        setNewNotification(null);
      }, 2500);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameSearch = (event) => {
    setSearchedNames(event.target.value);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phoneListService
        .apagar(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error("Failed to delete person", error);
        });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLocaleLowerCase().includes(searchedNames),
  );

  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center mt-3">
        <h1>The Phone Book</h1>
      </div>

      <FormCard
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
        newNotification={newNotification}
      />

      <NumberCard
        searchedNames={searchedNames}
        handleNameSearch={handleNameSearch}
        filteredPersons={filteredPersons}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default App;
