import { LightningElement, api, wire } from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunityController.getOpportunities';
import {refreshApex} from '@salesforce/apex'
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';
import OPP_NAME_FIELD from '@salesforce/schema/Opportunity.Name'
import OPP_AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount'
import OPP_CLOSEDATE_FIELD from'@salesforce/schema/Opportunity.CloseDate'
import {subscribe, unsubscribe} from 'lightning/empApi'

export default class OpportunityList extends LightningElement 
{
    @api recordId;
    displayedOpps = [];                 //array of records to display in the user interface
    allOpps = [];                       //array of all the records returned from the wired method
    recordsToDisplay = false;
    status = 'All';
    totalRecords = 0;                   //property to hold the record count
    totalAmount = 0;                    //property to hold the sum of all opps displayed
    results;                            //property to hold the data and error properties returned form the wired method
    channelName = '/topic/Opportunities'            //property to hold the push topic to the channel
    subscription = {};
    tableMode = true;                               //property to determien whether to display data table or regular display

    columns = [
        {label: 'Opportunity Name', fieldName: OPP_NAME_FIELD.fieldApiName, type: 'text'}, 
        {label: 'Amount', fieldName: OPP_AMOUNT_FIELD.fieldApiName, type: 'currency'},
        {label: 'Stage', fieldName: STAGE_FIELD.fieldApiName, type: 'text'},
        {label: 'Close Date', fieldName: OPP_CLOSEDATE_FIELD.fieldApiName, type: 'date'}   
    ];

    options = [
        {value: 'All', label: 'All'},
        {value: 'Open', label: 'Open'},
        {value: 'Closed', label: 'Closed'},
        // {value: 'ClosedWon', label: 'Closed Won'},
        // {value: 'ClosedLost', label: 'Closed Lost'}
    ];

    @wire(getPicklistValues, {recordTypeId: '012000000000000AAA', fieldApiName: STAGE_FIELD})
    wiredPicklist({data, error})
    {
        if(data)
        {
            console.log(data);
            for(let item of data.values)
            {
                this.options.push({value: item.value, label: item.label});
            }
            this.options = this.options.slice();
        }
        else if(error)
        {
            console.log('Erro occurred retrieving picklist values');
        }
    }

    @wire(getOpportunities, {accountId: '$recordId'})
    wiredOpps(oppRecords)
    {
        this.results = oppRecords;
        if(this.results.data)
        {
   //         this.displayedOpps = data;
            this.allOpps = this.results.data;
            this.updateList();
    /*        if(this.displayedOpps.length > 0)
            {
                this.recordsToDisplay = true;
            }
            else
            {
                this.recordsToDisplay = false;
            }*/
        }
        if(this.results.error)
        {
            console.log('Error occurred');
        }
    }

    handleChange(event)
    {
        this.status = event.detail.value;
        this.updateList();
    }

    updateList()
    {
        this.displayedOpps = [];        //clearing out the displayedOpps array
        
        if(this.status == 'All')
        {
                this.displayedOpps = this.allOpps;
        }
        else
        {
            for(let i = 0; i < this.allOpps.length; i++)
            {
                if(this.status == 'Open')
                {
                      if(!this.allOpps[i].IsClosed)
                      {
                          this.displayedOpps.push(this.allOpps[i]);
                      }  
                }
                else if(this.status == 'Closed')
                {
                    if(this.allOpps[i].IsClosed)
                    {
                        this.displayedOpps.push(this.allOpps[i]);
                    } 
                }
                else if(this.status == this.allOpps[i].StageName)
                {
                    this.displayedOpps.push(this.allOpps[i]);
                }
                
            }

            
        }

        if(this.displayedOpps.length > 0)
        {
            this.recordsToDisplay = true;
        }
        else
        {
            this.recordsToDisplay = false;
        }
        this.totalRecords = this.displayedOpps.length;
        this.totalAmount = this.displayedOpps.reduce((prev, curr) => prev + curr.Amount, 0);
    }
    refresh()
    {
        return refreshApex(this.results);
    }
    connectedCallback()
    {
        this.handleSubscribe();
    }

    disconnectedCallback()
    {
        this.handleUnsubscribe();
    }

    handleSubscribe()
    {
        const messageCallback = response => {
            if(response.data.sobject.AccountId === this.recordId)
            {
                this.refresh();
            } 
        }
        subscribe(this.channelName, -1, messageCallback)
        .then(response=> {this.subscription = response;});
    }

    handleUnsubscribe()
    {
        const unsubCallback = response =>{
            console.log('unsubscribe completed')
        }

        unsubscribe(this.subscription, unsubCallback);
    }
    handleToggle(event)
    {
        const selection = event.detail.value;

        if(selection == 'card')
        {
            this.tableMode = false;
        }
        else if(selection == 'table')
        {
            this.tableMode = true;
        }
    }
}