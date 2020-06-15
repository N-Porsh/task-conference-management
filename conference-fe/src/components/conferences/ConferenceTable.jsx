import React from "react";
import {Table, Button, Heading} from "react-bulma-components/dist";

const ConferenceTable = (props) => (
    <>
        <Heading size={4}>Conferences</Heading>
        <Table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Room Id</th>
                <th>Conference name</th>
                <th>Date & time</th>
                <th>Options</th>
            </tr>
            </thead>
            <tbody>
            {
                props.conferences.map(
                    conference => {
                        const date = new Date(conference.dateTime);
                        const dateTime = date.toLocaleString("en", {
                            "timeZone": "Europe/Tallinn"
                        });

                        return <tr key={conference.id}>
                            <td>{conference.id}</td>
                            <td>{conference.roomId}</td>
                            <td>{conference.name}</td>
                            <td>{dateTime}</td>
                            <td>
                                <Button type="primary" onClick={() => props.removeConference(conference.id)}
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


export default ConferenceTable;