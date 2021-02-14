const { parse } = require('querystring'),
  sw = true

module.exports.get = function ({ url }) {
  let index = -1,
    queryString = (index = url.indexOf('?')) > -1 ? url.slice(index + 1) : ''

  const query = parse(queryString)
  console.log(query, url)
  if (query.name === 'zhinan') {
    return [
      {
        value: 'shejiyuanze',
        label: '设计原则'
      },
      {
        value: 'daohang',
        label: '导航'
      }
    ]
  } else if (query.name === 'zujian') {
    return [
      {
        value: 'basic',
        label: 'Basic'
      },
      {
        value: 'form',
        label: 'Form'
      },
      {
        value: 'data',
        label: 'Data'
      },
      {
        value: 'notice',
        label: 'Notice'
      },
      {
        value: 'navigation',
        label: 'Navigation'
      },
      {
        value: 'others',
        label: 'Others'
      }
    ]
  }

  return [
    {
      value: 'axure',
      label: 'Axure Components'
    },
    {
      value: 'sketch',
      label: 'Sketch Templates'
    },
    {
      value: 'jiaohu',
      label: '组件交互文档'
    }
  ]
}
