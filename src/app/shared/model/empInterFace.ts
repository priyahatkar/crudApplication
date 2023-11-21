


export interface Iemployee{
    id : string;
    fName : string
    lName : string
    contact : number
    email : string
    gender : Igender
    dateOfBirth : Date
    experience : string
    education : string
    company : string
}

export type Igender = "Male" | "Female" 