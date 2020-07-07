import { LightningElement, track, wire } from 'lwc';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

const COLUMNS = [
    { label: 'Account Name', fieldName: NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Annual Revenue', fieldName: REVENUE_FIELD.fieldApiName, type: 'currency',cellAttributes: { alignment: 'left' } },
    { label: 'Industry', fieldName: INDUSTRY_FIELD.fieldApiName, type: 'text' }
];
export default class AccountList extends LightningElement {

    @track error;
    @track columns = COLUMNS;
    @track accts; //All opportunities available for data table    
    @track showTable = false; //Used to render table after we get the data from apex controller    
    @track recordsToDisplay = []; //Records to be displayed on the page
    @track rowNumberOffset; //Row number

    @wire(getAccounts)
    wiredAccounts({error, data}) {
        if(data){
            let recs = [];
            for(let i=0; i<data.length; i++){
                let acct = {};
                acct.rowNumber = ''+(i+1);
                acct.acctLink = '/'+data[i].Id;
                acct = Object.assign(acct, data[i]);
                recs.push(acct);
            }
            this.accts = recs;
            this.showTable = true;
        }else{
            this.error = error;
        }
    }
    //Capture the event fired from the paginator component
    handlePaginatorChange(event){
        this.recordsToDisplay = event.detail;
        this.rowNumberOffset = this.recordsToDisplay[0].rowNumber-1;
    }

}