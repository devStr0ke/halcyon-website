export interface NftObject {
    attributes: any;
    collectionPackageObjectId: string
    id: string
    logicalOwner: string
    name: string
    ownerAddress: string
    packageModule: string
    packageModuleClassName: string
    packageObjectId: string
    rawResponse: any
    url: string
}

export interface UserObject {
    address: string,
    magicNumber: number,
    testCoinIds: string[],
    filledBottleIds: string[],
    emptyBottleIds: string[],
    ticketIds: string[],
}

export interface UserStore extends UserObject {
    setUser: (_user: UserObject) => void
}