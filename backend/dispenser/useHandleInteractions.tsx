import { useMemo } from 'react';

import useAuth from '../supabase/useAuth';
import { updateIsWetlisted, updateRoleClaimed } from '../supabase/supabase';

import { useDispenserStore, useConfigStore } from '../../store/dispenserStore';
import { useUserStore } from '../../store/userStore';
import { usePasswordModalStore, useModalStore } from '../../store/transactionStore';
import { useTransactionStore } from '../../store/transactionStore';

import { useSendTx } from './useSendTx';
import { getBatchOrNot } from './dispenserStatus';

import { Batch, DispenserStore, Config } from '../../types/dispenserTypes';

const useHandleInteractions = () => {
    const { session } = useAuth();
    const config = useConfigStore((state) => state);
    const { setShowPasswordModal, setHasAlreadyBeenTyped, passwordInput, password, hasAlreadyBeenTyped } = usePasswordModalStore((state) => state);
    const { setModalContent, setShowModal, setIsBottleFilled } = useModalStore((state) => state);
    const { confirmed, setConfirmed, setDisabled } = useTransactionStore();

    const dispenser = useDispenserStore((state) => state);
    const user = useUserStore((state) => state);
    const { roles, updateRoleClaimStatus, setIsWetlisted } = user;

    const { buyRandomBottle, buyRandomBottleWithCoins, claimFilledBottle, claimRandomBottle, recycle, register, swapNft } = useSendTx();

    const filledBottleRoles = useMemo(() => {
        return roles.filter((r) => !r.enthusiast && !r.claimed);
    }, [roles]);

    const emptyBottleRoles = useMemo(() => {
        return roles.filter((r) => r.enthusiast && !r.claimed);
    }, [roles]);



    const handleBuy = async (dispenser: DispenserStore) => {
        try {
            setDisabled(true);
            const batchOrNot = getBatchOrNot(dispenser);
            if (batchOrNot === Batch.Sui) {
                const result = await buyRandomBottle();

                await handleResult(result, config);
            } else {
                const result = await buyRandomBottleWithCoins();

                await handleResult(result, config);
            }
            } finally {
            setDisabled(false);
        }
    };

    const handleRecycle = async () => {
        if (confirmed) {
        try {
            setDisabled(true);
            const result = await recycle();
            await handleResult(result, config);
        } finally {
            setDisabled(false);
            setConfirmed(false);
        }
        } else {
        setConfirmed(true);
        }
    };

    const handleSwap = async () => {
        try {
        setDisabled(true);
        const result = await swapNft();
        await handleResult(result, config);
        } finally {
        setDisabled(false);
        }
    };

    const handleClaim = async () => {
        try {            
            setDisabled(true);
            if (filledBottleRoles.length > 0) {
                const result = await claimFilledBottle();
                await handleResultClaimFromDiscord(result, config, filledBottleRoles[0].role);
            } else if (emptyBottleRoles.length > 0) {
                const result = await claimRandomBottle();
                await handleResultClaimFromDiscord(result, config, emptyBottleRoles[0].role);
        }
        } finally {
        setDisabled(false);
        }
    };

    const handleRegister = async () => {
        try {
        setDisabled(false);
        const result = await register();
        await handleResult(result, config);
        } finally {
        setDisabled(false);
        }
    };

    const handlePasswordModal = () => {
        if(!password || hasAlreadyBeenTyped){
        handleBuy(dispenser)
        } else setShowPasswordModal(true)
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (passwordInput === password) {
            setShowPasswordModal(false);
            handleBuy(dispenser);
            setHasAlreadyBeenTyped(true);
        } else {
            alert('Incorrect password');
        }
    };


    const handleResult = async (result: any, config: Config) => {
        if (!result) {
        console.log('Tx canceled');
        } else {
        if (result.effects.status.status !== 'success') {
            // Show error
            console.log(`https://explorer.sui.io/txblock/${result.digest}?network=${config.net}`);
        } else {
            const registeredEvent = result.events.find(
            (evt: any) => evt.type === `${config.package_id}::bottles::AddressRegistered`
            );
            const receivedEvent = result.events.find(
            (evt: any) => evt.type === `${config.package_id}::bottles::RandomReceived`
            );
            
            if (registeredEvent && session) {
            console.log('Wetlist Registered');
            // Register wl in supabase
            await updateIsWetlisted(session.user.id, true);
            // Update local state
            setIsWetlisted();

            setModalContent('Wetlist Registered');
            setIsBottleFilled(null);
            setShowModal(true);
            } else {
            if (receivedEvent.parsedJson.is_filled) {
                console.log(receivedEvent);
                
                console.log('Filled Bottle Received');
                setModalContent('Filled Bottle Received');
                setIsBottleFilled(true);
            } else {
                console.log(receivedEvent);
                
                console.log('Empty Bottle Received');
                setModalContent('Empty Bottle Received');
                setIsBottleFilled(false);
            }
            // Update local state
            setShowModal(true);
            }
        }
        }
    };

    const handleResultClaimFromDiscord = async (result: any, config: Config, role: string) => {
        if (!result) {
        console.log('Tx canceled');
        } else {
        if (result.effects.status.status !== 'success') {
            // Show error
            console.log(`https://explorer.sui.io/txblock/${result.digest}?network=${config.net}`);
        } else {
            const receivedEvent = result.events.find(
            (evt: any) => evt.type === `${config.package_id}::bottles::RandomReceived`
            );
            if (session) {
            if (receivedEvent.parsedJson.is_filled) {
                console.log('Filled Bottle Received!');
                setModalContent('Filled Bottle Received!');
                setIsBottleFilled(true);
            } else {
                console.log('Empty Bottle Received!');
                setModalContent('Empty Bottle Received!');
                setIsBottleFilled(false);
            }
            // Update local state
            setShowModal(true);

            // Change roles in db
            if (session.user.identities) await updateRoleClaimed(session.user.identities[0].id, role);
            // Update local state
            updateRoleClaimStatus(role);
            }
        }
        }
    };

    return { handleBuy, handleClaim, handleRecycle, handleRegister, handleSwap, handleSubmit, handlePasswordModal, handleResult, handleResultClaimFromDiscord }
};

export default useHandleInteractions;
