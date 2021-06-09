import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { sendRequestWithToken } from "../utils/Authorization";
import { Redirect, Link } from "react-router-dom";

export function PetPage() {
  const [pets, setPets] = useState([]);
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [shouldReload, setShouldReload] = useState(0);
  const ownerId = localStorage.getItem("id");
  

  useEffect(() => {
    async function fetchAPI() {
      let response = await sendRequestWithToken(`owners/${ownerId}/pets`);
      let json = await response.json();
      setPets(json);
    }
    fetchAPI();
  }, [shouldReload]);

  return (
    <Container style={{ marginTop: 50 }}>
      {localStorage.getItem("token") === null ? (
        <Redirect to={"/login"} />
      ) : null}
      <h1> Twoje zwierzaki </h1>
      {pets.map((pet) => (
        <Link to="/calendar">
          <Button
            onClick={()=>localStorage.setItem("petId", pet.petId)}
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
        </Link>
      ))}

      <h1> Dodaj nowego zwierzaka</h1>
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
    </Container>
  );
}
