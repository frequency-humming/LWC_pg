public with sharing class OpportunityAndLead {
    
    @AuraEnabled(cacheable=true)
    public static String parseDataFromLWC(Opportunity opp){

        System.debug('I am here');
        System.debug(opp);
        return 'here';
    }

}
