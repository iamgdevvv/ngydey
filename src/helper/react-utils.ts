/* eslint-disable no-useless-escape */

const inlineStyle = (style: object): React.CSSProperties => {
	return style;
};

const slugify = (text: string) => {
	return text
		.toString() // Cast to string (optional)
		.normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
		.toLowerCase() // Convert the string to lowercase letters
		.trim() // Remove whitespace from both sides of a string (optional)
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w\-]+/g, '') // Remove all non-word chars
		.replace(/\_/g, '-') // Replace _ with -
		.replace(/\-\-+/g, '-') // Replace multiple - with single -
		.replace(/\-$/g, ''); // Remove trailing -
};

const removeEmtpyElements = (str: string) => {
	const re = /<([A-z]+)([^>^/]*)>\s*<\/\1>/gim;

	return str.replace(re, '');
}

export { inlineStyle, slugify, removeEmtpyElements };
