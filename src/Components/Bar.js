import { Button, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Bar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Link to="/home">
        <Navbar.Brand>Pet Clinic</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {localStorage.getItem("type") === "vet" ? (
            <Link to="/calendar">
              <Button variant={"dark"}>Kalendarz</Button>
            </Link>
          ) : null}
          {localStorage.getItem("type") === "owner" ? (
            <Link to="/pet">
              <Button variant={"dark"}>Zwierzęta</Button>
            </Link>
          ) : null}
        </Nav>
        <Nav>
          <Link to="/login">
            <Button
              onClick={() => {
                localStorage.removeItem("id");
                localStorage.removeItem("petId");
                localStorage.removeItem("type");
                localStorage.removeItem("token");
                window.location = "/login";
              }}
              variant={"outline-danger"}
            >
              wyloguj
            </Button>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
