#!/usr/bin/env node

const fs = require("fs"); // Node.js的文件处理模块
const path = require("path"); // Node.js的处理文件和目录路径处理模块
const { program } = require("commander");
const ejs = require("ejs");
const inquirer = require("inquirer");

/**
 * command 设置命令
 * create为自定义的命令名称
 * <> 包裹的name为必须输入的参数，不输入会报错
 * action为命令callback，参数为commond中配置的参数
 *  
 **/
program
  .command("create <name>")
  .action((name) => {
    createFileByTemplate(name);
  });

/**
 * parse 处理命令行参数
 * process.argv 返回命令行参数，process是Node.js进程控制模块
 **/
program.parse(process.argv);

function createFileByTemplate(name){
	const templatePath = path.join(__dirname, "templates");
	const currentPath = process.cwd();

	const context = { name };
	prompt(templatePath, currentPath, context);
}

function prompt(readPath, writePath, context){
	// 使用inquirer进行交互
	inquirer.prompt({
			type: "input", // 交互类型： 输入
			message: "confirm name: ", //提示信息
			name: "name", // 参数名称
			default: context.name // 默认值
	}).then(answer => {
		// answer 是用户输入的回答
		writePath = path.join(__dirname, answer);
		loadDirectory(readPath, writePath, answer);
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