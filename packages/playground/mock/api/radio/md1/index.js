const sw = true

module.exports.get = function () {
  return (
    sw && {
      ret: 1,
      data: [
        {
          label: 'Decade',
          value: 0
        },
        {
          label: 'W',
          value: 1
        },
        {
          label: 'Faiz',
          value: 2
        }
      ]
    }
  )
}
