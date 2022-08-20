import moment from 'moment';

export const toDate = (date?: Date) => {
	return moment(date).toDate();
};

export const formatDate = (date?: Date | string, format?: string) => {
	return moment(date).format(format || 'LL');
};
