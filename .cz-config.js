'use strict';
module.exports = {
  types: [
    {value: '✨特性',     name: '特性:    一个新的特性'},
    {value: '🐛修复',     name: '修复:    修复一个Bug'},
    {value: '📝文档',     name: '文档:    变更的只有文档'},
    {value: '💄格式',     name: '格式:    空格, 分号等格式修复'},
    {value: '♻️重构',     name: '重构:    代码重构，注意和特性、修复区分开'},
    {value: '⚡️性能',     name: '性能:    提升性能'},
    {value: '✅测试',     name: '测试:    添加一个测试'},
    {value: '🔧工具',     name: '工具:    开发工具变动(构建、脚手架工具等)'},
    {value: '⏪回滚',     name: '回滚:    代码回退'}
  ],
  scopes: [],
  messages: {
    type: '选择更改类型:\n',
    scope: '更改的范围:\n',
    // 如果allowcustomscopes为true，则使用
    // customScope: 'Denote the SCOPE of this change:',
    subject: '简短描述:\n',
    body: '详细描述. 使用"|"换行:\n',
    breaking: 'Breaking Changes列表:\n',
    footer: '关闭的issues列表. E.g.: #31, #34:\n',
    confirmCommit: '确认提交?'
  },
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"]
};