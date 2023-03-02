// import { useDispenserStore, useMonkeyStore } from "../store/store";
import { TEST_ADDRESS } from '../backend/dispenser/config';
// import useStoreContractInfo from '../backend/dispenser/useStoreContractInfo';
import useStoreUserInfo from '../backend/dispenser/useStoreUserInfo';

export default function Dispenser() {
    useStoreUserInfo(TEST_ADDRESS);
    
    return (
        <>
            <h1 className="text-4xl mt-40 text-cyan-500">njr</h1>
        </>
    )
}