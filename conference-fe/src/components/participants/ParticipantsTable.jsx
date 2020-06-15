import React from "react";
import {Table, Button, Heading} from "react-bulma-components/dist";

const ParticipantsTable = (props) => (
    <>
        <Heading size={4}>Participants</Heading>
        <Table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Conference ID</th>
                <th>Full name</th>
                <th>Birth date</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {
                props.participants.map(
                    participant => {
                        const birthDate = new Date(participant.birthDate);
                        const date = birthDate.toLocaleString("en", {
                            "dateStyle": "long",
                            "timeZone": "Europe/Tallinn"
                        });
                        return <tr key={participant.id}>
                            <td>{participant.id}</td>
                            <td>{participant.conferenceId}</td>
                            <td>{participant.fullName}</td>
                            <td>{date}</td>
                            <td>
                                <Button type="primary" onClick={() => props.removeParticipant(participant.id)}
                                        className="is-info">Remove</Button>
                            </td>
                        </tr>
                    }
                )
            }
            </tbody>
        </Table>
    </>
);


export default ParticipantsTable;