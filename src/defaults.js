'use strict';

var $ = require('jquery');
module.exports = {
	persistencyPrefix: function(yasgui) {
		return "yasgui_" + $(yasgui.wrapperElement).closest('[id]').attr('id') + "_";
	},
	allowYasqeResize: true,
	api: {
		corsProxy: null,
		collections: null,
	},
	tracker: {
		googleAnalyticsId: null,
		askConsent: true,
	},

	 /**
	 * Yes, UGLY as well... Problem is: there is NO public catalogue API or SPARQL endpoint (which is cors enabled and works without api key)
	 * I'm waiting for SPARQLES to make a public SPARQL endpoint of TPF API....
	 * For now, just store this list (scraped from the SPARQLES website) statically..
	 */
	catalogueEndpoints: [
        {"endpoint":"http://docker.local/sparql","title":"local adhs SPARQL endpoint"},
        {"endpoint":"http://docker.local/proxy/default/sparql","title":"local eccenca DataPlatform default endpoint"}
    ]
};
