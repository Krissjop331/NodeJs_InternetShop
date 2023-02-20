const fs = require("fs");

const db = require("../models");
const Image = db.images;

const uploadFiles = async (req, res, file) => {
  try {
    // console.log(file);

    if (file == undefined) {
      return res.send(`You must select a file.`);
    }

    const images = Image.create({
      type: file.mimetype,
      // name: "/resources/static/assets/uploads/" + file.originalname,
      name: file.originalname,
      data: fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + file.filename
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/resources/static/assets/tmp/" + image.name,
        image.data
      );

      return image

    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};