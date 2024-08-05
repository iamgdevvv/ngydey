/* eslint-disable  @typescript-eslint/no-explicit-any */
import { ReactNode, useMemo } from 'react';
import { PiInfoBold } from 'react-icons/pi';
import { IState, dataState } from '@/schema/state';
import { Alert, MantineStyleProps } from '@mantine/core';

type Prop = {
	show?: boolean;
	state: IState;
	title?: ReactNode;
	children?: ReactNode;
	icon?: ReactNode;
};

type PropRest = {
	result: any;
	hideSuccess?: boolean;
};

const Message = ({ show = true, state, title, children, icon, mb, mt }: Prop & MantineStyleProps) => {
	if (!show) {
		return null;
	}

	return (
		<Alert
			variant='light'
			color={dataState[state]}
			title={title}
			icon={icon || <PiInfoBold />}
			mb={mb}
			mt={mt}
		>
			{children}
		</Alert>
	);
};

const MessageRest = ({ result, hideSuccess = true, mb }: PropRest & MantineStyleProps) => {
	const { isSuccess, isError } = result;

	const isEmptyRest = useMemo((): boolean => isSuccess === false && isError === false, [isSuccess, isError]);

	const titleRest = useMemo((): string => {
		if (isEmptyRest) {
			return '';
		}

		if (isSuccess) {
			return result?.data?.status || 'Success';
		}

		return result?.error?.status || 'Error';
	}, [result, isSuccess, isEmptyRest]);

	const messageRest = useMemo((): string => {
		if (isEmptyRest) {
			return '';
		}

		if (isSuccess) {
			return result?.data?.message || '';
		}

		return result?.error?.message || '';
	}, [result, isSuccess, isEmptyRest]);

	const stateRest = useMemo((): IState => {
		if (isSuccess) {
			return 'success';
		}

		return 'error';
	}, [isSuccess]);

	if (isEmptyRest) {
		return null;
	}

	if (hideSuccess && isSuccess) {
		return null;
	}

	return (
		<Message
			state={stateRest}
			title={titleRest.toUpperCase()}
			mb={mb}
		>
			{messageRest}
		</Message>
	);
};

export default Message;
export { MessageRest };
