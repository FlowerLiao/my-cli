#!/usr/bin/env node

const path = require("path"); // Node.js的处理文件和目录路径处理模块
const { program } = require("commander"); // 命令行工具

const { createFileByTemplate } = require("./lib/loadFile.js");

/**
 * command 设置命令
 * create为自定义的命令名称
 * <> 包裹的name为必须输入的参数，不输入会报错
 * action为命令callback，参数为commond中配置的参数
 *  
 **/
program
    .command("create <name>")
    .action(name => {
        createFileByTemplate(name);
    });

/**
 * parse 处理命令行参数
 * process.argv 返回命令行参数，process是Node.js进程控制模块
 **/
program.parse(process.argv);