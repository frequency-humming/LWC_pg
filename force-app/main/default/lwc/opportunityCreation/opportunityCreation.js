import { LightningElement,wire,track} from 'lwc';
import { refreshApex } from '@salesforce/apex';
import OPP_NAME from '@salesforce/schema/Opportunity.Name';
import OPP_DESCRIPTION from '@salesforce/schema/Opportunity.Description';
import parseDataFromLWC from '@salesforce/apex/OpportunityAndLead.parseDataFromLWC';
import checkApexTypes from '@salesforce/apex/OpportunityAndLead.checkApexTypes';

export default class OpportunityCreation extends LightningElement {

    name;
    description;
    source = 'Web';
    stage = 'Prospecting';
    type = 'New Customer';
    today = new Date();

    email;
    mobile;
    customerFirstName;
    customerLastName;
    company = this.name;
    title;

    listItemValue = 4;
    numberValue = 1;
    stringValue = 'New Object';

    message;
    error;
    thank = false;

    handledChange(event){

        if(event.target.name==='name'){
            this.name = event.target.value;
        }
        else if(event.target.name==='description'){
            this.description = event.target.value;  
        }
        else if(event.target.name==='contactFirstName'){
            this.customerFirstName = event.target.value;  
        }
        else if(event.target.name==='contactLastName'){
            this.customerLastName = event.target.value;  
        }
        else if(event.target.name==='contactEmail'){
            this.email = event.target.value;  
        }
    }

    handleClick(){
        let opp = {'sobjectType': 'Opportunity'};
        opp.Name = this.name;
        opp.Description = this.description;
        opp.StageName = this.stage;
        opp.Type = this.type;
        window.console.log('stage:'+this.stage);
        opp.LeadSource = this.source;
        window.console.log('date:'+this.today);
        parseDataFromLWC({opp:opp})
        .then(result => {
            this.thank = true;
            window.console.log('test');
        })
        .catch(error => {
            window.console.log(error);
        })
    };

    handleButtonClick() {
        // Creating the object that represents the shape
        // of the Apex wrapper class.
        let parameterObject = {
            someString: this.stringValue,
            someInteger: this.numberValue,
            someList: []
        };
        // Populating a list
        /*for (let i = 0; i < this.listItemValue; i++) {
            parameterObject.someList.push({
                someInnerString: this.stringValue,
                someInnerInteger: this.numberValue
            });
        }*/
        parameterObject.someList.push({
            someInnerObjectName: 'Contact',
            someInnerFirstName: this.customerFirstName,
            someInnerLastName: this.customerLastName,
            someInnerStringEmail: this.email
        });
        // Calling the imperative Apex method with the JSON
        // object as parameter.
        checkApexTypes({ wrapper: parameterObject })
            .then((result) => {
                this.message = result;
                this.error = undefined;
                this.thank = true;
                window.console.log(this.message);
            })
            .catch((error) => {
                this.message = undefined;
                this.error = error;
            });
    }
    
}