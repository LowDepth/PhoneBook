const Container = ({ children }) => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <div className="card p-4 mt-3" style={{ minWidth: "800px" }}>
        <div className="mb-3">{children}</div>
      </div>
    </div>
  );
};

export default Container;
