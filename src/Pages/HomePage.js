import { PlaceHolderPage } from "./PlaceHolderPage";
import { sendRequestWithToken } from "../utils/Authorization";
import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export function HomePage() {
  const [user, setUser] = useState("[]");
  const [shouldReload, setShouldReload] = useState(0);

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
    <div style={{paddingTop: 100}}>
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
      <PlaceHolderPage
        text={"Jesteś w systemie obsługi wizyt w klinice weterynaryjnej!"}
      />
    </div>
  );
}
