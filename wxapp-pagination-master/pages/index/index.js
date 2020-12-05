import userModel from '../../model/user'


Page({
  data: {
    userList: [],
    userTotal: 0
  },

  getUserList(e) {
    const {
      callback,
      ...rest
    } = e.detail
    console.log('回调参数', rest)
    userModel.getUserList(rest)
      .then(result => {
        this.setData({
          userList: result.list,
          userTotal: result.total
        })
        if (callback) callback()
      })
  },

  onItemClick(e) {
    console.log('click item', e.detail)
  },

  onReachBottom() {
    const pagination = this.selectComponent('#pagination')
    if (pagination) pagination._loadMore()
  },

  onPullDownRefresh() {
    const pagination = this.selectComponent('#pagination')
    if (pagination) pagination._refresh()
  }
})