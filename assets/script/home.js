'use strict';

/*
npm init -y
        npm i lite-server -D (aka --save-dev)
        + Add a script to your package.json
        + npm run start
*/

//Import utilities functions  

import {
    onEvent,
    select,
    selectById,
    selectAll,
    print,
    randomNumber,
    create,
} from "./utils.js";



/*--------------------------------------------------------------------------------*/
/* Function: Event onload to Get API's users                             */
/*--------------------------------------------------------------------------------*/
const URL = "https://randomuser.me/api/?nat=CA&results=15";

const options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
    mode: "cors",
};

async function getUsers() {
    try {
        const result = await fetch(URL, options);
        if (!result.ok) {
            throw new Error(`${result.statusText}(${result.status})`);
        }

        const users = await result.json();
        const list = users.results;
        setUsers(list);

    } catch (error) {
        console.error(error.message);
    }
}

getUsers();

const contactsDiv = select('.grid-contacts');
function setUsers(list) {
    list.forEach(user => {

        // Create a div to hold the user info
        const contactDiv = document.createElement('div');
        contactDiv.className = 'contact-div';

        const contactImg = document.createElement('img');
        contactImg.className = 'contact-img';
        contactImg.src = user.picture.medium;
        contactDiv.appendChild(contactImg);

        const contactInfo = document.createElement('div');
        contactInfo.className = 'contact-info';

        const contactName = document.createElement('p');
        contactName.className = 'contact-name';
        contactName.innerText = `${user.name.first} ${user.name.last}`;
        contactInfo.appendChild(contactName);

        const contactCity = document.createElement('p');
        contactCity.className = 'conact-city';
        contactCity.textContent = user.location.city;
        contactInfo.appendChild(contactCity);

        contactDiv.appendChild(contactInfo);

        const addContact = document.createElement('i');
        addContact.classList.add('fas', 'fa-user-plus');
        contactDiv.appendChild(addContact);

        contactsDiv.appendChild(contactDiv);
    });
}






