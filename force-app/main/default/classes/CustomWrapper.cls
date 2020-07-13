public with sharing class CustomWrapper {
    
    class InnerWrapper {
        @AuraEnabled
        public String someInnerObjectName { get; set; }
        @AuraEnabled
        public String someInnerFirstName { get; set; }
        @AuraEnabled
        public String someInnerLastName { get; set; }
        @AuraEnabled
        public String someInnerStringEmail { get; set; }
    }

    @AuraEnabled
    public Integer someInteger { get; set; }
    @AuraEnabled
    public String someString { get; set; }
    @AuraEnabled
    public List<InnerWrapper> someList { get; set; }

}
