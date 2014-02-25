var expect = require('chai').expect,
	userAgent = require('../lib/userAgent');

describe('UserAgent', function() {
	describe('#parse', function() {
		it("should parse a user agent string", function() {
			var userAgentString = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9) AppleWebKit/537.71 (KHTML, like Gecko) Version/7.0 Safari/537.71";
			var result = userAgent.parse(userAgentString);
			
			var expected = {
				isChrome: false,
				isFirefox: false,
				isIE: false,
				isOpera: false,
				isSafari: true,
				
				isMobile: false,
				isTablet: false,
				isDesktop: true,
				
				isGecko: false,
				isPresto: false,
				isTrident: false,
				isWebKit: true,
				
				os: {
					name: "Macintosh",
					version: "Mac OS X 10_9"
				},
				
				version: "7.0",
			};
			
			expect(result).to.deep.equal(expected);
		});
	});
});