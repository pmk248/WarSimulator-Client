export type LoginDto = {
    username : string,
    password : string
}

export type RegisterDTO = {
    username     : string;
    password     : string;
    organization : UserRole;  
    region?      : Region;         
}

export enum UserRole {
    IDF       = "IDF",
    Hezbollah = "Hezbollah",
    Hamas     = "Hamas",
    IRGC      = "IRGC",
    Houthis   = "Houthis"
}

export enum Region {
    North    = "North",
    South    = "South",
    Center   = "Center",
    WestBank = "West Bank"
}
