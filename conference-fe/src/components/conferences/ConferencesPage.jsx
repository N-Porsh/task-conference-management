import React from "react";
import {Columns} from "react-bulma-components";
import ConferencesForm from "./ConferencesForm";
import ConferenceTable from "./ConferenceTable";
import axios from "axios";
import {api} from "../../config";


class ConferencesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            conferences: []
        }
    }

    componentDidMount() {
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

    createConference = async conference => {
        try {
            const response = await axios.post(`${api}/conferences`, conference);
            if (response.status !== 201) {
                console.log("error", response.data);
                return;
            }
            this.getAllConferences();
        } catch (e) {
            console.log("Error:", e);
        }
    };

    removeConference = async id => {
        await axios.delete(`${api}/conferences/${id}`);
        this.getAllConferences();
    }

    render() {
        return (
            <>
                <Columns>
                    <Columns.Column size={5}>
                        <ConferencesForm createConference={this.createConference}/>
                    </Columns.Column>
                </Columns>

                <ConferenceTable removeConference={this.removeConference} conferences={this.state.conferences}/>
            </>
        );
    }
}

export default ConferencesPage;