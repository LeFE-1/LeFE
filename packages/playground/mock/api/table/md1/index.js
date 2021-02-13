const sw = true

module.exports.post = function () {
  return (
    sw && {
      ret: 1,
      data: [
        {
          rule: '规则一',
          status: 0,
          crtname: '蕾姆',
          crttime: '2020'
        },
        {
          rule: '规则一',
          status: 0,
          crtname: '拉姆',
          crttime: '2020'
        },
        {
          rule: '规则三',
          status: 0,
          crtname: '斯巴鲁',
          crttime: '2020'
        },
        {
          rule: '规则一',
          status: 0,
          crtname: '爱蜜莉雅',
          crttime: '2020'
        },
        {
          rule: '规则一',
          status: 0,
          crtname: '碧翠丝',
          crttime: '2020'
        }
      ],
      total: 5
    }
  )
}
