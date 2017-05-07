    var fs = require('fs');
    var path = require('path');
    var PDFParser = require('pdf2json');
    var pdfFilePath = path.basename('./Hacking.pdf');
    var pdfParser = new PDFParser(this, 1);
    
    pdfParser.on("pdfParser_dataError", function(errData) {
        console.log(errData.parserError);
    });
    pdfParser.on("pdfParser_dataReady", function(data) {
        fs.writeFile("./pdfExport/pdfexport1.txt", pdfParser.getRawTextContent(data));
        fs.writeFile("./pdfExport/Book.fields.json", JSON.stringify(pdfParser.getAllFieldsTypes(data)));
        fs.writeFile("/pdfExport/Book.fields.data.json", JSON.stringify(pdfParser.getAllFieldsTypes(data)));
    });
    
    pdfParser.loadPDF(pdfFilePath);
    