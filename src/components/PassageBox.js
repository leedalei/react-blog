import React, { Component } from "react";
import "../styles/PassageBox.scss";
import QueueAnim from 'rc-queue-anim';
import { NavLink } from "react-router-dom";

export default class CommonHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //因为mock不太懂怎么从一个列表里返回随机的几个字符串，所以这里做了一层前端的映射
      reflection:['vue','react','node','浏览器','算法与数据结构','webpack','seo','性能优化','css','javascript']
    };
    let cb;
  }

  componentDidMount() {
    var timeCount;
      this.cb =  () => {
        if (this.props.finished || this.props.loading) {
          return;
        }
        if (timeCount) {
          clearTimeout(timeCount);
        }
        timeCount = setTimeout(this.scrollCallback.bind(this), 50);
      }
    //手机端由于使用了QueueAnim会有一小段动画，如果立刻绑定滚动事件，会无限触发cb回调
      setTimeout(()=>{
        window.addEventListener(
          "scroll",
          this.cb,
          false
        );
      },800)
  }
  componentWillUnmount(){
    if(this.cb){
      window.removeEventListener('scroll',this.cb);
    }
  }
  //滚动回调
  async scrollCallback() {
    if(!this.refs.wrapper){return};
    const top = this.refs.wrapper.getBoundingClientRect().top;
    const windowHeight = window.screen.height;
    //自动加载到屏幕看不到的地方
    if (top && top < windowHeight) {
      // 当wrapper已经被滚动到页面可视范围之内触发
      if (this.hasScrollbar()) {
        await this.fetchData();
      } else {
        await this.fetchData();
        this.scrollCallback();
      }
    }
  }
  //判断是否显示了滚动条
  hasScrollbar() {
    return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
  }

  //获取新数据
  async fetchData() {
    if (typeof this.props.pullUpLoad === "function" && !this.props.finished) {
      return await this.props.pullUpLoad();
    }
  }

  //加载按钮不同提示
  renderButton() {
    //父级组件传入finished来判断是否已经全部数据加载完
    if (!this.props.finished) {
      return (
        <div
        className="loadMore"
        ref="wrapper"
        onClick={this.fetchData.bind(this)}
      >
        {this.state.loading ? 
      <p><span className="icon-loading"><i className="iconfont">&#xe65d;</i></span>加载中</p> : 
      <p>加载更多</p>}
      </div>
      );
    } 
      return (
        <div
        className="finished"
        ref="wrapper"
      >
        <i className="iconfont">&#xe702;</i>没有更多数据啦~
      </div>
      );
  }

  render() {
    return (
      <QueueAnim 
        className="psgbox" 
        component="ul" 
        type={['right', 'left']}
        ease={['easeOutQuart', 'easeInOutQuart']}>
          {
            this.props.articleList.map((value, idx) => {
              return (
              
                  <li
                    className="psgbox-item"
                    key={idx}
                  >
                    <NavLink
                      to={{pathname: '/article/'+value.id}}
                    >
                    <p className="psgbox-item--meta">
                      {
                        Array.from(new Set(value.tagNames)).map((v,i) => {
                          return <span key={i}>{this.state.reflection[v]}</span>
                        })
                      }
                    </p>
                    <p className="psgbox-item--title ellipsis">{value.title}</p>
                    <ul className="psgbox-item--action">
                      <li>
                        <i className="iconfont">&#xe711;</i> {value.likeNum>999?999:value.likeNum}
                      </li>
                      <li>
                        <i className="iconfont">&#xe6d7;</i> {value.commentNum>999?999:value.commentNum}
                      </li>
                    </ul>
                    </NavLink>
                  </li>
               )
            }
            )
          }
        {this.renderButton()}
      </QueueAnim>
    );
  }
}
