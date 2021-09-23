
const fs = require("fs"); // Node.js的文件处理模块
const path = require("path"); // Node.js的处理文件和目录路径处理模块
const ejs = require("ejs"); // 模板引擎

const { prompt } = require("./prompt.js");

function createFileByTemplate(name){
    const templatePath = path.join(__dirname, "../templates");
    const currentPath = process.cwd();

    let context = { name };
    prompt(context, answer => {
        context = {
            ...context,
            ...answer
        }
        loadDirectory(templatePath, path.join(currentPath, context.name), context);
    });
}

// 加载目录
function loadDirectory(readPath, writePath, context = {}){
    writePath = createDirectory(writePath);

    // readdir 读取readPath目录内容，files为目录下的文件列表
    fs.readdir(readPath, (err, files) => {
        if(err) throw err;

        //遍历列表
        files.forEach(file => {
            const _readPath = path.join(readPath, file); // 待“复制”文件的绝对路径
            const _writePath =  path.join(writePath, file); // 待写入文件的绝对路径

            // stat 获取文件对象描述
            fs.stat(_readPath, (err, stats) => {
                if(err) throw err;
                if(stats.isDirectory()){
                    // 目录
                    loadDirectory(_readPath, _writePath, context);
                } else if(stats.isFile()){
                    //文件
                    loadFile(_readPath, _writePath, context);
                }
            });
        });
    });
}

//加载文件
function loadFile(readPath, writePath, context = {}){
    ejs.renderFile(readPath, context, (err, result) => {
        if(err) throw err;
        fs.writeFileSync(writePath, result)
    });
}

// 创建文件(夹)
function createDirectory(directory){
    //如果文件(夹)不存在，则新建
    if (!fs.existsSync(directory)) {
        //创建文件(夹)
        fs.mkdir(directory, (error,result) => {
            if(error) throw error;
        });
    }
    return directory;
}

module.exports = {
    createFileByTemplate
};