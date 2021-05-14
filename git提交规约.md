# 需求
历史提交场景:
+ git add .
+ git commit -m 'ababab'
+ git push
+ 这样当我们想查找某次修改的时候会很困难

---

使用`commitizen`,在`git commit`时规范提交信息
+ git add .
+ git cz
+ git push

# 安装
```
npm i -D commitizen cz-conventional-changelog
npm i -g commitizen cz-conventional-changelog
```
```
### package.json

"config":{
    "commitizen":{
        "path":"node_modules/cz-conventional-changelog"
    }
}
```
## 全局安装
在全局根目录下建立.czrc文件
```
### .czrc

{"path":"cz-conventional-changelog"}
```
## 项目安装
只需要在项目package.json 中
```
### package.json

"scripts":{
    "commit":"git-cz"
}
```
## 使用
执行git add后执行git cz进入interactive模式<br>
会依次出现下面几种选项:
1. Select the type of change that you're committing 选择改动类型(<font color=red>必填</font>)
2. What is the scope of this change (e.g. component or file name)? 填写改动范围
3. Write a short, imperative tense description of the change: 写一个精简的描述(<font color=red>必填</font>)
4. Provide a longer description of the change: (press enter to skip) 对于改动写一段长描述
5. Are there any breaking changes? (y/n) 是破坏性修改吗？默认n
6. Does this change affect any openreve issues? (y/n) 改动修复了哪个问题？默认n

tips: ctrl + c 中途取消提交

### 详细规则
**1. type**
```
# 主要type
feat:     增加新功能
fix:      修复bug

# 特殊type
docs:     只改动了文档相关的内容
style:    不影响代码含义的改动,例如去掉空格、改变缩进、增删分号
build:    构造工具的或者外部依赖的改动,例如webpack，npm
refactor: 代码重构时使用
revert:   执行git revert打印的message

# 暂不使用type
test:     添加测试或者修改现有测试
perf:     提高性能的改动
ci:       与CI（持续集成服务）有关的改动
chore:    不修改src或者test的其余修改,例如构建过程或辅助工具的变动
```
**2. scope**<br>
用于描述改动的范围，格式为项目名/模块名，例如：node-pc/common rrd-h5/activity，而we-sdk不需指定模块名。如果一次commit修改多个模块，建议拆分成多次commit，以便更好追踪和维护

**3. short change**<br>
精简描述

**4. long change**<br>
填写详细描述，主要描述改动之前的情况及修改动机，对于小的修改不作要求，但是重大需求、更新等必须添加body来作说明

**5. break changes**<br>
指明是否产生了破坏性修改，涉及break changes的改动必须指明该项，类似版本升级、接口参数减少、接口删除、迁移等

**6. affect issues**<br>
指明是否影响了某个问题。例如我们使用jira时，我们在commit message中可以填写其影响的JIRA_ID




