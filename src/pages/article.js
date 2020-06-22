import React, { Component } from "react";
import "../styles/article.scss";
import "../styles/markdown.scss";
import { $_get } from "../http";
import Comment from "../components/Comment";
import Toast from "../components/Toast/index";
import { smoothScroll } from "../js/smoothScroll.js"

//react -md
import CodeBlock from "../components/CodeBlock";
import HeadingBlock from "../components/HeadingBlock";
import ReactMarkdown from "react-markdown";

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: "",
      alreadyLike: false,
      alreadyRead: false,
      menuList: [],
      articleInfo: { tags: [], likeNum: 0 ,commentNum: 0},
      
    };
    let cb;
  }
  componentDidMount() {
    this.getArticle(this.props.match.params.articleId);
    if(window.screen.availWidth>768){
      //手机端无需调用，这里要做一个滚动屏幕目录高亮跟随
      this.cb = this.throttle(this.menuHighlight, 80).bind(this);
      window.addEventListener("scroll", this.cb);
    }
  }
  componentWillUnmount() {
    if(window.screen.availWidth>768){
      window.removeEventListener("scroll", this.cb);
    }
  }

  //获取文章内容
  async getArticle(id) {
    try {
      let res = await $_get("/api/getArticleById", { id });
      this.setState({
        articleInfo: res.data
      });
      //文章请求完毕之后，需要给图片onload更新目录的offsetTop回调
      setTimeout(()=>{this.createMenu()}, 2000)
    } catch (err) {
      Toast.error(err.msg ? err.msg : err);
    }
  }

  //点赞文章
  async likeArticle() {
    Toast.success('点赞成功');
  }

  //生成目录
  createMenu() {
    this.traversalUsingNodeIterator(
      document.getElementsByClassName("markdown-body")[0]
    );
  }

  //遍历dom树,记录offsetTop以及生成锚点dom 先序遍历
  traversalUsingNodeIterator(node) {
    //每次重置
    // this.setState({
    //   menuList: []
    // })
    var iterator = document.createNodeIterator(
      node,
      NodeFilter.SHOW_ELEMENT,
      null,
      false
    );
    node = iterator.nextNode();
    while (node != null) {
      let menuItem;
      switch (node.tagName) {
        case "H1":
          menuItem = {
            level: 1,
            text: node.innerText,
            offsetH: node.offsetTop,
            highlight: false
          };
          break;
        case "H2":
          menuItem = {
            level: 2,
            text: node.innerText,
            offsetH: node.offsetTop,
            highlight: false
          };
          break;
        case "H3":
          menuItem = {
            level: 3,
            text: node.innerText,
            offsetH: node.offsetTop,
            highlight: false
          };
          break;
        case "H4":
          menuItem = {
            level: 4,
            text: node.innerText,
            offsetH: node.offsetTop,
            highlight: false
          };
          break;
        case "H5":
          menuItem = {
            level: 5,
            text: node.innerText,
            offsetH: node.offsetTop,
            highlight: false
          };
          break;
        case "H6":
          menuItem = {
            level: 6,
            text: node.innerText,
            offsetH: node.offsetTop,
            highlight: false
          };
          break;
        default:
          break;
      }
      if (menuItem) {
        this.setState({
          menuList: this.state.menuList.concat([menuItem])
        });
      }
      node = iterator.nextNode();
    }
  }

  //渲染目录
  renderMenu() {
    if (this.state.menuList.length) {
      return (
        <ul className="article-menu">
          <li className="menu-title">目录</li>
          {this.state.menuList.map((v, i) => {
            return (
              <li
                className={`menu-item menu-item--lv${v.level} ${
                  v.highlight ? "menu-item--act" : ""
                  }`}
                key={i}
              >
                <span onClick={() => smoothScroll(v.offsetH)}>{v.text}</span>
              </li>
            );
          })}
        </ul>
      );
    }
    return null;
  }

  //节流，防止滚动的时候高频率处罚，但是节流的时间间隔太大会导致高亮跟随不准确，实乃几把中的几把问题
  throttle(fn, delay) {
    let preTime = Date.now();
    return function () {
      const context = this;
      let args = arguments;
      let doTime = Date.now();
      if (doTime - preTime >= delay) {
        fn.apply(context, args);
        preTime = Date.now();
      }
    };
  }

  //目录高亮跟踪
  menuHighlight() {
    let { menuList } = this.state;
    //由于节流的关系，sTop的值可能是旧值，导致后面的判断不准确
    let sTop = document.documentElement.scrollTop || document.body.srcollTop;
    for (let i = 0; i < menuList.length; i++) {
      if (i === menuList.length - 1) {
        //先判断是不是最后一个
        if (sTop >= menuList[i].offsetH) {
          menuList[i]["highlight"] = true;
        } else {
          menuList[i]["highlight"] = false;
        }
      } else {
        if (sTop >= menuList[i].offsetH && sTop < menuList[i + 1].offsetH) {
          menuList[i]["highlight"] = true;
        } else {
          menuList[i]["highlight"] = false;
        }
      }
      // 这个时候并不会更新视图, 需要 setState更新 arr
      this.setState({
        menuList: this.state.menuList
      });
    }
  }


  render() {
    let { articleInfo, alreadyLike } = this.state;
    return (
      <div className="article-wrap">
        <div className="article">
          <div className="article-head">
            <p className="article-title">{articleInfo.title}</p>
            <p className="article-meta">
              {articleInfo.tags.map((v, i) => {
                return (
                  <span className="article-tag" key={i}>
                    {v.name}
                  </span>
                );
              })}
              <span>
                发表时间:
                {articleInfo.createTime}
              </span>
              <span>
                最近更新:
                {articleInfo.updateTime}
              </span>
              <span>
                阅读数:
                {articleInfo.readNum}
              </span>
            </p>
          </div>
          <ReactMarkdown
            className="markdown-body"
            source={articleInfo.contents}
            escapeHtml={false}
            renderers={{
              code: CodeBlock,
              heading: HeadingBlock
            }}
          />
          <div className="article-suspended">
            <div
              className={`suspended-like suspended-item ${
                alreadyLike ? "suspended-item--act" : ""
                }`}
              badge={articleInfo.likeNum}
              onClick={this.likeArticle.bind(this)}
            >
              <i className="iconfont">&#xe711;</i>
            </div>
            <div
              className="suspended-comment suspended-item"
              badge={articleInfo.commentNum}
              onClick={() => smoothScroll("comment")}
            >
              <i className="iconfont">&#xe6d7;</i>
            </div>
          </div>
          <div className="article-comment" id="comment">
            <Comment
              articleId={this.props.match.params.articleId}
              handleCountComment={this.getCommnetCount.bind(this)}
            />
          </div>
        </div>
        {this.renderMenu()}
      </div>
    );
  }
}
