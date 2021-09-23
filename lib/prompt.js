
const inquirer = require("inquirer"); // 命令行交互工具

function prompt(context = {}, cb){
  	// 使用inquirer进行交互
  	inquirer.prompt({
      	type: "input", // 交互类型： 输入
      	message: "confirm name: ", //提示信息
      	name: "name", // 参数名称
      	default: context.name // 默认值
  	}).then(answer => {
	    cb && typeof cb === "function" && cb(answer);
  	});
}

module.exports = {
	prompt
};