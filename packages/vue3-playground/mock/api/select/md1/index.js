const sw = true

module.exports.get = function () {
  return (
    sw && {
      ret: 1,
      data: [
        {
          name: 'Kugga',
          val: 0
        },
        {
          name: 'AgitΩ',
          val: 1
        },
        {
          name: '响鬼',
          val: 2
        }
      ]
    }
  )
}
