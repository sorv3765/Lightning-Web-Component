import { LightningElement, api, wire } from 'lwc';
import getCaseList from '@salesforce/apex/CaseController.getCaseList';

export default class CaseList extends LightningElement 
{
    @api recordId;
    cases;
   
    @wire(getCaseList, {accountId: '$recordId'})
    wiredCass({data,error})
    {
        if (data) 
        {
            this.cases = data;
            this.error = undefined;
        }
        if(error)
        {
            this.cases = undefined;
            this.error = error;
            console.log('Case List Error occurred');
        }
    }

}