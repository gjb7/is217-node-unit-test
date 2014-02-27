var expect = require('chai').expect,
	userAgent = require('../lib/userAgent');

describe('UserAgent', function() {
	describe('#parse', function() {
		it("should parse a Chrome user agent string", function() {
			var userAgentString = "Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36";
			var result = userAgent.parse(userAgentString);
			
			var expected = {
				isChrome: true,
				isFirefox: false,
				isIE: false,
				isOpera: false,
				isSafari: false,
				
				isMobile: false,
				isTablet: false,
				isDesktop: true,
				
				isGecko: false,
				isPresto: false,
				isTrident: false,
				isWebKit: true,
				
				os: {
					name: "Windows",
					version: "Windows NT 6.2"
				},
				
				version: "32.0.1667.0",
			};
			
			expect(result).to.deep.equal(expected);
		});
		
		it("should parse a Firefox user agent string", function() {
			var userAgentString = "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0";
			var result = userAgent.parse(userAgentString);
			
			var expected = {
				isChrome: false,
				isFirefox: true,
				isIE: false,
				isOpera: false,
				isSafari: false,
				
				isMobile: false,
				isTablet: false,
				isDesktop: true,
				
				isGecko: true,
				isPresto: false,
				isTrident: false,
				isWebKit: false,
				
				os: {
					name: "Windows",
					version: "Windows NT 6.1"
				},
				
				version: "25.0",
			};
			
			expect(result).to.deep.equal(expected);
		});
		
		it("should parse an IE user agent string", function() {
			var userAgentString = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)";
			var result = userAgent.parse(userAgentString);
			
			var expected = {
				isChrome: false,
				isFirefox: false,
				isIE: true,
				isOpera: false,
				isSafari: false,
				
				isMobile: false,
				isTablet: false,
				isDesktop: true,
				
				isGecko: false,
				isPresto: false,
				isTrident: true,
				isWebKit: false,
				
				os: {
					name: "Windows",
					version: "Windows NT 6.1"
				},
				
				version: "10.0",
			};
			
			expect(result).to.deep.equal(expected);
		});
		
		it("should parse an Opera user agent string", function() {
			var userAgentString = "Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14";
			var result = userAgent.parse(userAgentString);
			
			var expected = {
				isChrome: false,
				isFirefox: false,
				isIE: false,
				isOpera: true,
				isSafari: false,
				
				isMobile: false,
				isTablet: false,
				isDesktop: true,
				
				isGecko: false,
				isPresto: true,
				isTrident: false,
				isWebKit: false,
				
				os: {
					name: "Windows",
					version: "Windows NT 6.0"
				},
				
				version: "12.14",
			};
			
			expect(result).to.deep.equal(expected);
		});
		
		it("should parse a Safari user agent string", function() {
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
	
	describe("#isMobile", function() {
		it("should detect an iPhone user agent string", function() {
			var userAgentString = "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53";
			
			var result = userAgent.isMobile(userAgentString);

			expect(result).to.be.true;
		});
		
		it("should detect an Android user agent string", function() {
			var userAgentString = "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19";
			
			var result = userAgent.isMobile(userAgentString);

			expect(result).to.be.true;
		});
		
		it("should detect a Windows Phone user agent string", function() {
			var userAgentString = "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)";
			
			var result = userAgent.isMobile(userAgentString);

			expect(result).to.equal(true);
		});
	})
	
	describe("#isTablet", function() {
		it("should detect an iPad user agent string", function() {
			var userAgentString = "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)";
			
			var result = userAgent.isTablet(userAgentString);
			
			expect(result).to.be.true;
		});
	});
	
	describe("#isDesktop", function() {
		it("should detect a desktop user agent string", function() {
			var userAgentString = "Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.0.7) Gecko Kazehakase/0.5.6";
			
			var result = userAgent.isDesktop(userAgentString);
			
			expect(result).to.be.false;
		});
		
		it("should not detect a mobile user agent string", function() {
			var userAgentString = "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)";
			
			var result = userAgent.isMobile(userAgentString);

			expect(result).to.not.be.true;
		});
	})
});