const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => {
  const totalExercises = sum.reduce((soma, item) => soma + item.exercises, 0);
  return (
    <>
      <p>Total exercices: {totalExercises}</p>
    </>
  );
};

const Part = ({ item }) => {
  //console.log("This is Part", item);
  return (
    <>
      <p>
        {item.name} {item.exercises}
      </p>
    </>
  );
};

const Content = ({ parts }) => {
  //console.log("This is Content", parts);
  return (
    <>
      {parts.map((item) => {
        return <Part key={item.id} item={item} />;
      })}
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total sum={course.parts} />
      </>
    </>
  );
};

export default Course;
