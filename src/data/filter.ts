import { TFilterObj } from 'screens/DashBoard';

export const filterObjInitialState: TFilterObj = {
	rocketName: [],
	launchStatusOpt: [],
	upcomingStatus: [],
	startDate: undefined,
	endDate: undefined,
};

export const UPCOMING_OPT = [
	{ id: 0, name: 'Upcoming', value: 'upcoming' },
	{ id: 1, name: 'Completed', value: 'completed' },
];

export const LAUNCH_STATUS_OPT = [
	{ id: 0, name: 'Success', value: 'success' },
	{ id: 1, name: 'Failed', value: 'failed' },
];
