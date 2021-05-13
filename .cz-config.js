'use strict';
module.exports = {
  // 项目中使用的 type 和默认描述
  types: [
    { value: '✨特性', name: '特性:    一个新的特性' },
    { value: '🐛修复', name: '修复:    修复一个Bug' },
    { value: '📝文档', name: '文档:    变更的只有文档' },
    { value: '💄格式', name: '格式:    空格, 分号等格式修复' },
    { value: '♻️重构', name: '重构:    代码重构，注意和特性、修复区分开' },
    { value: '⚡️性能', name: '性能:    提升性能' },
    { value: '✅测试', name: '测试:    添加一个测试' },
    { value: '🔧工具', name: '工具:    开发工具变动(构建、脚手架工具等)' },
    { value: '⏪回滚', name: '回滚:    代码回退' }
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