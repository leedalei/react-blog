import React, { Component } from "react";
import "../styles/Archive.scss";
import { $_get } from "../http";
import QueueAnim from "rc-queue-anim";
import{setArchiveList} from "../store/action"
import { connect } from "react-redux";

class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: new Date().getFullYear()
    };
  }
  componentDidMount() {
    if(this.props.archiveList.length===0){this.getArticlesCountByPeriod();}
  }
  //获取年度统计
  async getArticlesCountByPeriod() {
    let { currentYear } = this.state;
    let res = await $_get("/api/getArticlesCountByPeriod", { currentYear });
    this.props.setArchiveList(res.data)
  }

  //年份跳转
  handleYearChange(type) {
    let { currentYear } = this.state;
    //从2017年开始,这里的判断要预留多一年
    switch (type) {
      case "next": {
        currentYear += 1;
        break;
      }
      case "prev": {
        currentYear -= 1;
        break;
      }
      default:{}
    }
    this.setState(
      {
        currentYear: currentYear
      },
      this.getArticlesCountByPeriod
    );
  }

  //计算一年总发文数
  countArticlesAllYear() {
    let sum = 0;
    for (let item of this.props.archiveList) {
      sum += item.totalItems - 0;
    }
    return sum;
  }

  //点击某一个月份
  handleClick(month) {
    let y = this.state.currentYear;
    let startTime = `${y}-${month}-1`;
    let endTime = `${month + 1 > 12 ? y + 1 : y}-${
      month + 1 > 12 ? 1 : month + 1
    }-1`;
    if (typeof this.props.handleSearch === "function") {
      this.props.handleSearch(startTime, endTime);
    } else {
      console.log("回调函数不存在");
    }
  }
  render() {
    let { currentYear } = this.state;
    let {archiveList}=this.props;
    return (
      <div className="archive">
        <div className="archive-title">
          <span>归档 - {currentYear}</span>
          <span>
            {currentYear < 2018 ? (
              <i className="iconfont iconfont--disable">&#xe6e7;</i>
            ) : (
              <i
                className="iconfont"
                onClick={this.handleYearChange.bind(this, "prev")}
              >
                &#xe6e7;
              </i>
            )}
            {currentYear >2020 ? (
              <i className="iconfont iconfont--disable">&#xe6fd;</i>
            ) : (
              <i
                className="iconfont"
                onClick={this.handleYearChange.bind(this, "next")}
              >
                &#xe6fd;
              </i>
            )}
          </span>
        </div>
        <QueueAnim
          className="archive-content"
          component="ul"
          type={["right", "left"]}
          ease={["easeOutQuart", "easeInOutQuart"]}
        >
          {archiveList.map(item => {
            if (item.totalItems === 0) {
              return null;
            }
            return (
              <li
                className="archive-item"
                onClick={this.handleClick.bind(this, item.month)}
                key={item.month}
              >
                <span>
                  {currentYear}年{item.month}月
                </span>
                <span>{item.totalItems} 篇</span>
              </li>
            );
          })}
          {this.countArticlesAllYear() > 0 ? null : (
            <li className="archive-item--empty" key="empty">
              <i className="iconfont" style={{color:'#ff5722'}}>&#xe676;</i>可惜，今年还没发文
            </li>
          )}
        </QueueAnim>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    archiveList: state.archiveList
  }
}

// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setArchiveList (data) {
        dispatch(setArchiveList(data))
    },
    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Archive)