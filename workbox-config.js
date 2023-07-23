module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.{ts,tsx,json,css,scss}'
	],
	swDest: './public',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};