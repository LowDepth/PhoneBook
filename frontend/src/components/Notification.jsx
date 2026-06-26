const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  return (
    <>
      <div className={`alert alert-${type}`} role="alert">
        <div>{message}</div>
      </div>
    </>
  );
};

export default Notification;
