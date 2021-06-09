import { CustomTable } from "./CustomTable";
import { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
import { Day } from "./Day";
import { sendRequestWithToken } from "../../utils/Authorization";
import { Link, Redirect } from "react-router-dom";

export function Calendar() {
  const [activeDate, setActiveDate] = useState(new Date());
  const [visits, setVisits] = useState([]);
  const [shouldReload, setShouldReload] = useState(0);
  const [pet, setPet] = useState();
  useEffect(() => {
    async function init() {
      let response;
      if (localStorage.getItem("type") === "vet") {
        response = await sendRequestWithToken(
          `vets/${localStorage.getItem("id")}/visits`
        );
      } else {
        response = await sendRequestWithToken("visits");
      }
      let json = await response.json();
      setVisits(json);

      response = await sendRequestWithToken(
        `owners/${localStorage.getItem("id")}/pets/${localStorage.getItem(
          "petId"
        )}`
      );
      json = await response.json();
      setPet(json);
    }

    init();
  }, [activeDate, shouldReload]);

  useEffect(() => {
    async function init() {
      let response = await sendRequestWithToken(
        `owners/${localStorage.getItem("id")}/pets/${localStorage.getItem(
          "petId"
        )}`
      );
      let json = await response.json();
      setPet(json);
    }

    init();
  }, [activeDate, shouldReload]);

  function createWeeks(visits) {
    let numbers = [
      ...Array(
        new Date(
          activeDate.getFullYear(),
          activeDate.getMonth() + 1,
          0
        ).getDate()
      ).keys(),
    ];
    let days = numbers.map((number) => (
      <Day
        date={
          new Date(activeDate.getFullYear(), activeDate.getMonth(), number + 1)
        }
        visits={visits.filter(
          (visit) =>
            new Date(visit.beginTime).getDate() === number + 1 &&
            new Date(visit.beginTime).getMonth() === activeDate.getMonth() &&
            new Date(visit.beginTime).getFullYear() === activeDate.getFullYear()
        )}
        setShouldReload={setShouldReload}
      />
    ));

    for (
      let i = 0;
      i < new Date(activeDate.getFullYear(), activeDate.getMonth(), 1).getDay();
      i++
    ) {
      days.unshift(" ");
    }

    while (days.length < 35) {
      days.push(" ");
    }
    let weeks = [];
    while (days.length > 7) {
      weeks.push(days.splice(0, 7));
    }
    weeks.push(days);
    return weeks;
  }

  const months = [
    "styczeń",
    "luty",
    "marzec",
    "kwiecień",
    "maj",
    "czerwiec",
    "lipiec",
    "sierpień",
    "wrzesień",
    "październik",
    "listopad",
    "grudzień",
  ];

  const daysOfTheWeek = [
    "niedziela",
    "poniedziałek",
    "wtorek",
    "środa",
    "czwartek",
    "piątek",
    "sobota",
  ];

  return (
    <div style={{ marginTop: 10, marginRight: 35 }}>
      {localStorage.getItem("token") === null ? (
        <Redirect to={"/login"} />
      ) : null}
      <Row
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {localStorage.getItem("type") === "owner" ? (
          <Link style={{position: "absolute", marginRight: 1530, marginLeft: 500 }} to={"/pet"}>
            <Button
             style={{ justifyContent: "center", width: 350}}>
              {pet !== undefined
                ? "Umawiasz wizytę dla: " + pet.name + " " + pet.species
                : null}
            </Button>
          </Link>
        ) : null}
        <Button
          variant={"dark"}
          onClick={() =>
            setActiveDate(
              new Date(activeDate.getFullYear(), activeDate.getMonth() - 1, 1)
            )
          }
        >
          poprzedni
        </Button>
        <h2 className={"m-2"}>
          {months[activeDate.getMonth()]} {activeDate.getFullYear()}
        </h2>
        <Button
          variant={"dark"}
          onClick={() =>
            setActiveDate(
              new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, 1)
            )
          }
        >
          następny
        </Button>
      </Row>
      <CustomTable head={daysOfTheWeek} data={createWeeks(visits)} />
    </div>
  );
}
