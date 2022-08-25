import { LightningElement,api } from 'lwc';

export default class ContactCard extends LightningElement {
    @api name = "Shaniel Rivas";
    @api title;
    @api phone;
    @api email;

    handleSelect()
    {
        const selected = new CustomEvent('selected', {detail: this.name});
        this.dispatchEvent(selected);
    }
}