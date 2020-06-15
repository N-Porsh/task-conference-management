import React from "react";
import {Columns} from "react-bulma-components/lib";
import RoomsForm from "./RoomsForm";
import RoomsTable from "./RoomsTable";
import {api} from '../../config';
import axios from 'axios';

class RoomsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        }
    }

    componentDidMount() {
        this.getAllRooms();
    }

    getAllRooms = async () => {
        try {
            const response = await axios.get(`${api}/rooms`);
            await this.setState({rooms: response.data})
        } catch (e) {
            console.log("Error:", e);
        }
    };

    createRoom = async room => {
        try {
            const response = await axios.post(`${api}/rooms`, room);
            if (response.status !== 201) {
                console.log("error", response.data);
                return;
            }
            this.getAllRooms();
        } catch (e) {
            console.log("Error:", e);
        }
    };

    removeRoom = async id => {
        await axios.delete(`${api}/rooms/${id}`);
        this.getAllRooms();
    }

    render() {
        return (
            <>
                <Columns>
                    <Columns.Column size={5}>
                        <RoomsForm createRoom={this.createRoom}/>
                    </Columns.Column>
                </Columns>

                <RoomsTable removeRoom={this.removeRoom} rooms={this.state.rooms}/>
            </>
        );
    }
}

export default RoomsPage;