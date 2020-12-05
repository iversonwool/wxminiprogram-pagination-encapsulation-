# 微信小程序-下拉刷新&下拉加载更多封装
出发点：小程序开发的列表页面一般都会有下拉刷新和上拉加载更多两个需求，当列表页面多了以后`胶水代码`很多，是否可以封装一下，精简代码？



基于 [phoebeCodeSpace作者的工程wxapp-pagination](https://github.com/phoebeCodeSpace/wxapp-pagination.git) 做了一些修改

1. 原工程的上拉加载更多基于传入pagination组件的key的变化，然后在属性监听器内做操作，个人感觉这不是一个很合理的操作。
2. 缺少下拉刷新。
3. 作者这一手抽象节点用的很妙。

我的修改方式：

* 添加了下拉刷新方法。

* 在`onPullDownRefresh`方法和`onReachBottom`方法里面调用pagination组件的下拉刷新与上拉加载更多方法。
* 给页面添加没有数据的`no-data` 页面，以及页面底部的`load-more`组件。
* 给列表组件的`item`添加点击事件。

总结：

数据操作在页面层（个人感觉这里是Controller层），页面引入pagination组件（pagination处理了刷新，分页，没有数据，加载中loading，没有更多数据等多种状态），pagination组件使用抽象节点，用户可以自定义传入的`item`组件。







一些想法：

1. `onPullDownRefresh`方法和`onReachBottom`方法触发的源头在页面组件（或者作为页面的Component组件），然后调用封装组件的方法，封装组件处理了分页业务等相关操作。





不足之处：

	1. 事件传递比较繁琐。
 	2. 如果`item`里面还有其他的点击事件，那么pagination又要修改代码。

TODO:

 	1. 首次加载会有`no-data`闪过。
 	2. 是否可以采用Behaviors封装的方式。



写在最后：

最近在做小程序的项目，对小程序的理解还不是那么深刻，如果有更好的封装想法，欢迎分享交流。

