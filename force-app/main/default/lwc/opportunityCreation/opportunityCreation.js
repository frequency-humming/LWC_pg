import { LightningElement,wire,track} from 'lwc';
import { refreshApex } from '@salesforce/apex';
import OPP_NAME from '@salesforce/schema/Opportunity.Name';
import OPP_DESCRIPTION from '@salesforce/schema/Opportunity.Description';
import parseDataFromLWC from '@salesforce/apex/OpportunityAndLead.parseDataFromLWC';

export default class OpportunityCreation extends LightningElement {

    name;
    description;
    source = 'Web';
    stage = 'Prospecting';

    email;
    phoneNumber;
    customerFirstName;
    customerLastName;
    status = 'Open - Not Contacted';
    company = this.name;

    thank = false;

    handledChange(event){


        if(event.target.name==='name'){
            this.name = event.target.value;
        }
        else if(event.target.name==='description'){
            this.description = event.target.value;  
        }
    }

    handleClick(){
        let opp = {'sobjectType': 'Opportunity'};
        opp.Name = this.name;
        opp.Description = this.description;
        parseDataFromLWC({opp:opp})
        .then(result => {
            this.thank = true;
            window.console.log('test');
        })
    };
    
}