import React, { ReactNode } from "react";

/**
 * Interface for the ContextProvider
 * @interface
 */
export interface ContextProviderProps {
  children: ReactNode;
}

interface ReferralRequestFormDto {
	url: string;
	experience: number;
	description: string;
}

/**
 * continueReferralRequestDataDto - This interface is used to define the structure of continueReferralRequestDataDto
 */
export interface continueReferralRequestDataDto {
	type: string;
	url: string;
	data: ReferralRequestFormDto | null;
}

export interface AppContextType {
  isLoggedIn: boolean;
  tokenData: any | null;
  setAuthState: (tokenData: any, isLoggedIn: boolean) => void;
  setUpdateCheck: React.Dispatch<React.SetStateAction<boolean>>;
  userDetails: any | null;
   PendingApply: continueReferralRequestDataDto | null ;
   setPendingApply: React.Dispatch<React.SetStateAction<continueReferralRequestDataDto | null >>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}