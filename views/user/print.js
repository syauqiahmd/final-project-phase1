const InvoiceBill = require('invoice-bill');
const sample = new InvoiceBill({
  billIDGenerator: {preFlightValue: 1, mode: 'padding'},
  currency: 'IDR',
  from: {issuer: 'RuangTuru'},
  to: 'Some body',
  // logo: logo, // Any base64 encoded image.
});
sample.newRecords({itemName: 'test1', itemBasePrice: 10});
sample.newRecords({itemName: 'test2', itemBasePrice: 5, itemCount: 2, discount: 5});
const test = sample.renderToHTML();
require('fs').writeFileSync('test.html', test);
sample.renderPDF(__dirname, {format: 'Letter', orientation: 'landscape'})
  .then((filePath) => {
    console.log(`PDF file generated @ ${filePath}`);// eslint-disable-line no-console
  })
  .catch((err) => {
    console.log(err);
  });