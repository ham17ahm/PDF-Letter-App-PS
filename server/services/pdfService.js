const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");
const config = require("../config/pdf");

function buildFileName(type) {
  const now = new Date();
  const yyyy = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const HH = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const prefix = config.prefixes[type] || type.toUpperCase();
  return `${prefix}_${yyyy}${MM}${dd}_${HH}${mm}.pdf`;
}

async function generateAndSavePdf(type, printData) {
  const fileName = buildFileName(type);
  const filePath = path.join(config.savePath, fileName);

  if (!fs.existsSync(config.savePath)) {
    fs.mkdirSync(config.savePath, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: config.chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    // Inject print data into localStorage before the page loads
    await page.evaluateOnNewDocument((data) => {
      localStorage.setItem("printData", JSON.stringify(data));
    }, printData);

    await page.goto(`${config.frontendUrl}/print/${type}`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    await page.emulateMediaType("print");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    fs.writeFileSync(filePath, pdfBuffer);
    return fileName;
  } finally {
    await browser.close();
  }
}

module.exports = { generateAndSavePdf };
