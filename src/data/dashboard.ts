export type SortOrderTypes = {
	id: number;
	name: string;
	value: 'Launch_Date' | 'Mission_Name';
};

export const LAUNCH_SORT_ORDER: SortOrderTypes[] = [
	{
		id: 0,
		name: 'Mission Name',
		value: 'Mission_Name',
	},
	{
		id: 1,
		name: 'Launch Date',
		value: 'Launch_Date',
	},
];
