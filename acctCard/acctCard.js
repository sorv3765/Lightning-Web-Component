import { LightningElement, api } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class AcctCard extends LightningElement {

    @api name;
    @api annualRevenue;
    @api phone;
    @api acctId;
    showContacts = false;       //this property will be used to determine whether or not to display contacts
    
    contacts;           //this property will hold the list of contact records returned
    error;              //this property will hold any errors returned from getContactList

    handleSelect() {
        const myEvent = new CustomEvent('selected', { detail: this.acctId });
        this.dispatchEvent(myEvent);
    }

    displayContacts()
    {
        if(this.showContacts)
        {
            this.showContacts = false;
        }
        else
        {
            getContactList( {accountId: this.acctId} )
                .then((data) => {
                this.contacts = data;
                this.error = undefined;
                this.showContacts = true;
                }
            )
            .catch((error) => {
                this.error = error;
                this.contacts = undefined;
                }
            );
        }
    }
}
