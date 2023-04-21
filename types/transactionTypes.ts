export interface ModalStore {
  modalContent: string;
  isModalOpened: boolean;
  isBottleFilled: null | boolean;
  setShowModal: (_isModalOpened: boolean) => void;
  setModalContent: (_content: string) => void;
  setIsBottleFilled: (_isBottleFilled: null | boolean) => void;
}

export interface PasswordModalStore {
  isPasswordModalOpened: boolean;
  passwordInput: string;
  password: string;
  hasAlreadyBeenTyped: boolean;
  setShowPasswordModal: (_isPasswordModalOpened: boolean) => void;
  setPasswordInput: (_passwordInput: string) => void;
  setHasAlreadyBeenTyped: (_hasAlreadyBeenTyped: boolean) => void;
}

export interface TransactionStore {
  confirmed: boolean;
  disabled: boolean;
  setConfirmed: (_confirmed: boolean) => void;
  setDisabled: (_disabled: boolean) => void;
}