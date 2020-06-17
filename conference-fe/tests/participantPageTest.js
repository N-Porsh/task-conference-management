const uri = ' http://localhost:3000/';

const conferenceDropdownSelector = "select[name=conferenceId]";
const conferenceDropdownSelectorValue = 'select[name="conferenceId"] option[value="1"]';
const fullNameInputSelector = "input[name=fullName]";
const submitButton = "button.is-primary.button";

module.exports = {
    'step 1: add room': function (browser) {
        const nameInputSelector = "input[name=name]";
        const locationInputSelector = "input[name=location]";
        const maxSeatsInputSelector = "input[name=maxSeats]";
        const submitButton = "button.is-primary.button";
        browser
            .url(uri)
            .waitForElementVisible(nameInputSelector)
            .setValue(nameInputSelector, 'M/S Baltic Queen I')
            .setValue(locationInputSelector, 'Baltic Office 12-5')
            .setValue(maxSeatsInputSelector, '5')
            .click(submitButton)
    },

    'step 2: add conference': function (browser) {
        const roomDropdownSelector = "select[name=roomId]";
        const roomDropdownSelectorValue = 'select[name="roomId"] option[value="1"]';
        const conferenceNameInputSelector = "input[name=name]";
        const submitButton = "button.is-primary.button";
        browser
            .url(uri + 'conferences')
            .waitForElementVisible(roomDropdownSelector)
            .click(roomDropdownSelectorValue)
            .setValue(conferenceNameInputSelector, 'Java Summit 2020')
            .click(submitButton)
    },

    'step 3: add participant to the conference': function (browser) {
        let rowsBefore = null;
        fillValidFormData(browser);
        browser
            .pause(3000)
            .elements('css selector', 'table tr', function (result) {
                rowsBefore = result.value.length;
            })
            .click(submitButton)
            .pause(700)
            .elements('css selector', 'table tr', function (result) {
                this.assert.equal(result.value.length, rowsBefore + 1, 'amount of rows changed as expected');
            })
    }
}

function fillValidFormData(browser) {
    browser
        .url(uri + 'participants')
        .waitForElementVisible(conferenceDropdownSelector)
        .click(conferenceDropdownSelectorValue)
        .setValue(fullNameInputSelector, 'Henry Ford Jr')
}