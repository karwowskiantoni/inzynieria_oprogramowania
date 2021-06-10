import { PlaceHolderPage } from "./PlaceHolderPage";
import { sendRequestWithToken } from "../utils/Authorization";
import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export function HomePage() {
  const [user, setUser] = useState("[]");
  const [shouldReload, setShouldReload] = useState(0);
  const [newName, setNewName] = useState("");
  const [newSurname, setNewSurname] = useState("");

  useEffect(() => {
    async function fetchAPI() {
      let response;
      if (localStorage.getItem("type") === "owner") {
        response = await sendRequestWithToken(
          `owners/${localStorage.getItem("id")}`
        );
      } else {
        response = await sendRequestWithToken(
          `vets/${localStorage.getItem("id")}`
        );
      }
      let json = await response.json();
      setUser(json);
    }
    fetchAPI();
  }, [shouldReload]);

  return (
    <div style={{ paddingTop: 100 }}>
      {localStorage.getItem("token") === null ? (
        <Redirect to={"/login"} />
      ) : null}
      <Row
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          height: 50,
          marginTop: 30,
        }}
      >
        <h1>
          Witaj {user.firstname} {user.surname}!{" "}
        </h1>
      </Row>
      <Row
        style={{
          paddingTop: 30,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          height: 50,
        }}
      >
        <h3>Jesteś w systemie obsługi wizyt w klinice weterynaryjnej!</h3>
      </Row>
          <h1 style={{paddingTop: 30}}> Edytuj swoje dane</h1>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Twoje imię</Form.Label>
              <Form.Control
                type="text"
                placeholder="Imię"
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Twoje Nazwisko</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nazwisko"
                onChange={(e) => {
                  setNewSurname(e.target.value);
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (localStorage.getItem("type") === "owner") {
                  sendRequestWithToken(
                    `owners/${localStorage.getItem("id")}/change-data}`,
                    "PUT",
                    JSON.stringify({ firstname: newName, surname: newSurname })
                ).then((response) => setShouldReload(Math.random()));
                } else {
                  sendRequestWithToken(
                    `vets/${localStorage.getItem("id")}/change-data}`,
                    "PUT",
                    JSON.stringify({ firstname: newName, surname: newSurname })
                  );
              }}}
            >
              Edytuj
            </Button>
          </Form>
    </div>
  );
}
