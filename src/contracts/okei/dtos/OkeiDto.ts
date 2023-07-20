export class OkeiDto {
    code: string;
    name: string;
    conventionDesignationNational: string;
    conventionDesignationInternational: string;
    codeDesignationNational: string;
    codeDesignationInternational: string;

    constructor(
        code: string,
        name: string,
        conventionDesignationNational: string,
        conventionDesignationInternational: string,
        codeDesignationNational: string,
        codeDesignationInternational: string) {
        this.code = code;
        this.name = name;
        this.conventionDesignationNational = conventionDesignationNational;
        this.conventionDesignationInternational = conventionDesignationInternational;
        this.codeDesignationNational = codeDesignationNational;
        this.codeDesignationInternational = codeDesignationInternational;
    }
}