import { LightningElement } from 'lwc';

export default class MyGreetings extends LightningElement {

    personInput;
    personToGreet;
    showThis = true;
    first = 'Buzz';                     //property to hold first name
    last = 'Lightyear';                 //property to hold last name

    get fullName()
    {
        return `${this.first} ${this.last}`;
    }

    handleChange(event)
    {
        this.personToGreet = event.target.value;
    }
    handleToggle()
    {
      /*  if(this.showThis === true)
        {
            this.showThis = false;
        }
        else if(this.showThis === false)
        {
            this.showThis = true;
        }*/

        this.showThis = !this.showThis;
    }
    handleName(event)
    {
        const field = event.target.name;
        if(field === 'firstName')
        {
            this.first = event.target.value;
        }
        else if(field === 'lastName')
        {
            this.last = event.target.value;
        }
    }
    handleMyEvent()
    {
        this.showThis = !this.showThis;
    }
}