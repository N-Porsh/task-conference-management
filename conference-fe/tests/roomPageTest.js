const uri = ' http://localhost:3000/';

const nameInputSelector = "input[name=name]";
const locationInputSelector = "input[name=location]";
const maxSeatsInputSelector = "input[name=maxSeats]";
const submitButton = "button.is-primary.button";

module.exports = {
    'open url and verify title': function (browser) {
        browser
            .url(uri)
            .waitForElementVisible('body')
            .assert.titleContains('Tallink Conference Management')
            .assert.containsText('.section .title', 'Rooms')
    },

    'Fill the Rooms form with valid data and check submit button visibility': function (browser) {
        browser
            .url(uri)
            .waitForElementVisible(nameInputSelector)
            .assert.attributeEquals(submitButton, 'disabled', "true")
            .setValue(nameInputSelector, 'M/S Baltic Queen I')
            .assert.attributeEquals(submitButton, 'disabled', "true")
            .setValue(locationInputSelector, 'Baltic Office 12-5')
            .assert.attributeEquals(submitButton, 'disabled', "true")
            .setValue(maxSeatsInputSelector, '5')
            .assert.attributeEquals(submitButton, 'disabled', null)
    },


    'Fill the Rooms form with invalid data and check submit button visibility': function (browser) {
        browser
            .url(uri)
            .waitForElementVisible(nameInputSelector)
            .assert.attributeEquals(submitButton, 'disabled', "true")
            .setValue(nameInputSelector, 'M/S Baltic Queen I')
            .assert.attributeEquals(submitButton, 'disabled', "true")
            .setValue(locationInputSelector, 'NO')
            .assert.attributeEquals(submitButton, 'disabled', "true")
            .assert.containsText("p.help.is-danger", 'Min 3 characters!')
            .setValue(maxSeatsInputSelector, '5')
            .assert.attributeEquals(submitButton, 'disabled', "true")
    },

    'Fill the form and submit it': function (browser) {
        let rowsBefore = null;
        fillValidFormData(browser);
        browser
            .elements('css selector', 'table tr', function (result) {
                rowsBefore = result.value.length;
            })
            .click(submitButton)
            .pause(700)
            .elements('css selector', 'table tr', function (result) {
                this.assert.equal(result.value.length, rowsBefore + 1, 'amount of rows did not change as expected');
            })
    }
}

function fillValidFormData(browser) {
    browser
        .url(uri)
        .waitForElementVisible(nameInputSelector)
        .setValue(nameInputSelector, 'M/S Baltic Queen I')
        .setValue(locationInputSelector, 'Baltic Office 12-5')
        .setValue(maxSeatsInputSelector, '5')
}