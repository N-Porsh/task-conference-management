import {Control, Field, Input, Label, Select} from "react-bulma-components/lib/components/form";
import {Button} from "react-bulma-components/lib";
import React from "react";
import ErrorBox from "../ErrorBox";
import DatePicker from "react-datepicker/dist/react-datepicker.min";
import axios from "axios";
import {api} from "../../config";


class ParticipantsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            conferenceId: '',
            fullName: '',
            birthDate: new Date('1990-01-01'),
            conferenceIdError: '',
            fullNameError: '',
            birthDateError: '',
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

    handleSubmit = (e) => {
        e.preventDefault();
        let participant = {
            conferenceId: this.state.conferenceId,
            fullName: this.state.fullName,
            birthDate: this.state.birthDate
        };

        if (this.state.conferenceIdError === "" && this.state.fullNameError === "" && this.state.birthDateError === "") {
            this.props.addParticipant(participant);
        }
    }

    handleChange = (e) => {
        let name = e.target.name;
        let val = e.target.value;
        this.setState({[name]: val});
    }

    handleDateChange = (date) => {
        this.setState({
            birthDate: date
        });
    };

    validateInput = (e) => {
        let name = e.target.name;
        let val = e.target.value;

        if (name === 'conferenceId') {
            const errResult = val !== "" ? '' : 'Conference must be selected!';
            this.setState({conferenceIdError: errResult});
        }

        if (name === 'fullName') {
            const errResult = !val || val.trim().length < 3 ? 'Min 3 characters!' : '';
            this.setState({fullNameError: errResult});
        }
    }

    subtractYears(years = 1) {
        let date = new Date();
        return date.setFullYear(date.getFullYear() - years);
    }

    render() {
        const {conferenceId, fullName, birthDate, conferenceIdError, fullNameError, birthDateError} = this.state;
        const isEnabled = conferenceId !== "" && fullName !== "" && birthDate !== "" && conferenceIdError === "" && fullNameError === "" && birthDateError === "";
        return (
            <>
                <Field>
                    <Label>Conference ID</Label>
                    <Control>
                        <Select name="conferenceId" className={this.state.conferenceIdError ? "is-danger" : ''}
                                onChange={this.handleChange} onBlur={this.validateInput}
                                value={this.state.conferenceId}>
                            <option value="">Select conference</option>
                            {
                                this.state.conferences.map(
                                    conference =>
                                        <option key={conference.id} value={conference.id}>
                                            {conference.name}
                                        </option>
                                )
                            }
                        </Select>
                        <ErrorBox error={this.state.conferenceIdError}/>
                    </Control>
                </Field>
                <Field>
                    <Label>Participant name</Label>
                    <Control>
                        <Input name="fullName" value={this.state.fullName}
                               className={this.state.fullNameError ? "is-danger" : ''}
                               onChange={this.handleChange} onKeyUp={this.validateInput}
                               placeholder="John Black"/>
                        <ErrorBox error={this.state.fullNameError}/>
                    </Control>
                </Field>
                <Field>
                    <Label>Date of Birth</Label>
                    <Control>
                        <DatePicker
                            placeholderText="Choose Date"
                            selected={this.state.birthDate}
                            onChange={this.handleDateChange}
                            maxDate={this.subtractYears(10)}
                            showMonthDropdown
                            showYearDropdown
                        />
                        <ErrorBox error={this.state.birthDateError}/>
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <Button type="primary" disabled={!isEnabled}
                                className="is-primary"
                                onClick={this.handleSubmit}>Add participant</Button>
                    </Control>
                </Field>
            </>
        );
    }
}

export default ParticipantsForm;