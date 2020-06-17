import React, { Component } from "react";
import Animate from "rc-animate";
import "./BackToTop.scss";

export default class BackToTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    let cb;
  }

  componentWillMount() {
    this.cb = this.throttle(this.scrollHandler, 50).bind(this);
    window.addEventListener("scroll", this.cb);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll',this.cb);
  }
  //滚动回调，判断是否滚动超过Xpx
  scrollHandler() {
    let sTop = document.documentElement.scrollTop || document.body.srcollTop;
    if(sTop>150){
      this.setState({
        show:true
      })
    }else{
      this.setState({
        show:false
      })
    }
  }
  //节流
  throttle(fn, delay) {
    let preTime = Date.now();
    return function() {
      const context = this;
      let args = arguments;
      let doTime = Date.now();
      if (doTime - preTime >= delay) {
        fn.apply(context, args);
        preTime = Date.now();
      }
    };
  }
  //跳转动画
  scrollToAnchor = anchorName => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        anchorElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  //回到顶部
  backToTop() {
    this.scrollToAnchor("root");
  }

  render() {
    return (
      <Animate transitionName="back-to-top" component="div">
        {this.state.show ? (
          <div className="back-to-top" onClick={this.backToTop.bind(this)}>
            <i className="iconfont">&#xe704;</i>
          </div>
        ) : null}
      </Animate>
    );
  }
}
