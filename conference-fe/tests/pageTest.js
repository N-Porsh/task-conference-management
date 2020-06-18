const uri = ' http://localhost:3000/';

//room page inputs
const nameInputRoomSelector = "input[name=name]";
const locationInputRoomSelector = "input[name=location]";
const maxSeatsInputRoomSelector = "input[name=maxSeats]";

//conference page inputs
const roomDropdownSelector = "select[name=roomId]";
const roomDropdownSelectorValue = 'select[name="roomId"] option[value="1"]';
const conferenceNameInputSelector = "input[name=name]";


// participant page inputs
const confDDSelector = "select[name=conferenceId]";
const confDDSelectorValue = 'select[name="conferenceId"] option[value="1"]';
const fullNameInputSelector = "input[name=fullName]";

// common inputs
const submitButton = "button.is-primary.button";

module.exports = {
    'open page and verify title': function (browser) {
        browser
            .url(uri)
            .waitForElementVisible('body')
            .assert.titleContains('Tallink Conference Management')
            .assert.containsText('.section .title', 'Rooms')
    },

    'step 1: add room': function (browser) {
        browser
            .url(uri)
            .waitForElementVisible(nameInputRoomSelector)
            .setValue(nameInputRoomSelector, 'M/S Baltic Queen I')
            .setValue(locationInputRoomSelector, 'Baltic Office 12-5')
            .setValue(maxSeatsInputRoomSelector, '5')
            .click(submitButton)
            .pause(700)
    },

    'step 2: add conference': function (browser) {
        browser
            .url(uri + 'conferences')
            .waitForElementVisible(roomDropdownSelector)
            .click(roomDropdownSelectorValue)
            .setValue(conferenceNameInputSelector, 'Java Summit 2020')
            .click(submitButton)
            .pause(700)
    },

    'step 3: add participant to the conference': function (browser) {
        let rowsBefore = null;
        fillValidFormData(browser);
        browser
            .elements('css selector', 'table tr', function (result) {
                rowsBefore = result.value.length;
            })
            .click(submitButton)
            .pause(700)
            .elements('css selector', 'table tr', function (result) {
                this.assert.equal(result.value.length, rowsBefore + 1, 'amount of rows changed as expected');
            })
    },

    'Fill the Rooms form with valid data and check submit button visibility': function (browser) {
        browser
            .url(uri)
            .waitForElementVisible(nameInputRoomSelector)
            .assert.attributeEquals(submitButton, 'disabled', "true")
            .setValue(nameInputRoomSelector, 'M/S Baltic Queen I')
            .assert.attributeEquals(submitButton, 'disabled', "true")
            .setValue(locationInputRoomSelector, 'Baltic Office 12-5')
            .assert.attributeEquals(submitButton, 'disabled', "true")
            .setValue(maxSeatsInputRoomSelector, '5')
            .assert.attributeEquals(submitButton, 'disabled', null)
    },

    'Fill the Rooms form with invalid data and check submit button visibility': function (browser) {
        browser
            .url(uri)
            .waitForElementVisible(nameInputRoomSelector)
            .assert.attributeEquals(submitButton, 'disabled', "true")
            .setValue(nameInputRoomSelector, 'M/S Baltic Queen I')
            .assert.attributeEquals(submitButton, 'disabled', "true")
            .setValue(locationInputRoomSelector, 'NO')
            .assert.attributeEquals(submitButton, 'disabled', "true")
            .assert.containsText("p.help.is-danger", 'Min 3 characters!')
            .setValue(maxSeatsInputRoomSelector, '5')
            .assert.attributeEquals(submitButton, 'disabled', "true")
    },

    // conferences:
    'Fill the Conference form with valid data and check submit button visibility': function (browser) {
        browser
            .url(uri + 'conferences')
            .waitForElementVisible(roomDropdownSelector)
            .assert.attributeEquals(submitButton, 'disabled', "true")
            .click(roomDropdownSelectorValue)
            .assert.attributeEquals(submitButton, 'disabled', "true")
            .setValue(conferenceNameInputSelector, 'Java Summit 2020')
            .assert.attributeEquals(submitButton, 'disabled', null)
    },

    'Fill the Conference form with invalid data and check submit button visibility': function (browser) {
        browser
            .url(uri + 'conferences')
            .waitForElementVisible(roomDropdownSelector)
            .assert.attributeEquals(submitButton, 'disabled', "true")
            .click(roomDropdownSelectorValue)
            .assert.attributeEquals(submitButton, 'disabled', "true")
            .setValue(conferenceNameInputSelector, 'NO')
            .assert.containsText("p.help.is-danger", 'Min 3 characters!')
            .assert.attributeEquals(submitButton, 'disabled', "true")
    }
}

function fillValidFormData(browser) {
    browser
        .url(uri + 'participants')
        .waitForElementVisible(confDDSelector)
        .click(confDDSelectorValue)
        .setValue(fullNameInputSelector, 'Henry Ford Jr')
}