import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { ModalStore, PasswordModalStore, TransactionStore } from '../types/transactionTypes';

export const useModalStore = create<ModalStore>((set) => ({
  modalContent: '',
  isModalOpened: false,
  isBottleFilled: null,
  setShowModal: (isModalOpened: boolean) =>
    set({
      isModalOpened
    }),
  setModalContent: (modalContent: string) =>
    set({
      modalContent
    }),
  setIsBottleFilled: (isBottleFilled: boolean | null) =>
    set({
      isBottleFilled
    }),
    shallow
}));

export const usePasswordModalStore = create<PasswordModalStore>((set) => ({
  isPasswordModalOpened: false,
  passwordInput: '',
  password: '',
  hasAlreadyBeenTyped: false,
  setShowPasswordModal: (isPasswordModalOpened: boolean) =>
    set({
      isPasswordModalOpened
    }),
  setPasswordInput: (passwordInput: string) =>
    set({
      passwordInput
    }),
  setHasAlreadyBeenTyped: (hasAlreadyBeenTyped: boolean) =>
    set({
      hasAlreadyBeenTyped
    }),
    shallow
}));

export const useTransactionStore = create<TransactionStore>((set) => ({
  confirmed: false,
  disabled: false,
  setConfirmed: (confirmed: boolean) =>
    set({
      confirmed
    }),
  setDisabled: (disabled: boolean) =>
    set({
      disabled
    }),
    shallow
}));
