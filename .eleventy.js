module.exports = function (eleventyConfig) {
	eleventyConfig.addWatchTarget('./src/assets/sass/')
	eleventyConfig.addPassthroughCopy('src/assets/imgs/')
	eleventyConfig.addPassthroughCopy('src/assets/js/')
	eleventyConfig.addPassthroughCopy('src/robots.txt')
	eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`)

	return {
		dir: {
			input: 'src',
			includes: '_includes',
			data: '_data',
			output: 'public',
		},
	}
}
