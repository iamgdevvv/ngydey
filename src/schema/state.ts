const dataState = {
	error: 'red',
	fail: 'red',
	success: 'green',
	info: 'blue',
};

export type IState = keyof typeof dataState;

export { dataState };
