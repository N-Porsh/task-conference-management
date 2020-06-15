import {Control, Field, Input, Label, Select} from "react-bulma-components/lib/components/form";
import {Button} from "react-bulma-components/lib";
import React from "react";
import ErrorBox from "../ErrorBox";
import DatePicker from "react-datepicker/dist/react-datepicker.min";
import axios from "axios";
import {api} from "../../config";

class ConferencesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomId: '',
            name: '',
            dateTime: new Date(),
            roomIdError: '',
            nameError: '',
            dateTimeError: '',
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

    handleSubmit = (e) => {
        e.preventDefault();
        let conference = {
            roomId: this.state.roomId,
            name: this.state.name,
            dateTime: this.state.dateTime
        };

        if (this.state.nameError === "" && this.state.roomIdError === "" && this.state.dateTimeError === "") {
            this.props.createConference(conference);
        }
    }

    handleChange = (e) => {
        let name = e.target.name;
        let val = e.target.value;
        this.setState({[name]: val});
    }

    handleDateChange = (date) => {
        this.setState({
            dateTime: date
        });
    };

    validateInput = (e) => {
        let name = e.target.name;
        let val = e.target.value;

        if (name === 'roomId') {
            const errResult = val !== "" ? '' : 'Room must be selected!';
            this.setState({roomIdError: errResult});
        }

        if (name === 'name') {
            const errResult = !val || val.trim().length < 3 ? 'Min 3 characters!' : '';
            this.setState({nameError: errResult});
        }
    }

    render() {
        const {roomId, name, dateTime, roomIdError, nameError, dateTimeError} = this.state;
        const isEnabled = roomId !== "" && name !== "" && dateTime !== "" && roomIdError === "" && nameError === "" && dateTimeError === "";
        return (
            <>
                <Field>
                    <Label>Room</Label>
                    <Control>
                        <Select name="roomId" className={this.state.roomIdError ? "is-danger" : ''}
                                onChange={this.handleChange} onBlur={this.validateInput} value={this.state.roomId}>
                            <option value="">Select room</option>
                            {
                                this.state.rooms.map(
                                    room =>
                                        <option key={room.id} value={room.id}>
                                            {room.name}, Location: {room.location}, Seats: {room.maxSeats}
                                        </option>
                                )
                            }
                        </Select>
                        <ErrorBox error={this.state.roomIdError}/>
                    </Control>
                </Field>
                <Field>
                    <Label>Conference name</Label>
                    <Control>
                        <Input name="name" value={this.state.name} className={this.state.nameError ? "is-danger" : ''}
                               onChange={this.handleChange} onKeyUp={this.validateInput}
                               placeholder="Star II"/>
                        <ErrorBox error={this.state.nameError}/>
                    </Control>
                </Field>
                <Field>
                    <Label>Date and time</Label>
                    <Control>
                        <DatePicker
                            placeholderText="Choose Date & time"
                            selected={this.state.dateTime}
                            onChange={this.handleDateChange}
                            minDate={(new Date())}
                            showTimeSelect
                            dateFormat="Pp"
                        />
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <Button type="primary" disabled={!isEnabled}
                                className="is-primary"
                                onClick={this.handleSubmit}>Create conference</Button>
                    </Control>
                </Field>
            </>
        );
    }
}

export default ConferencesForm;