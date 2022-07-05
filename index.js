const fs = require("fs");
const path = require("path");

const getFilesRecursively = (directory) => {
  const filesInDirectory = fs.readdirSync(directory, { withFileTypes: true });
  const directoriesNumber = getDirectoriesNumber(filesInDirectory);
  const filesNumber = getFilesNumber(filesInDirectory);

  fs.writeFile(
    `${directory}/info.json`,
    getJsonFileContent(directoriesNumber, filesNumber, directory),
    function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    }
  );

  for (const file of filesInDirectory) {
    if (file.isDirectory()) {
        const absolute = path.join(directory, file.name);
        getFilesRecursively(absolute);
    }
  }
};

const getJsonFileContent = (dNum, fNum, path) => {
    const data = {
        path: path,
        directories: dNum,
        files: fNum
    }
    return JSON.stringify(data)
};

const getDirectoriesNumber = (files) => {
  return files.filter((file) => file.isDirectory()).length;
};

const getFilesNumber = (files) => {
  return files.filter((file) => file.isFile()).length;
};

//console.log(__dirname);

getFilesRecursively(__dirname);