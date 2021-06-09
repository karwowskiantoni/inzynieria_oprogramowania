import { Container, Row } from "react-bootstrap";

export function PlaceHolderPage({ text }) {
  return (
    <Container>
      <Row
        style={{
          paddingTop: 30,
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
