import { Button, Container, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { sendRequestWithToken } from "../utils/Authorization";
import { Redirect, Link } from "react-router-dom";

export function PetPage() {
  const [pets, setPets] = useState([]);
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [newName, setNewName] = useState("");
  const [newSpecies, setNewSpecies] = useState("");
  const [shouldReload, setShouldReload] = useState(0);
  const ownerId = localStorage.getItem("id");

  useEffect(() => {
    async function fetchAPI() {
      let response = await sendRequestWithToken(`owners/${ownerId}/pets`);
      let json = await response.json();
      setPets(json);
    }
    fetchAPI();
  }, [ownerId, shouldReload]);

  return (
    <Container style={{ marginTop: 50 }}>
      {localStorage.getItem("token") === null ? (
        <Redirect to={"/login"} />
      ) : null}
      <Row>
        <Col>
          <h1> Twoje zwierzaki </h1>
          {pets.map((pet) => (
            <Button
              onClick={() => localStorage.setItem("petId", pet.petId)}
              key={pet.petId}
              style={{
                background: "none",
                color: "#266DD3",
                border: "none",
                alignItems: "left",
                display: "flex",
                justifyContent: "center",
                height: 50,
                marginBottom: 10,
              }}
            >
              <h2>
                {" "}
                {pet.name} {pet.species}{" "}
              </h2>
            </Button>
          ))}
          <Link to="/calendar">
            <Button style={{ marginBottom: 50 }}> Umów wizytę </Button>
          </Link>
          <Button
            variant={"danger"}
            style={{ marginBottom: 50, marginLeft: 10 }}
            onClick={() =>
              sendRequestWithToken(
                `owners/${ownerId}/pets/${localStorage.getItem(
                  "petId"
                )}/delete`,
                "DELETE"
              ).then((response) => setShouldReload(Math.random()))
            }
          >
            {" "}
            Usuń zwierzaka{" "}
          </Button>
        </Col>

        <Col>
          <h1 style={{ marginBottom: 10 }}> Dodaj nowego zwierzaka</h1>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Imię zwierzaka</Form.Label>
              <Form.Control
                type="text"
                placeholder="Imię"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Gatunek</Form.Label>
              <Form.Control
                type="text"
                placeholder="Gatunek"
                onChange={(e) => {
                  setSpecies(e.target.value);
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                sendRequestWithToken(
                  `owners/${ownerId}/pets/add?name=${name}&species=${species}`,
                  "POST"
                ).then((response) => setShouldReload(Math.random()));
              }}
            >
              Dodaj
            </Button>
          </Form>
          <h1 > Edytuj dane zwierzaka</h1>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Imię zwierzaka</Form.Label>
              <Form.Control
                type="text"
                placeholder="Imię"
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Gatunek</Form.Label>
              <Form.Control
                type="text"
                placeholder="Gatunek"
                onChange={(e) => {
                  setNewSpecies(e.target.value);
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                sendRequestWithToken(
                  `owners/${ownerId}/pets/${localStorage.getItem(
                    "petId"
                  )}/change-data`,
                  "PUT",
                  JSON.stringify({ name: newName, species: newSpecies })
                ).then((response) => setShouldReload(Math.random()));
              }}
            >
              Edytuj
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
