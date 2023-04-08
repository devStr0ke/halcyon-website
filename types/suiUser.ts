export interface NftObject {
  attributes: any;
  collectionPackageObjectId: string;
  id: string;
  logicalOwner: string;
  name: string;
  ownerAddress: string;
  packageModule: string;
  packageModuleClassName: string;
  packageObjectId: string;
  rawResponse: any;
  url: string;
}

export interface Role {
  role: string;
  claimed: boolean;
  enthusiast: boolean;
}

export interface UserObject {
  address: string;
  magicNumber: number;
  testCoinIds: string[];
  filledBottleIds: string[];
  emptyBottleIds: string[];
  ticketIds: string[];
  roles: Role[];
  isWetlisted: boolean | null;
}

export interface UserStore extends UserObject {
  loading: boolean;
  setLoading: (_loading: boolean) => void;
  setUser: (_user: UserObject) => void;
  updateRoleClaimStatus: (_role: string) => void;
  setIsWetlisted: () => void;
  addBottle: (_bottle: { id: string; is_filled: boolean }) => void;
}
