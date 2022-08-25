import { LightningElement, wire } from 'lwc';
import getTopAccounts from '@salesforce/apex/AccountController.getTopAccounts';
import AccountMC from '@salesforce/messageChannel/AccountMessageChannel__c';
import { publish, MessageContext } from 'lightning/messageService';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class AcctList extends LightningElement {

    records;                // used to hold the account records returned
    error;                  // used to hold errors returned from the wire service
    selectedAccount;        // property to hold the selected Account Id from the child event

    openMode= false;

    @wire(MessageContext) 
    messageContext;         // creating a property that hold the message context object

    @wire(getTopAccounts)
    wiredAccounts({data, error}) {
        if (data) {
            this.records = data;
            this.error = undefined;
            //take the ID of the first account returned and publish it to the message channel
            this.selectedAccount = this.records[0].Id;
            this.sendMessageService(this.selectedAccount);
        }
        if (error) {
            this.records = undefined;
            this.error = error;
        }
    }

    handleSelect(event) {
        this.selectedAccount = event.detail;
        this.sendMessageService(this.selectedAccount);
        console.log('handleSelect was called with ID: ' + this.selectedAccount);
    }

    // method to accept an account ID and publish it to the message channel
    sendMessageService(accountId) {
        publish(this.messageContext, AccountMC, { recordId: accountId });
        console.log('Acct List Published a message with account ID: ' + accountId);
    }
    createAcct()
    {
        this.openMod = true;
    }
    closeMod()
    {
        this.openMod = false;
    }

    cancelMod()
    {
        this.openMod = false;
    }

    saveMod()
    {
        this.openMod = false;

        //----------------- create a toast event and dispatch it ------------------------
        const toastEvent = new ShowToastEvent({
            title: 'Account Created Successfully',
            message: `The new Account record was created beautifully`,
            variant: 'success',
            mode: 'dismissable'}

        );
    }
}
