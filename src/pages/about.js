import React, { Component } from "react";
import "../styles/about.scss";
import OrderMe from "../components/OrderMe";
import PicReview from "../components/PicPreview/index";
import { CSSTransition } from "react-transition-group";
import "../styles/animation.scss";

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show:false,
      src: null,
      showPicReview: false
    };
  }

  componentDidMount() {
    this.setState({
      show: true
    });
  }
  review(src) {
    PicReview.show(src,0)
  }
  render() {
    return (
      <CSSTransition
      in={this.state.show}
      timeout={500}
      classNames="router"
      unmountOnExit>
      <div className="me">
        <div className="me-left">
          <ul className="intro">
            <li className="intro-item">
              <p>姓名</p>
              <p>李伟城</p>
            </li>
            <li className="intro-item">
              <p>英文名</p>
              <p>leelei</p>
            </li>
            <li className="intro-item">
              <p>其他名字</p>
              <p className="small">
                <span
                  className="clickable"
                  onClick={this.review.bind(this, require("../img/wyz.jpg"))}
                >
                  岭南<b className="big">吴彦祖</b>、
                </span>
                <span
                  className="clickable"
                  onClick={this.review.bind(this, require("../img/cgx.jpg"))}
                >
                  电竞<b className="big">陈冠希</b>、
                </span>
              </p>
            </li>
            <li className="intro-item">
              <p>出生年份</p>
              <p>1997</p>
            </li>
            <li className="intro-item">
              <p>学历</p>
              <p>本科</p>
            </li>
            <li className="intro-item">
              <p>毕业于</p>
              <p className="small">
                距离
                <strong
                  className="big clickable"
                  onClick={this.review.bind(
                    this,
                    require("../img/qinghua.jpg")
                  )}
                >
                  清华大学
                </strong>
                2100公里远的
                <span
                  className="clickable"
                  onClick={this.review.bind(
                    this,
                    require("../img/guanggong.jpg")
                  )}
                >
                  宇宙工业大学
                </span>
              </p>
            </li>
            <li className="intro-item">
              <p>兴趣爱好</p>
              <p
                className="clickable small"
                onClick={this.review.bind(this, require("../img/qmkg.png"))}
              >
                唱歌，全民K歌<b className="big">求关注</b>
              </p>
            </li>
            <li className="intro-item">
              <p>党性</p>
              <p>极佳，热爱祖国热爱党</p>
            </li>
            <li className="intro-item">
              <p>优点</p>
              <p>常怀热情</p>
            </li>
            <li className="intro-item">
              <p>缺点</p>
              <p className="small">
                很多，<b className="big">但是不能告诉你</b>
              </p>
            </li>
            <li className="intro-item">
              <p>座右铭</p>
              <p>这个用户很懒，未填写座右铭...</p>
            </li>
          </ul>
          <div className="poetry-wrapper">
            <div className="poetry">
              <p className="poetry-sentence">寒月悲笳，万里西风瀚海沙</p>
              <p className="poetry-sentence">谢娘别后谁能惜，飘泊天涯</p>
              <p className="poetry-sentence">别有根芽，不是人间富贵花</p>
              <p className="poetry-sentence">非关癖爱轻模样，冷处偏佳</p>
            </div>
          </div>
        </div>
        <div className="order">
          <OrderMe />
        </div>
      </div>
      </CSSTransition>
    );
  }
}
