import Card from "react-bootstrap/Card";

const Box = ({ bg, title, data }) => {
  return (
    <Card className={`text-center text-white m-1 bg-${bg}`}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{data}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Box;
