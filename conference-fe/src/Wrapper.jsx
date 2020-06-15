import React, {Component} from 'react';
import {Container, Section} from 'react-bulma-components/dist';
import {Route, Switch} from 'react-router-dom'
import Navbar from "./components/navbar/Navbar";
import RoomsPage from "./components/rooms/RoomsPage";
import ConferencesPage from "./components/conferences/ConferencesPage";
import ParticipantsPage from "./components/participants/ParticipantsPage";

class Wrapper extends Component {

    render() {
        return (
            <Container>
                <Navbar/>
                <Section>
                    <Switch>
                        <Route path="/" exact render={() => <RoomsPage {...this.state} />}/>
                        <Route path="/conferences" component={ConferencesPage}/>
                        <Route path="/participants" component={ParticipantsPage}/>
                    </Switch>
                </Section>
            </Container>
        );
    }
}

export default Wrapper;
