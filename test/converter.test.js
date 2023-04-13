const {getHtmlText} = require('../src/converter');

describe("Converter Tests", () => {
 test('Empty Markdown should return Empty HTML text', () => {
   var result = getHtmlText('')
    expect(result).toBe('');
 });
 
  test('Header without link', () => {
   var result = getHtmlText('#### Header with just text')
    expect(result).toMatch('<h4>Header with just text</h4>');
 });
 
 test('Header with link', () => {
   var result = getHtmlText('#### Header with link [Search](https://www.google.com)')
    expect(result).toMatch('<h4>Header with link <a href="https://www.google.com">Search</a></h4>');
 });
 
  test('Header with multiple links', () => {
   var result = getHtmlText('#### Header with multiple links [Search](https://www.google.com) and then link2 [LinkedIn](https://www.linkedin.com) and yet another link3 [Amazon](https://www.amazon.com)')
    expect(result).toMatch('<h4>Header with multiple links <a href="https://www.google.com">Search</a> and then link2 <a href="https://www.linkedin.com">LinkedIn</a> and yet another link3 <a href="https://www.amazon.com">Amazon</a></h4>');
 });
 
  test('Header with symbols', () => {
   var result = getHtmlText("#### Header with symbols !@#$%^&*()_+{}[]:\";\'<>,.?/`~")
    expect(result).toMatch("<h4>Header with symbols !@#$%^&*()_+{}[]:\";\'<>,.?/`~</h4>");
 });
 
 test('Header point greater than 6', () => {
   var result = getHtmlText('################################### Header point greater than 6')
    expect(result).toMatch('<h6>Header point greater than 6</h6>');
 });
 
 test('Invalid Header', () => {
   var result = getHtmlText('###This is not valid header format')
    expect(result).toMatch('<p>###This is not valid header format</p>');
 }); 
 
 test('Simple paragraph', () => {
   var result = getHtmlText('This is a simple paragraph line')
    expect(result).toMatch('<p>This is a simple paragraph line</p>');
 });
 
  test('Simple paragraph with multiple links', () => {
   var result = getHtmlText('Simple paragraph with multiple links - [link1](https://www.link1.com) and here is another link - [link2](https://www.link2.com)')
    expect(result).toMatch('<p>Simple paragraph with multiple links - <a href="https://www.link1.com">link1</a> and here is another link - <a href="https://www.link2.com">link2</a></p>');
 });
 
   test('Simple paragraph with jumbled link syntax', () => {
   var result = getHtmlText('paragraph { [ (test) ### 2 ### ??? ] }')
    expect(result).toMatch('<p>paragraph { [ (test) ### 2 ### ??? ] }</p>');
 });
 
 test('Paragraph with symbols', () => {
   var result = getHtmlText("Paragraph with symbols !@#$%^&*()_+{}[]:\";\'<>,.?/`~")
    expect(result).toMatch("<p>Paragraph with symbols !@#$%^&*()_+{}[]:\";\'<>,.?/`~</p>");
 });
 
  test('Paragraph with multiple lines', () => {
   var result = getHtmlText('Hi this is a test \nMulti-line paragraphs \nline 3 \n### ends here')
    expect(result).toMatch('<p>Hi this is a test \nMulti-line paragraphs \nline 3 \n### ends here</p>');
 });
 
   test('Just a link', () => {
   var result = getHtmlText('[link1](https://www.link1.com)')
    expect(result).toMatch('<p><a href="https://www.link1.com">link1</a></p>');
 });
 
  test('Link without correct format', () => {
   var result = getHtmlText('[link1]  (https://www.link1.com)')
    expect(result).toMatch('<p>[link1]  (https://www.link1.com)</p>');
 });
 
   test('Link without correct format - symbols', () => {
   var result = getHtmlText('[link1] [](){}!@#$%^&(*) (https://www.link1.com)')
    expect(result).toMatch('<p>[link1] [](){}!@#$%^&(*) (https://www.link1.com)</p>');
 });
 
  test('Link without correct format - symbols', () => {
   var result = getHtmlText('[lin[k1](https://www.link1.com) (test)')
    expect(result).toMatch('<p><a href="https://www.link1.com">lin[k1</a> (test)</p>');
 });
 
   test('Multi-line conversion', () => {
   var result = getHtmlText('Hi this is a test \n\n### second line with a header \n\nThird line with a header and link [link1](https://www.link1.com) \n\n[link2](https://www.link2.com)')
    expect(result).toMatch('<p>Hi this is a test</p>\n<h3>second line with a header</h3>\n<p>Third line with a header and link <a href="https://www.link1.com">link1</a></p>\n<p><a href="https://www.link2.com">link2</a></p>');
 });
 
 test('Check if trailing and leading white spaces are trimmed', () => {
   var result =   getHtmlText('   ### header with leading and trailing spaces\n\n   paragraph with leading and trailing spaces')
    expect(result).toMatch('<h3>header with leading and trailing spaces</h3>\n<p>paragraph with leading and trailing spaces</p>');
 });
})