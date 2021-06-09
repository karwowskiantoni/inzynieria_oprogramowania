import { PlaceHolderPage } from "./PlaceHolderPage";
import { sendRequestWithToken } from "../utils/Authorization";
import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

export function HomePage() {
  const [user, setUser] = useState("[]");

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
  }, []);

  return (
    <div>
      {localStorage.getItem("token") === null ? (
        <Redirect to={"/login"} />
      ) : null}
      <PlaceHolderPage
        text={"Jesteś w systemie obsługi wizyt w klinice weterynaryjnej!"}
      />
      <Container style={{ padding: 10 }}>
        <h2> Twoje dane </h2>
        <h3> Imię: {user.firstname} </h3>
        <h3> Nazwisko: {user.surname} </h3>
      </Container>
    </div>
  );
}
