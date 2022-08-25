import { LightningElement, api } from 'lwc';

export default class PropExample extends LightningElement 
{
    @api property1;
    @api property2;

    firstName= 'Omar';

    changeName(event)
    {
        this.firstName = event.target.value;
    }
    handleClicked()
    {
        console.log('handleClicked method was invoked');
        const myEvent = new CustomEvent('myevent');
        this.dispatchEvent(myEvent);
    }

}
