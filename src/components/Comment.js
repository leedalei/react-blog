import React, { Component } from "react";
import "../styles/Comment.scss";
import { $_get } from "../http";
import Toast from "./Toast/index";
import QueueAnim from "rc-queue-anim";

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentList: [],
      commentText: "",
      pageIndex: 1,
      pageSize: 10,
      pageCount: 1,
      replyObj: null,
      isReplying: false,
      lastCommentTimeStamp: null
    };
  }
  componentWillMount() {
    this.setState({
      lastCommentTimeStamp:
        localStorage.lastCommentTimeStamp === undefined
          ? 0
          : Number(localStorage.lastCommentTimeStamp)
    });
    this.getCommentList();
  }

  async getCommentList() {
    let { pageIndex, pageSize } = this.state;
    let res = await $_get("/api/getCommentList", {
      pageIndex,
      pageSize
    });
    this.setState({
      commentList: res.data.tableData,
      pageCount: Math.ceil((res.data.totalItems - 0) / pageSize)
    });
    //告诉父组件有多少条评论
    this.props.handleCountComment(res.data.totalItems);
  }

  //输入监听
  handleInput(e) {
    this.setState({
      commentText: e.target.value
    });
  }

  //点击回复
  handleReply(obj) {
    this.refs.commentInput.focus();
    this.setState({
      isReplying: true,
      replyObj: obj
    });
  }

  //取消回复状态
  cancelReply() {
    this.setState({
      isReplying: false,
      replyObj: null
    });
  }

  //提交评论
  async onSubmit() {
    //这里应该是需要一大波逻辑和发请求的，还有发表评论以后的回调处理，不过我略了，嘿嘿嘿
    Toast.success("评论成功！");
  }

  //页面跳转控制
  onPageChange(type) {
    switch (type) {
      case "prev": {
        if (this.state.pageIndex <= 1) {
          return;
        }
        this.setState(
          {
            pageIndex: this.state.pageIndex - 1
          },
          this.getCommentList
        );
        break;
      }
      case "next": {
        if (this.state.pageIndex === this.state.pageCount) {
          return;
        }
        this.setState(
          {
            pageIndex: this.state.pageIndex + 1
          },
          this.getCommentList
        );
        break;
      }
      default:{}
    }
  }

  //跳转动画
  scrollToAnchor = anchorName => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        anchorElement.scrollIntoView({ behavior: "smooth", inline: "end" });
      }
    }
  };
  render() {
    let {
      pageCount,
      pageIndex,
      pageSize,
      isReplying,
      replyObj,
      commentText,
      commentList
    } = this.state;
    return (
      <div>
        <p className="comment-title">
          <b>Hi~ </b>
        </p>
        <div className="comment-action">
          <div className="comment-action__left">
            {isReplying ? (
              <div class="comment-reply-bar">
                回复 @{replyObj.guestName}{" "}
                <button>
                  <i className="iconfont" onClick={this.cancelReply.bind(this)}>
                    &#xe6d6;
                  </i>
                </button>
              </div>
            ) : null}
            <textarea
              placeholder="写下你的评论..."
              type="text"
              ref="commentInput"
              value={commentText}
              onChange={this.handleInput.bind(this)}
            ></textarea>
          </div>
          <button className="comment-submit" onClick={this.onSubmit.bind(this)}>
            提 交
          </button>
        </div>
        <QueueAnim
          className="comment-ul"
          component="ul"
          type={["right", "left"]}
          ease={["easeOutQuart", "easeInOutQuart"]}
        >
          {commentList.map((v, i) => {
            return (
              <li className="comment-item" key={i}>
                <span className="comment-item-idx">
                  {i + 1 + (pageIndex - 1) * pageSize}楼
                </span>
                <span className="comment-item-avator"></span>
                <div className="comment-item-content">
                  <p className="comment-item-info">
                    <span className="comment-item-name">{v.guestName}</span>
                    <span className="comment-item-time">
                      {v.createTime
                        ? v.createTime
                            .replace("T", "日")
                            .replace(/\.\d{1,3}Z$/, "")
                        : "- - / - -"}
                    </span>
                  </p>
                  {v.replyGuest && v.replyGuest !== "" ? (
                    <div className="comment-item-detail">
                      <p className="comment-item-replyto">
                        @{v.replyGuest}: <span> {v.replyText}</span>
                      </p>
                      <span className="comment-item-replytext">
                        {v.commentText}
                      </span>
                    </div>
                  ) : (
                    <p className="comment-item-detail">{v.commentText}</p>
                  )}
                  <p className="comment-item-control">
                    <button onClick={this.handleReply.bind(this, v)}>
                      <i className="iconfont">&#xe6d7;</i>
                      <span>回复</span>
                    </button>
                  </p>
                </div>
              </li>
            );
          })}
        </QueueAnim>
        {commentList.length ? (
          <div className="comment-page" id="pageControl">
            <span>共{pageCount}页</span>
            <span>当前第{pageIndex}页</span>
            <button
              className={pageIndex === 1 ? "prev-no" : ""}
              onClick={this.onPageChange.bind(this, "prev")}
            >
              上一页
            </button>
            <button
              className={pageIndex === pageCount ? "next-no" : ""}
              onClick={this.onPageChange.bind(this, "next")}
            >
              下一页
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}
