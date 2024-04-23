const FileType = require("file-type");
const axios = require("axios");
const fs = require("node:fs");

const downloadFile = async function (uri) {
  const response = await axios({
    url: uri,
    method: "GET",
    responseType: "arraybuffer",
  });

  const fileType = await FileType.fromBuffer(response.data);
  console.log("🚀 ~ downloadFile ~ fileType:", fileType);
  const fileName = `message.${fileType?.ext}`;
  const filePath = "./src/upload/" + fileName;

  fs.writeFile(filePath, response.data, (err) => {
    if (err) throw err;
    console.log("Image downloaded successfully!");
  });

  return { filePath, mime: fileType.mime };
};

module.exports = downloadFile;
