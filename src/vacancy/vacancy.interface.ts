export enum WorkEnum {
	OFFICE = 'Офис/Бишкек',
	REMOTE = 'Удалённая работа',
	PROJECT = 'Проектная работа',
	INTERSHIP = 'Стажировка',
}

export interface MonthlyPay {
	min_price: number;
	max_price: number;
}

interface ProjectPay {
	price: number;
}

interface FromPay {
	min_price: number;
}

interface UntilPay {
	max_price: number;
}

export type Salary = MonthlyPay | ProjectPay | FromPay | UntilPay;
