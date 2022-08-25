import { LightningElement, api } from 'lwc';

export default class OppRecordForm extends LightningElement {
    @api recordId;          //property to hold a record Id
    @api objectApiName;     //property to hold the object API for record

    @api layoutType = "Compact" ;
    @api mode = "readonly";


    handleCancel()
    {
        const cancelEvent = new CustomEvent('canceled',);
        this.dispatchEvent(cancelEvent);
    }
    handleSuccess()
    {
        const successEvent = new CustomEvent('saved')
        this.dispatchEvent(successEvent);
    }
}