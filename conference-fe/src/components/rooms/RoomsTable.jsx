import React from "react";
import {Table, Button, Heading} from "react-bulma-components/dist";

const RoomsTable = (props) => (
    <>
        <Heading size={4}>Rooms</Heading>
        <Table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Room</th>
                <th>Location</th>
                <th>Max seats</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {
                props.rooms.map(
                    room =>
                        <tr key={room.id}>
                            <td>{room.id}</td>
                            <td>{room.name}</td>
                            <td>{room.location}</td>
                            <td>{room.maxSeats}</td>
                            <td>
                                <Button type="primary" onClick={() => props.removeRoom(room.id)}
                                        className="is-info">Remove</Button>
                            </td>
                        </tr>
                )
            }
            </tbody>
        </Table>
    </>
);


export default RoomsTable;