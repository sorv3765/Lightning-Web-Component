import { LightningElement, api, wire } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class CaseCard extends NavigationMixin (LightningElement) 
{
    
    @api caseNumber;
    @api subject;
    @api status;
    @api priority;
    @api caseId;


    modOpen = false;

    //Navigate to Case Record
    viewCase()
    {
        this[NavigationMixin.Navigate](
            {
            type: 'standard__recordPage', 
            attributes:{
                recordId: this.caseId, 
                actionName: 'view',
            }
        });


    }

    editCase()
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

        //----------------- create a toast event and dispatch it ------------------------
            const toastEvent = new ShowToastEvent({
            title: 'Account Updated Successfully',
            message: `The Case record was updated beautifully`,
            variant: 'success',
            mode: 'dismissable'}

        );

        //dispatch the toast event
        this.dispatchEvent(toastEvent);
    }
}