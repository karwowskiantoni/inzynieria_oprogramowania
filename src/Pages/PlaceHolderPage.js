import { Container, Row } from "react-bootstrap";

export function PlaceHolderPage({ text }) {
  return (
    <Container>
      <Row
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          height: 50,
          marginTop: 30,
        }}
      >
        <h1>Witaj!</h1>
      </Row>
      <Row
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          height: 50,
        }}
      >
        <h3>{text}</h3>
      </Row>
    </Container>
  );
}
