// #!/usr/bin/env node
// const fs = require("fs");
// const path = require("path");
// const { renderFullEmail, fetchSearchFeed } = require("./email.service");

// const argv = require("yargs/yargs")(process.argv)
//   .usage("Usage: $0 -html [path] -css [path] -data [path]")
//   .describe("html", "Relative path to html file")
//   .describe("css", "Relative path to css file")
//   .describe("data", "Relative path to JSON file")
//   .describe("searchFeedId", "Id Of Search Feed")
//   .describe("token", "AlphaSense Access Token")
//   .default(
//     "environment",
//     "https://research.alpha-sense.com/",
//     "Host of alphasense search feed"
//   )
//   .demandOption(["html", "css"]).argv;

// const { html, css, data, searchFeedId, token, environment } = argv;

// (async () => {
//   try {
//     const htmlPath = path.resolve(process.cwd(), html);
//     let renderedHtml = fs.readFileSync(htmlPath, "utf-8");
//     const cssPath = path.resolve(process.cwd(), css);
//     const cssFile = fs.readFileSync(cssPath, "utf-8");

//     let dataFile;

//     if (data) {
//       let dataPath = path.resolve(process.cwd(), data);
//       dataFile = fs.readFileSync(dataPath, "utf-8");
//       dataFile = JSON.parse(dataFile);
//     }

//     if (searchFeedId && token) {
//       dataFile = await fetchSearchFeed({
//         searchFeedId,
//         token,
//         environment,
//       });
//     }

//     renderedHtml = await renderFullEmail({
//       data: dataFile,
//       html: renderedHtml,
//       css: cssFile,
//     });

//     console.log(renderedHtml);
//   } catch (e) {
//     console.log("> Error");
//     console.log(e);
//     process.exit(0);
//   }
// })();
