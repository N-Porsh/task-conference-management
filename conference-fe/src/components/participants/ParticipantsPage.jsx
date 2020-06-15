import React from "react";
import {Columns} from "react-bulma-components";
import axios from "axios";
import {api} from "../../config";
import ParticipantsForm from "./ParticipantsForm";
import ParticipantsTable from "./ParticipantsTable";
import NotificationBox from "../NotificationBox";

class ParticipantsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            participants: [],
            conferences: [],
            responseData: null
        }
    }

    componentDidMount() {
        this.getAllParticipants();
        this.getAllConferences();
    }

    getAllConferences = async () => {
        try {
            const response = await axios.get(`${api}/conferences`);
            await this.setState({conferences: response.data})
        } catch (e) {
            console.log("Error:", e);
        }
    };

    getAllParticipants = async () => {
        try {
            const response = await axios.get(`${api}/participants`);
            await this.setState({participants: response.data})
        } catch (e) {
            console.log("Error:", e);
        }
    };
    addParticipant = async (participant) => {
        try {
            const response = await axios.post(`${api}/participants`, participant);
            this.setState({
                responseData: {
                    status: response.status,
                    message: response.data
                }
            });
            if (response.status !== 201) {
                console.log("error", response.data);
                return;
            }
            this.getAllParticipants();
            this.getAllConferences();
        } catch (e) {
            console.log("Error:", e);
        }
    };

    removeParticipant = async id => {
        await axios.delete(`${api}/participants/${id}`);
        await this.getAllParticipants();
        await this.getAllConferences();
    }

    render() {
        return (
            <>
                <Columns>
                    <Columns.Column size={6}>
                        <ParticipantsForm addParticipant={this.addParticipant}
                                          getAllConferences={this.getAllConferences}/>
                    </Columns.Column>
                </Columns>
                <NotificationBox data={this.state.responseData}/>
                <ParticipantsTable removeParticipant={this.removeParticipant} participants={this.state.participants}/>
            </>

        );
    }
}

export default ParticipantsPage;