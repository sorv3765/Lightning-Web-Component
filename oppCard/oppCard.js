import { LightningElement, api } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class OppCard extends NavigationMixin (LightningElement) 
{
    @api name;
    @api amount;
    @api stage;
    @api closeDate;
    @api oppId;

    modOpen = false;

    viewRecord()
    {
        this[NavigationMixin.Navigate](
            {
            type: 'standard__recordPage', 
            attributes:{
                recordId: this.oppId, 
                actionName: 'view',
            }
        });


    }

    editOpp()
    {
        this.modOpen = true;
    }
    closeClick()
    {
        this.modOpen = false;
    }
    cancelMod()
    {
        this.modOpen = false;
    }
    saveMod()
    {
        this.modOpen = false;

        //create a toast event and dispatch it
        const toastEvent = new ShowToastEvent({
            title: 'Opportunity saved successfully',
            message: `The Opportunity reocrd with ID: ${this.oppId} was saved successfully`,
            variant: 'success',
            mode: 'dismissable'}

        );

        //dispatch the toast event
        this.dispatchEvent(toastEvent);
        
        const savedEvent = new CustomEvent('modsaved');
        this.dispatchEvent(savedEvent);
    }
}