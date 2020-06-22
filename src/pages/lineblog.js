import React, { Component } from "react";
import "../styles/lineblog.scss";
import { $_get} from "../http";
import Toast from "../components/Toast/index";
import QueueAnim from "rc-queue-anim";
import { CSSTransition } from "react-transition-group";
import "../styles/animation.scss";
import { connect } from "react-redux";
import {setLineblogList} from "../store/action"

class LineBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      pageIndex: 1,
      pageSize: 10,
      loading: false,
      finished: false
    };
  }
  componentDidMount() {
    this.setState({
      show: true
    });
    if(this.props.lineblogList.length===0){this.getLineblogs();}
  }
  async getLineblogs(isPush = false) {
    try {
      let { pageIndex, pageSize, lineblogList } = this.state;
      this.setState({ loading: true });
      let res = await $_get("/api/getLineblogs", {
        pageIndex,
        pageSize
      });
      if (isPush) {
        lineblogList = lineblogList.concat(res.data.tableData);
      } else {
        lineblogList = res.data.tableData;
      }
      //存入redux
      this.props.setLineblogList(lineblogList)
      this.setState({
        loading: false
      });
      if (res.data.tableData.length < pageSize) {
        this.setState({
          finished: true
        });
      }
    } catch (err) {
      this.setState({
        loading: false,
        pageIndex: this.state.pageIndex - 1
      });
    }
  }

  //点赞行博
  async likeLineblog(id) {
    Toast.error('点赞成功');
  }

  //月份数字转换成大写
  formatMonth(month){
    let arr = ['一','二','三','四','五','六','七','八','九','十','十一','十二'];
    for(let i=1;i<13;i++){
      if(month===i){
        return arr[i-1];
      }
    }
  }

  //加载更多
  loadMore() {
    this.setState(
      {
        pageIndex: this.state.pageIndex + 1
      },
      this.getLineblogs.bind(this, true)
    );
  }
  //加载按钮不同提示
  renderButton() {
    if (!this.state.finished) {
      return (
        <div
          className="loadMore"
          ref="wrapper"
          onClick={this.loadMore.bind(this)}
        >
          {this.state.loading ? (
            <p>
              <span className="icon-loading">
                <i className="iconfont">&#xe65d;</i>
              </span>
              加载中
            </p>
          ) : (
            <p>加载更多</p>
          )}
        </div>
      );
    }
    return (
      <div className="finished" ref="wrapper">
        <i className="iconfont">&#xe702;</i>没有更多数据啦~
      </div>
    );
  }

  render() {
    return (
      <CSSTransition
        in={this.state.show}
        timeout={500}
        classNames="router"
        unmountOnExit
      >
        <div className="lineblog">
          <div className="lineblog-banner">
            <img draggable="false" src={require('../img/line-blog-banner.gif')} alt="行博大图"></img>
          </div>
          <p className="lineblog-slogen">有些话，不应该消散在风里</p>
          <QueueAnim
            className=""
            component="ul"
            type={["right", "left"]}
            ease={["easeOutQuart", "easeInOutQuart"]}
          >
            {this.props.lineblogList.map((item, i) => {
              return (
                <li className="lineblog-item" key={i}>
                  <div className="lineblog-item-info">
                    <p className="lineblog-item-month">
                      {item.createTime ? this.formatMonth(item.createTime.substr(5, 2)) : "--"}月
                    </p>
                    <p className="lineblog-item-date">
                      {item.createTime ? item.createTime.substr(8, 2) : "--"}
                    </p>
                  </div>
                  <div className="lineblog-item-content">
                    <p className="lineblog-item-text">{item.contents}</p>
                    <p className="lineblog-item-options">
                        <span onClick={this.likeLineblog.bind(this, item.id)}>
                          <i className="iconfont icon-like">&#xe6c9;</i>
                          {item.likeNum || 0})
                        </span>
                    </p>
                  </div>
                </li>
              );
            })}
            {this.renderButton()}
          </QueueAnim>
        </div>
      </CSSTransition>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lineblogList: state.lineblogList
  }
}

// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setLineblogList (data) {
        dispatch(setLineblogList(data))
    },
    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LineBlog)