import { LightningElement, api } from 'lwc';

export default class ChildComponent extends LightningElement 
{
    @api firstName = 'Bob';      //property to hold first name
    @api lastName = 'Marley';    //property to hold last name

    handleClick()
    {
        const ourEvent = new CustomEvent('custevent', {detail: this.firstName});
        this.dispatchEvent(ourEvent);
    }

    constructor()
    {
        super();
        console.log('Child component constructor fired!');
    }

    connectedCallback()
    {
        console.log('Child component connectedCallback fired!');
    }
    disconnectedCallback()
    {
        console.log('Child component disconnectedCallback fired!')
    }
    renderedCallback()
    {
        console.log('Child component renderedCallback fired!');
    }
    errorCallback()
    {
        console.log('Child component errorCallback fired!');
    }
}