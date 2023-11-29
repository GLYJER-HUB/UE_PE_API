const fs = require('fs');

// get the extension and rename the files
const renameFile = (fileObject) => {
    const { originalname, path } = fileObject;
    const parts = originalname.split('.');
    const etx = parts[parts.length - 1];

    // rename the file
    const newPath = path + '.' + etx;
    fs.renameSync(path, newPath);

    return newPath;
}


module.exports = renameFile