const fs = require("fs");
const path = require("path");
const PDFParser = require("pdf2json");
const mammoth = require("mammoth");

function parsePDF(filePath) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", errData => {
      reject(errData.parserError);
    });

    pdfParser.on("pdfParser_dataReady", pdfData => {
      let text = "";

      try {
        pdfData.Pages.forEach(page => {
          page.Texts.forEach(textObj => {
            textObj.R.forEach(run => {
              text += decodeURIComponent(run.T) + " ";
            });
          });

          text += "\n";
        });

        resolve(text);
      } catch (err) {
        reject(err);
      }
    });

    pdfParser.loadPDF(filePath);
  });
}

async function extractText(file) {

  if (!file) {
    throw new Error("No file uploaded");
  }

  const extension = path.extname(file.originalname).toLowerCase();

  try {

    let text = "";

    if (extension === ".pdf") {

      text = await parsePDF(file.path);

    }

    else if (extension === ".docx") {

      const result = await mammoth.extractRawText({
        path: file.path,
      });

      text = result.value;

    }

    else {

      throw new Error("Only PDF and DOCX supported.");

    }

    console.log("====================================");
    console.log("SCRAPED RESUME");
    console.log("====================================");
    console.log(text);
    console.log("====================================");

    return text;

  }

  catch (err) {

    console.error(err);

    return "";

  }

}

module.exports = extractText;