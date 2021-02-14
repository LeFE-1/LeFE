const sw = true

module.exports.post = function () {
  return (
    sw && {
      ret: 1,
      data: [
        {
          id: '人员1',
          status: 1,
          name: 'human'
        },
        {
          id: '人员2亚运',
          status: 0,
          name: '吃没吃毛毛虫'
        },
        {
          id: '无关人员',
          status: 0,
          name: '超能战士'
        }
      ],
      total: 3
    }
  )
}
