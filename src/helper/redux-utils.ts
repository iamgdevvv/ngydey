/* eslint-disable  @typescript-eslint/no-explicit-any */
const rtkQueryLoading = (result: any) => {
	return result?.isLoading || result?.isFetching;
};

export { rtkQueryLoading };
