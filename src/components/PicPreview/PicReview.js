import React, { Component } from "react";
import Animate from "rc-animate";

export default class PicReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      src: ""
    };
  }
  showPicPreview(option) {
    //首先需要设置图片链接
    this.setState({
      src: option.src,
      show: true,
      closeCb: option.onClose
    });
    if (option.duration) {
      //如果有设置时间，那么到时间自动关闭
      this.setTimeout(() => {
        this.hide();
        if (typeof option.onClose === "function") {
          option.onClose();
        }
      }, option.duration);
    }
  }
  //关闭
  handleClose() {
    this.setState({
      show: false
    });
    if (typeof this.closeCb === "function") {
      this.closeCb();
    }
  }
  //隐藏
  hide() {
    this.setState({
      show: false
    });
  }
  render() {
    let { show, src } = this.state;
    return (
      <Animate component="div" transitionName="preview">
        {show ? (
          <div className="preview">
            <img draggable="false" src={src} alt="预览"  />
            <i
              className="iconfont icon-close"
              onClick={this.handleClose.bind(this)}
            >
              &#xe6d6;
            </i>
          </div>
        ) : null}
      </Animate>
    );
  }
}
