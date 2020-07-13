public with sharing class OpportunityAndLead {
    
    @AuraEnabled
    public static String parseDataFromLWC(Opportunity opp){

        System.debug('I am here');
        System.debug(opp);
        Date oppDate = date.today();
        Date oppClose = oppDate.addMonths(6);
        Opportunity inOpp = opp;
        inOpp.CloseDate = oppClose;
        insert inOpp;
        return 'here';
    }

    @AuraEnabled
    public static String checkApexTypes(CustomWrapper wrapper) {
        Contact con = new Contact();
        // Using System.debug() isn't good practice for production applications.
        // It's used here to showcase how the received data looks like in Apex.
        System.debug(wrapper);
        for(Integer i = 0; i < wrapper.someList.size(); i++){
            system.debug(wrapper.someList[i]);
            if(wrapper.someList[i].someInnerObjectName == 'Contact'){
                System.debug('I am Home');
                con.FirstName = wrapper.someList[i].someInnerFirstName;
                con.LastName = wrapper.someList[i].someInnerLastName;
                con.Email = wrapper.someList[i].someInnerStringEmail;
            }
        }
        insert con;
        // The values are based on the data that is defined in the
        // apexImperativeMethodWithComplexParams Lightning web component.
        String response =
            'You entered "' +
            wrapper.someString +
            '" as String, and "' +
            wrapper.someInteger +
            '" as Integer value. The list contained ' +
            wrapper.someList.size() +
            ' items.';
        return response;
    }

}
