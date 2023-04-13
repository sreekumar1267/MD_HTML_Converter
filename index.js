const express = require('express');

const converter = require('./src/converter.js');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Markdown to HTML Converter</h1>
        <form method="post">
		  <h3>Enter Markdown text</h3>
          <textarea name="markdown" rows="20" cols="100"></textarea><br><br>
          <button type="submit">Convert</button>
        </form>
      </body>
    </html>
  `);
});

app.post('/', (req, res) => {
  const html = converter.getHtmlText(req.body.markdown);
  res.send(`
    <html>
      <body>
        <h1>Markdown to HTML Converter</h1>
        <form method="post">
		  <h3>Enter Markdown text</h3>
          <textarea name="markdown" rows="20" cols="100">${req.body.markdown}</textarea><br><br>
          <button type="submit">Convert</button>
        </form>
        <hr>
		<h3>Here is the HTML text</h3>
		<textarea name="markdown" rows="20" cols="100">${html}</textarea><br><br>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
