const uri = ' http://localhost:3000/';

const roomDropdownSelector = "select[name=roomId]";
const roomDropdownSelectorValue = 'select[name="roomId"] option[value="1"]';
const conferenceNameInputSelector = "input[name=name]";
const submitButton = "button.is-primary.button";

module.exports = {
    'open conferences page and verify it': function (browser) {
        browser
            .url(uri)
            .waitForElementVisible('#navbarBasicExample')
            .click('a[href="/conferences"]')
            .waitForElementVisible('body')
            .assert.urlContains('conferences')
            .assert.titleContains('Tallink Conference Management')
            .assert.containsText('.section .title', 'Conferences')
    },

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
                this.assert.equal(result.value.length, rowsBefore + 1, 'amount of rows changed as expected');
            })

    }

}

function fillValidFormData(browser) {
    browser
        .url(uri + 'conferences')
        .waitForElementVisible("select[name=roomId]")
        .click(roomDropdownSelectorValue)
        .setValue(conferenceNameInputSelector, 'Java Summit 2020')
}