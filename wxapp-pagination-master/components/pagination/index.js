Component({

  properties: {
    name: String,
    initImmediately: {
      type: Boolean,
      value: true,
      observer: function (val) {
        if (val && !this.data.initState) {
          this.initData()
        }
      }
    },
    size: {
      type: Number,
      value: 10
    },
    total: Number,
    list: {
      type: Array,
      observer: '_endState'
    }
  },

  data: {
    initState: false, // 是否已经加载过
    page: 1,
    loading: false,
    ended: false,
  },

  lifetimes: {
    attached: function () {
      if (this.data.initImmediately) {
        this.initData()
      }
    }
  },

  methods: {
    initData() {
      // console.info(`%c [${this.data.name}]`, "color:red", `start init data `)
      this._refresh()
      this.data.initState = true
      // 为了防止第一次请求数据 页面就显示no data
      // this.setData({ initState: true })
    },
    _loadMore() {
      let {
        loading,
        ended,
        size,
        page
      } = this.data
      if (loading) return
      if (ended) return

      // const page = this.data.page + 1
      console.info(`%c [${this.data.name}]`, "color:red", `load page${page} data `)
      this.setData({
        loading: true,
      })
      this.triggerEvent('getList', {
        page: page + 1,
        size,
        callback() {
          page += 1
        }
      })
    },
    _endState(val, oldVal) {
      if (!this.data.initState) return
      // if (val.length === oldVal.length) return
      const {
        total,
        list
      } = this.properties
      console.log(`%c [${this.data.name}]`, "color:red;", `total: ${total}`)
      console.log(`%c [${this.data.name}]`, "color:red;", `list: `, list)
      let ended = false
      if (list.length >= total) {
        ended = true
      }
      this.setData({
        loading: false,
        ended
      })
    },

    // 下拉刷新
    _refresh() {
      let {
        loading,
        size,
        initState
      } = this.data
      if (loading) return
      this.setData({
        loading: true,
      })
      this.triggerEvent('getList', {
        page: 1,
        size,
        callback() {
          wx.stopPullDownRefresh()
        }
      })
    },

    onItemClick(e) {
      this.triggerEvent('onItemClick', e.detail)
    }
  }
})