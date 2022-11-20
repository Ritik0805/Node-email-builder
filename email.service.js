const fs = require("fs");
const path = require("path");
const pug = require("pug");
const inlineCss = require("inline-css");
const Handlebars = require("handlebars");
const fetch = require("isomorphic-fetch");
const glob = require("glob");

function loadPartials() {
  return new Promise(async (resolve, reject) => {
    glob("**/*.partial", {}, function (err, files) {
      if (err) {
        throw new Error(`Error loading partials`);
      }
      files = files.map((f) => {
        let name = f
          .slice(f.lastIndexOf("/") + 1, f.length + 1)
          .replace(".partial", "");
        let partial = fs.readFileSync(f, "utf-8");
        return {
          name,
          partial,
        };
      });
      resolve(files);
    });
  });
}

/**
 * [renderEmail description]
 * @param  {string} template [ex. forgot-pasword]
 * @param  {object} data     [ex. link = http://yo.com]
 * @return {string}          [html string]
 */
// function renderEmail(template, data) {
//   const p = new Promise(async (resolve, reject) => {
//     try {
//       let filePath = path.join(__dirname, `./templates/${template}.pug`);
//       let tmpl = fs.readFileSync(filePath, "utf-8");
//       data = Object.assign(data, {
//         filename: filePath,
//       });
//       let html = pug.render(tmpl, data);
//       html = inlineCss(html, {
//         preserveMediaQueries: true,
//         removeStyleTags: false,
//         url:
//           process.env.NODE_ENV === "production"
//             ? "https://example.com"
//             : "https://staging.example.com",
//             // WHAT THIS URL WILL DO HERE. I READ ABOUT IT, BUT ALL IT DOES IS RESOLVES HREF. WHAT DOES IT MEAN?
//             //DOES IT MEAN THAT IT GIVE ALL HREFs WITH THIS PARTICULAR URL. WHY SO? IT DOESN'T MAKE SENSE.
//       });
//       resolve(html);
//     } catch (e) {
//       console.log(e);
//       reject(e);
//     }
//   });
//   return p;
// }

function fetchSearchFeed({ searchFeedId, environment, token }) {
  return new Promise(async (resolve, reject) => {
    let response = await fetch(
      `${environment}/services/i/search-feed/fetch/${searchFeedId}?pageIndex=1&perPageDoc=50`,
      {
        headers: {
          "Content-Type": "application/json",
          ClientId: "webapp",
          Authorization: `bearer ${token}`,
        },
      }
    ).then((res) => res.json());
    if (response.savedSearchId) {
      resolve(response);
    } else {
      reject(null);
      throw new Error("Unable to fetch search feed");
    }
  });
}

function renderFullEmail({ data, html, css }) {
  return new Promise(async (resolve, reject) => {
    try {
      let renderedHtml = html;
      if (data) {
        let partials = await loadPartials();
        console.log("Bhai Mere partials successfully load ho gaye hain");
        partials.map((partial) => {
          Handlebars.registerPartial(partial.name, partial.partial);
        });
        Handlebars.registerHelper("combineTwoStrings", function (a, b) {
          return `${a}${b}`;
        });
        Handlebars.registerHelper("stringHash", function (str,first) {
          
          var hash = 0,
            i,
            chr;
          if (str.length === 0) return hash;
          for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0; // Convert to 32bit integer
          }
          let ans = hash.toString();
          if(first===null)
          {
            return ans;
          }
          else{
            return `${first}-${ans}`;
          }
          
        });

        console.log(
          " partials successfully Register ho gaye hain ho gaye hain"
        );

        const template = Handlebars.compile(html);
        console.log("Templates have been compiled");
        renderedHtml = template(data);

        console.log("Data filled in");
      }
      renderedHtml = await inlineCss(renderedHtml, {
        preserveMediaQueries: true,
        removeStyleTags: false,
        url:
          process.env.NODE_ENV === "production"
            ? "https://example.com"
            : "https://staging.example.com",
        extraCss: css,
        preserveMediaQueries: true,
        removeStyleTags: false,
      });
      return resolve(renderedHtml);
    } catch (e) {
      console.log(e);
      return reject(e);
    }
  });
}

module.exports = {
  renderFullEmail,
  fetchSearchFeed,
};

//
// 10(7(3(1(2))(6(5(4))))(9(8)))