const fs = require("fs");
const path = require("path");
const { cwd } = require("process");
class fileStat {
  constructor(fileName, name, ext, isFile, size, createTime, updateTime) {
    this.fileName = fileName;
    this.name = name;
    this.ext = ext;
    this.isFile = isFile;
    this.size = size;
    this.createTime = createTime;
    this.updateTime = updateTime;
  }
  static async getFileStat(fileName) {
    const stat = await fs.promises.stat(fileName);
    const name = path.basename(fileName);
    const ext = path.extname(fileName);
    const isFile = stat.isFile();
    const size = stat.size;
    const createTime = new Date(stat.birthtime).toLocaleString();
    const updateTime = new Date(stat.mtime).toLocaleString();
    return new fileStat(
      fileName,
      name,
      ext,
      isFile,
      size,
      createTime,
      updateTime
    );
  }
  async getChildren() {
    if (this.isFile) return null;
    else {
      return Promise.all(
        (await fs.promises.readdir(this.fileName)).map((file) =>
          fileStat.getFileStat(path.join(this.fileName, file))
        )
      );
    }
  }
}
const fileName = path.join(cwd(), "vue3");
(async () => {
  const res = await fileStat.getFileStat(fileName);
  console.log(await res.getChildren());
})();
