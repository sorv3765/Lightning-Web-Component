import { LightningElement } from 'lwc';

export default class MyCombo extends LightningElement 
{
    comboBoxOne = [
        {value: 'Hello', label: 'Hello'},
        {value: 'Greetings', label: 'Greetings'},
        {value: 'Hola', label: 'Hola'},
        
    ];

    comboBoxTwo = [
        {value: 'John', label: 'John'},
        {value: 'Dagny', label: 'Dagny'},
        {value: 'Henry', label: 'Henry'},
        
    ];

    comboBoxThree = [
        {value: 'Smith', label: 'Smith'},
        {value: 'Taylor', label: 'Taylor'},
        {value: 'Launter', label: 'Launter'},
        
    ];

    greeting = 'Yoo';
    firstName = 'Omar';
    lastName = 'Rivas';

    comboChange(event)
    {
        this.greeting = event.detail.value;
    }
    cboxChange(event)
    {
        this.firstName = event.detail.value;
    }
    lastBoxChange(event)
    {
        this.lastName = event.detail.value;
    }
    
}