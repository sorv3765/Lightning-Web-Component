import { LightningElement } from 'lwc';
import GenWatt2 from '@salesforce/resourceUrl/GenWatt2';
import { loadStyle } from 'lightning/platformResourceLoader';

export default class HelloWorld extends LightningElement 
{
    
    constructor() {
        super();
        
        loadStyle(this, GenWatt2)
            .then(() => { console.log('Static Resources was loaded successfully');
            })
            .catch(() => { console.log('Static resource did NOT load successfully');
            })
            .finally(() => { console.log('Finally finished whether it was successfully or not');
            });
    }
}