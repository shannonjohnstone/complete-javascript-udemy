const fs = require('fs');
const http = require('http');
const url = require('url');

/**
 * __dirname is the current directory path location name
 */
const laptopDataSchema = JSON.parse(
  fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8'),
);

const replaceTemplate = (originalHTML, laptop) => {
  let output = originalHTML.replace(/{%PRICE%}/g, laptop.price);
  output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
  output = output.replace(/{%PRODUCTNAME%}/g, laptop.productName);
  output = output.replace(/{%IMAGE%}/g, laptop.image);
  output = output.replace(/{%SCREEN%}/g, laptop.screen);
  output = output.replace(/{%CPU%}/g, laptop.cpu);
  output = output.replace(/{%STORAGE%}/g, laptop.storage);
  output = output.replace(/{%RAM%}/g, laptop.ram);
  output = output.replace(/{%IMAGE%}/g, laptop.image);
  return output;
};

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  const id = query.id;

  if (pathname === '/products' || pathname === '/') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    fs.readFile(
      `${__dirname}/templates/template.overview.html`,
      'utf-8',
      (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-type': 'text/html' });
          return res.end();
        }

        // get cards template
        fs.readFile(
          `${__dirname}/templates/template.cards.html`,
          'utf-8',
          (err, cardData) => {
            if (err) {
              res.writeHead(500, { 'Content-type': 'text/html' });
              return res.end();
            }

            // create array of card snippets
            const cardOutput = laptopDataSchema
              .map(laptop => {
                return replaceTemplate(cardData, laptop);
              })
              .join(' ');

            // replace cards into overview template
            const overview = data.replace(/{%CARDS%}/g, cardOutput);
            res.end(overview);
          },
        );
      },
    );
  } else if (pathname === '/laptop' && id < laptopDataSchema.length) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    fs.readFile(
      `${__dirname}/templates/template.laptop.html`,
      'utf-8',
      (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-type': 'text/html' });
          return res.end();
        }

        const laptop = laptopDataSchema[id];

        res.end(replaceTemplate(data, laptop));
      },
    );
    // return res.end(`<h1>This is the Laptop page with a query of ${id}</h1>`);
  } else if (/\.(jpg|jpeg|peg|png|gif)$/i.test(pathname)) {
    fs.readFile(`${__dirname}/data/img${pathname}`, (err, data) => {
      res.writeHead(200, { 'Content-Type': 'image/jpg' });
      res.end(data);
    });
  } else {
    res.writeHead(404, { 'Content-type': 'text/html' });
    return res.end('<h1>Page not found</h1>');
  }
});

server.listen(1337, () => {
  console.log('Server Started');
});
