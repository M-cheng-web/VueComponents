'use strict';
module.exports = {
  // 项目中使用的 type 和默认描述
  types: [
    {      value: 'init',      name: 'init:     初始提交'    },
    {      value: 'feat',      name: 'feat:     增加新功能'    },
    {      value: 'fix',      name: 'fix:      修复bug'    },
    {      value: 'ui',      name: 'ui:       更新UI'    },
    {      value: 'refactor',      name: 'refactor: 代码重构'    },
    {      value: 'release',      name: 'release:  发布'    },
    {      value: 'deploy',      name: 'deploy:   部署'    },
    {      value: 'docs',      name: 'docs:     修改文档'    },
    {      value: 'test',      name: 'test:     增删测试'    },
    {      value: 'chore',      name: 'chore:    更改配置文件'    },
    {      value: 'style',      name: 'style:    样式修改不影响逻辑'    },
    {      value: 'revert',      name: 'revert:   版本回退'    },
    {      value: 'add',      name: 'add:      添加依赖'    },
    {      value: 'minus',      name: 'minus:    版本回退'    },
    {      value: 'del',      name: 'del:      删除代码/文件'    }
  ],
  // 预设项目中使用的可选 scope 
  scopes: [
    { name: '模块1' },
    { name: '模块2' },
    { name: '模块3' },
    { name: '模块4' }
  ],
  // 当想重写特定提交类型的作用域时，使用此方法 如：在类型为“fix”时指定范围
  // scopeOverrides: {
  //   fix: [
  //     { name: 'merge' },
  //     { name: 'style' },
  //     { name: 'e2eTest' },
  //     { name: 'unitTest' }
  //   ]
  // },
  messages: {
    type: '选择更改类型:\n',
    scope: '更改范围 (可选):\n',
    customScope: 'Denote the SCOPE of this change:',
    subject: '简短描述:\n',
    body: '详细描述,使用"|"换行(可选)：\n',
    breaking: '非兼容性说明(可选):\n',
    footer: '关联关闭的issue,例如：#31, #34(可选):\n',
    confirmCommit: '确定提交?'
  },
  allowCustomScopes: true, // 增加自定义 scope 选项
  // allowBreakingChanges: ['特性', '修复'], // 配置想要 breaking change 弹出提示的scope列表
  subjectLimit: 100 // 限制主题长度
};