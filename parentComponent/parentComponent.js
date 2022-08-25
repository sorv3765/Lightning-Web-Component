import { LightningElement, api } from 'lwc';

export default class ParentComponent extends LightningElement {

    @api selectedName;
    @api anotherName;
    contacts =[
        {
            Id: 1,
            firstName: 'Chris',
            lastName: 'Hemworth'
        },
        {
            Id: 2,
            firstName: 'Keanu',
            lastName: 'Reeves'
        },
        {
            Id: 3,
            firstName: 'Jason',
            lastName: 'Mamoa'
        }
    ];

    handleCustEvent(event)
    {
        this.selectedName = event.detail;
    }

    constructor()
    {
        super();
        console.log('Parent component constructor fired!');
    }

    connectedCallback()
    {
        console.log('Parent component connectedCallback fired!');
    }
    disconnectedCallback()
    {
        console.log('Parent component disconnectedCallback fired!')
    }
    renderedCallback()
    {
        console.log('Parent component renderedCallback fired!');
    }
    errorCallback()
    {
        console.log('Parent component errorCallback fired!');
    }
}