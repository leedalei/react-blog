import React, { Component } from "react";

class ToastBox extends Component {
  constructor() {
    super();
    this.transitionTime = 300;
    this.state = { notices: [], leave: false };
    this.removeNotice = this.removeNotice.bind(this);
  }

  getNoticeKey() {
    const { notices } = this.state;
    return `notice-${new Date().getTime()}-${notices.length}`;
  }

  addToast(notice) {
    const { notices } = this.state;
    notice.key = this.getNoticeKey();

    // notices.push(notice);//展示所有的提示 需要修改css
    notices[0] = notice; //仅展示最后一个提示 伪单例
    // console.log(notices);
    this.setState({ notices });
    if (notice.duration > 0) {
      setTimeout(() => {
        //给一点动画事件，等待动画时间完成后删除dom
        this.setState(
          {
            leave: true
          },
          () => {
            setTimeout(() => {
              this.setState({leave:false})
              this.removeNotice(notice.key);
            }, 400);
          }
        );
      }, notice.duration);
    }
    return () => {
      //给一点动画事件，等待动画时间完成后删除dom
      this.setState(
        {
          leave: true
        },
        () => {
          setTimeout(() => {
            this.setState({leave:false})
            this.removeNotice(notice.key);
          }, 400);
        }
      );
    };
  }

  removeNotice(key) {
    const { notices } = this.state;
    this.setState({
      notices: notices.filter(notice => {
        if (notice.key === key) {
          if (notice.onClose) setTimeout(notice.onClose, this.transitionTime);
          return false;
        }
        return true;
      })
    });
  }

  render() {
    const { notices } = this.state;
    return (
      <div className="toast">
        {notices.map(notice => (
          <div
            className={`toast-box toast--${notice.type} toast-enter-active ${
              this.state.leave ? "toast-leave-active" : ""
            }`}
            key={notice.key}
          >
            <div className="toast-text">{notice.content}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default ToastBox;
