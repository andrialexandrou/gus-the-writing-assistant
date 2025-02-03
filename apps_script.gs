// Script Properties setup - run once to initialize API key
function setupApiKey() {
  const apiKey = Utilities.getUuid();  // Generates a unique API key
  PropertiesService.getScriptProperties().setProperty('API_KEY', apiKey);
  console.log('Your API key is: ' + apiKey); // Will appear in execution log
}

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Verify API key
    const providedKey = e.parameter.apiKey;
    const storedKey = PropertiesService.getScriptProperties().getProperty('API_KEY');
    
    if (!providedKey || providedKey !== storedKey) {
      return ContentService.createTextOutput(JSON.stringify({
        error: "Invalid or missing API key",
        providedKey: providedKey
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Append data as new row
    sheet.getRange(sheet.getLastRow() + 1, 1, 1, data.length).setValues([data]);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Data logged successfully",
      rowData: data
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: error.toString(),
      stack: error.stack
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type"
    });
}

// For testing the deployment
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "Service is running",
    timestamp: new Date().toISOString()
  }))
  .setMimeType(ContentService.MimeType.JSON);
}

