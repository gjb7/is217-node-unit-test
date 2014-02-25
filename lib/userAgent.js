exports = module.exports = {};

var parenRegEx = /\(([^\)]+)\)/g;
var versionRegEx = /\s([^\/]+)\/([^\s]+)/g;
var macVersionRegEx = /Mac OS X [\d]+(_|\.)[\d]+((_|\.)[\d]+)?/;
var iOSVersionRegEx = /CPU (iPhone )?(OS [\d]+(_|\.)[\d]+((_|\.)[\d]+)?)/;

function _matchVersionString(versionString) {
	var result = {};
	
	var match;
	while (match = versionRegEx.exec(versionString)) {
		if (match[1] == 'Version') {
			result.version = match[2];
		} else if (match[1] == 'AppleWebKit') {
			result.isWebKit = true;
		} else if (match[1] == 'Gecko') {
			result.isGecko = true;
		} else if (match[1] == 'Trident') {
			result.isTrident = true;
		} else if (match[1] == 'Presto') {
			result.isPresto = true;
		} else if (match[1] == 'Safari') {
			if (result.isChrome) {
				continue;
			}
			
			result.isSafari = true;
		} else if (match[1] == 'Chrome') {
			if (result.isSafari) {
				result.isSafari = false;
			}
			
			result.isChrome = true;
			result.version = match[2];
		}
	}
	
	return result;
}

function _countKeys(object) {
	var count = 0;
	for (var i in object) {
		count++;
	}
	return count;
}

function _merge(destination, source) {
	for (var i in source) {
		destination[i] = source[i];
	}
	
	return destination;
}

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
	
	userAgent = " " + userAgent + " ";
	
	var replacements = [];
	
	var match;
	while (match = parenRegEx.exec(userAgent)) {
		var parts = match[1].split('; ');
		parts.forEach(function(part) {
			// Check for OS Name
			if (part == 'Macintosh') {
				// For Macintosh, OS Version is not in `part`.
				result.os.name = 'Macintosh';
			}
			else if (part.indexOf('Windows') !== -1) {
				// For Windows, OS Version is in `part`.
				result.os.name = 'Windows';
				result.os.version = part;
			}
			else if (part.indexOf('Linux') !== -1) {
				// For Linux, there's no reliable way to get the OS version.
				result.os.name = 'Linux';
			}
			else if (part == 'iPhone') {
				result.isMobile = true;
				result.os.name = 'iOS';
			}
			else if (part == 'iPad') {
				result.isTablet = true;
				result.os.name = 'iOS';
			}
			
			var macVersionMatch = macVersionRegEx.exec(part);
			if (macVersionMatch && result.os.name == 'Macintosh') {
				result.os.version = macVersionMatch[0];
			}
			
			var iOSVersionMatch = iOSVersionRegEx.exec(part);
			if (iOSVersionMatch && result.os.name == 'iOS') {
				result.os.version = iOSVersionMatch[2];
			}
			
			var versionStringResult = _matchVersionString(part);
			if (_countKeys(versionStringResult) > 0) {
				result = _merge(result, versionStringResult);
			}
		});
		
		replacements.push(match[0]);
	}
	
	replacements.forEach(function(replacement) {
		userAgent = userAgent.replace(replacement + " ", "");
	});
	
	replacements = [];
	
	var versionStringResult = _matchVersionString(userAgent);
	if (_countKeys(versionStringResult) > 0) {
		result = _merge(result, versionStringResult);
	}
	
	if (!result.isMobile && !result.isTablet) {
		result.isDesktop = true;
	}
	
	return result;
}