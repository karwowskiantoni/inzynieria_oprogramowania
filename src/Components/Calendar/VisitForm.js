import {Button, Form} from "react-bootstrap";
import {useState} from "react";

export function VisitForm({date}) {
    const [beginTime, setBeginTime] = useState();
    const [endTime, setEndTime] = useState();
    return (
        <Form>
            <Form.Group controlId="formGroupEmail">
                <Form.Label>wprowadź początek wizyty</Form.Label>
                <Form.Control type={"time"} onChange={object => setBeginTime(object.target.value)} placeholder="godzina rozpoczęcia" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                <Form.Label>wprowadź koniec wizyty</Form.Label>
                <Form.Control type={"time"} onChange={object => setEndTime(object.target.value)} placeholder="godzina zakończenia" />
            </Form.Group>
            <Button
            onClick={() => fetch(
                `https://petclinicio.herokuapp.com/vets/${localStorage.getItem('id')}/visits/create-visit` +
                `?beginTime=` +
                new Date(date.getFullYear(), date.getMonth(), date.getDate(), beginTime.substring(0,2), beginTime.substring(3,5)).toISOString() +
                `&endTime=` +
                new Date(date.getFullYear(), date.getMonth(), date.getDate(), endTime.substring(0,2), endTime.substring(3,5)).toISOString(),
            {method: "POST"}
            )}
            >stwórz wizytę</Button>
        </Form>
    );
}