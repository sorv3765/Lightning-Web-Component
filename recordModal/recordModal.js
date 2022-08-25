import { LightningElement, api } from 'lwc';


export default class RecordModal extends LightningElement 
{
    @api recordId;
    @api objectApiName;
    @api formMode;
    @api layoutType;

    get modalLabel() {
        if (this.recordId === undefined) {
            return `Create ${this.objectApiName}`;
        }
        
        if (this.formMode === 'edit') {
            return `Edit ${this.objectApiName}`;
        }

        if (this.formMode === 'view' || this.formMode === 'readonly') {
            return `View ${this.objectApiName}`;
        }
    }


    closeModal() {
        this.dispatchEvent(new CustomEvent('close'));
    }

    cancelModal() {
        this.dispatchEvent(new CustomEvent('cancel'));
    }

    successModal() {
        this.dispatchEvent(new CustomEvent('success'));
    }

}