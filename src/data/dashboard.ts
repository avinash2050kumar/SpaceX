export type TLAUNCH_SORT_ORDER = {
	id: number;
	name: string;
	value: 'Launch_Date' | 'Mission_Name';
};

export const LAUNCH_SORT_ORDER: TLAUNCH_SORT_ORDER[] = [
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
