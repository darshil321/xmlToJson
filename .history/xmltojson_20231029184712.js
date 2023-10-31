const fs = require("fs");
const xml2js = require("xml2js");

// Read the XML file
fs.readFile(
	"input.xml",
	"utf-8",
	(error, data) => {
		if (error) {
			console.error("Failed to read file:", error);
		} else {
			// Parse the XML data
			xml2js.parseString(data, (error, result) => {
				if (error) {
					console.error("Failed to parse XML:", error);
				} else {
					// Filter the JSON data
					let filteredData = result.rss.channel[0].item.map((item) => {
						return {
              title: item.title[0],
              encodedContent: item["content:encoded"][0],
              pubDate: item.pubDate[0],
              author: item["dc:creator"][0], // this depends on the structure of your XML
              content: item.category,
              // add other fields as necessary
            };
					});

					// Convert the result to a JSON string
					const json = JSON.stringify(filteredData, null, 2);

					// Write the JSON data to a file
					fs.writeFile("output.json", json, "utf8", (error) => {
						if (error) {
							console.error("Failed to write file:", error);
						}
					});
				}
			});
		}
	}
);
