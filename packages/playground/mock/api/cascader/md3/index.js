const { parse } = require('querystring'),
  sw = true

module.exports.get = function ({ url }) {
  let index = -1,
    queryString = (index = url.indexOf('?')) > -1 ? url.slice(index + 1) : ''

  const query = parse(queryString)

  if (query.name === 'shejiyuanze') {
    return [
      {
        value: 'yizhi',
        label: '一致'
      },
      {
        value: 'fankui',
        label: '反馈'
      },
      {
        value: 'xiaolv',
        label: '效率'
      },
      {
        value: 'kekong',
        label: '可控'
      }
    ]
  }

  return [
    {
      value: 'layout',
      label: 'Layout 布局'
    },
    {
      value: 'color',
      label: 'Color 色彩'
    },
    {
      value: 'typography',
      label: 'Typography 字体'
    },
    {
      value: 'icon',
      label: 'Icon 图标'
    },
    {
      value: 'button',
      label: 'Button 按钮'
    }
  ]
}
