import { LightningElement, wire} from 'lwc';
import AccountMC from '@salesforce/messageChannel/AccountMessageChannel__c';
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class AcctDetail extends LightningElement 
{
    accountId;                          // property to hold the account ID for the record to display a related list for
    subscription = null;                // property to hold the subscription information

    //----------- These are required for Message Channel ---------------------------
    @wire(MessageContext)
    messageContext;

    connectedCallback() 
    {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() 
    {
        this.unsubscribeFromMessageChannel();
    }

    subscribeToMessageChannel() 
    {
        if(!this.subscription) 
        {
            this.subscription = subscribe(
                this.messageContext,
                AccountMC,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            )
        }
    }

    unsubscribeFromMessageChannel() 
    {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleMessage(message) 
    {
        this.accountId = message.recordId;
    }
//-----------------------------------------------------------------------   
   
    //This is creating the ShowToast Event
    saveMod()
    {
            //----------------- create a toast event and dispatch it ------------------------
        const toastEvent = new ShowToastEvent({
            title: 'Account Updated Successfully',
            message: `The Account record with ID: ${this.accountId} was updated beautifully`,
            variant: 'success',
            mode: 'dismissable'}

        );

        //dispatch the toast event
        this.dispatchEvent(toastEvent);
        
        const savedEvent = new CustomEvent('modsaved');
        this.dispatchEvent(savedEvent);
    }
    //--------------------------------------------------------------------------------
}