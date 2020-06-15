import {Control, Field, Input, Label} from "react-bulma-components/lib/components/form";
import {Button} from "react-bulma-components/lib";
import React from "react";
import ErrorBox from "../ErrorBox";

class RoomsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            location: '',
            maxSeats: '',
            nameError: '',
            locationError: '',
            maxSeatsError: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let room = {
            name: this.state.name,
            location: this.state.location,
            maxSeats: this.state.maxSeats
        };

        if (this.state.nameError === "" && this.state.locationError === "" && this.state.maxSeatsError === "") {
            this.props.createRoom(room);
        }
    }

    handleChange = (e) => {
        let name = e.target.name;
        let val = e.target.value;
        this.setState({[name]: val});
    }

    validateInput = (e) => {
        let name = e.target.name;
        let val = e.target.value;
        if (name === 'name') {
            const errResult = !val || val.trim().length < 3 ? 'Min 3 characters!' : '';
            this.setState({nameError: errResult});
        }
        if (name === 'location') {
            const errResult = !val || val.trim().length < 3 ? 'Min 3 characters!' : '';
            this.setState({locationError: errResult});

        }
        if (name === 'maxSeats') {
            const errResult = !Number(val) || (val < 1 || val > 100000) ? 'Min: 1, Max: 10000!' : '';
            this.setState({maxSeatsError: errResult});
        }
    }

    render() {
        const {name, location, maxSeats, nameError, locationError, maxSeatsError} = this.state;
        const isEnabled = name !== "" && location !== "" && maxSeats !== "" && nameError === "" && locationError === "" && maxSeatsError === "";
        return (
            <>
                <Field>
                    <Label>Room name</Label>
                    <Control>
                        <Input name="name" value={this.state.name} className={this.state.nameError ? "is-danger" : ''}
                               onChange={this.handleChange} onKeyUp={this.validateInput}
                               placeholder="M/S Baltic Queen conference"/>
                        <ErrorBox error={this.state.nameError}/>
                    </Control>
                </Field>
                <Field>
                    <Label>Location</Label>
                    <Control>
                        <Input name="location" value={this.state.location}
                               className={this.state.locationError ? "is-danger" : ''}
                               onChange={this.handleChange}
                               onKeyUp={this.validateInput}
                               placeholder="M/S Baltic Queen"/>
                        <ErrorBox error={this.state.locationError}/>
                    </Control>
                </Field>
                <Field>
                    <Label>Maximum seats</Label>
                    <Control>
                        <Input name="maxSeats" value={this.state.maxSeats}
                               className={this.state.maxSeatsError ? "is-danger" : ''}
                               onChange={this.handleChange}
                               onKeyUp={this.validateInput} type="number"
                               placeholder="124"/>
                        <ErrorBox error={this.state.maxSeatsError}/>
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <Button type="primary" disabled={!isEnabled}
                                className="is-primary"
                                onClick={this.handleSubmit}
                        >Create room</Button>
                    </Control>
                </Field>
            </>
        );
    }
}

export default RoomsForm;