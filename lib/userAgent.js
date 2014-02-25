exports = module.exports = {};

exports.parse = function(userAgent) {
	var result = {
		isChrome: false,
		isFirefox: false,
		isIE: false,
		isOpera: false,
		isSafari: false,
		
		isMobile: false,
		isTablet: false,
		isDesktop: false,
		
		isGecko: false,
		isPresto: false,
		isTrident: false,
		isWebKit: false,
		
		os: {
			name: "",
			version: ""
		},
		
		version: "",
	};
	
	
	
	return result;
}