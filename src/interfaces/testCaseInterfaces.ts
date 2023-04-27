import { ListingOptions } from "./listingInterfaces";


export interface TestCaseInsertion {
    metaData?: object,
    isSuccessful?: boolean,
}

export interface TestCaseListingOptions extends ListingOptions{
    name?: string
    testSuite?: {
        id?: string
    }
}

export interface TestCaseUpdate {
    isSuccessful?: boolean
}