export const YAPP_ENS = "koruvaa.ipecity.eth";
export const RECEIVER_ADDRESS = "0xB2c31e855C8D092E2A2f877DFB154Abb4793F9F6";
export const RECEIVER_ENS = "koruvaa.ipecity.eth";
export const DEFAULT_PAYMENT_CURRENCY = "BRL";
export const DEFAULT_PAYMENT_AMOUNT = 60; // TODO: set to 60 in prod
export const APP_URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:3001"
		: "https://ipe-canoe-yapp.replit.app";

export const EARLY_TIME = "06:00";
export const LATE_TIME = "07:30";
export const SPOTS_PER_SLOT = 10;
