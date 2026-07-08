import { useState } from "react";
import Button from "./Button";
import Notification from "./Notification";

const FormCard = ({
  addName,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  newNotification,
}) => {
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card p-4 mt-3 w-100" style={{ maxWidth: "800px" }}>
          <form onSubmit={addName}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={newName}
                onChange={handleNameChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Number
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={newNumber}
                onChange={handleNumberChange}
              />
            </div>

            <Button className="w-100 mb-2" text="Add" type="submit" />
            <Notification message={newNotification} type="primary" />
          </form>
        </div>
      </div>
    </>
  );
};

export default FormCard;
