/**
 * Haneri Product Enquiry — Google Apps Script
 *
 * SETUP
 * -----
 * 1. Create a Google Sheet with this header row (row 1):
 *    Timestamp | Name | Mobile | Email | Enquiry | Product Name | Product ID | Variant ID | Variant | Page URL
 *
 * 2. Open Extensions → Apps Script, paste this file, save.
 *
 * 3. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *
 * 4. Copy the Web app URL and set it in Laravel .env:
 *    GOOGLE_SHEETS_ENQUIRY_URL=https://script.google.com/macros/s/XXXX/exec
 *    SITE_MODE=enquiry
 *
 * 5. Run on Laravel server: php artisan config:clear
 *
 * TEST (curl)
 * -----------
 * curl -X POST "YOUR_WEB_APP_URL" \
 *   -H "Content-Type: text/plain;charset=utf-8" \
 *   -d '{"name":"Test User","mobile":"9876543210","email":"test@example.com","enquiry":"Need pricing for 10 units","product_name":"TurboSilent Fan","product_id":"42","variant_id":"101","variant":"Matte Black","page_url":"https://www.haneri.com/product_detail?id=42"}'
 */

var SHEET_NAME = 'Enquiries';

function doPost(e) {
  try {
    var sheet = getOrCreateSheet_();
    var data = parsePayload_(e);

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.mobile || '',
      data.email || '',
      data.enquiry || '',
      data.product_name || '',
      data.product_id || '',
      data.variant_id || '',
      data.variant || '',
      data.page_url || '',
    ]);

    return jsonResponse_({ success: true, message: 'Enquiry recorded.' });
  } catch (err) {
    return jsonResponse_({ success: false, message: String(err) });
  }
}

function doGet(e) {
  return jsonResponse_({ success: true, message: 'Haneri enquiry endpoint is active.' });
}

function getOrCreateSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Timestamp',
      'Name',
      'Mobile',
      'Email',
      'Enquiry',
      'Product Name',
      'Product ID',
      'Variant ID',
      'Variant',
      'Page URL',
    ]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 10).setFontWeight('bold');
  }

  return sheet;
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Missing request body.');
  }

  var raw = e.postData.contents;
  var parsed = JSON.parse(raw);

  if (!parsed.name || !parsed.mobile || !parsed.email || !parsed.enquiry) {
    throw new Error('Missing required fields: name, mobile, email, enquiry.');
  }

  return parsed;
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
