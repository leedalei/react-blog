/* eslint-disable default-case */
import React, { Component } from "react";
import "../styles/home.scss";
import PassageBox from "../components/PassageBox";
import Tags from "../components/Tags";
import Archive from "../components/Archive";
import OrderMe from "../components/OrderMe";
import ContactMe from "../components/ContactMe";
import { $_get } from "../http";
import SearchBar from "../components/SearchBar";
import { CSSTransition } from "react-transition-group";
import "../styles/animation.scss";
import { connect } from 'react-redux'
import {setArticleList,setTagList} from '../store/action'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      tag: "",
      tagName:"",
      startTime: "",
      endTime: "",
      show: false,
      pageIndex: 1,
      pageSize: 10,
      finished: false,
      loading: false
    };
  }

  componentDidMount() {
    this.setState({
      show: true,
    });
    if(this.props.articleList.length===0){this.getArticles();}
    if(this.props.tagList.length===0){this.getTagsAll();}
  }
  //加载更多
  pullUpLoad() {
    try {
      this.setState(
        {
          pageIndex: this.state.pageIndex + 1,
          loading: true
        },
        this.getArticles.bind(this, true)
      );
    } catch (err) {
      this.setState({
        pageIndex: this.state.pageIndex - 1,
        loading: false
      });
    }
  }
  //统一处理api返回
  handleApiResult(res, isPush) {
    if (res.length < this.state.pageSize) {
      //当返回的数据小于当前pageSize设置的时候，即是最后一页，文章加载完成
      this.setState({
        finished: true
      });
    }
    let { articleList,setArticleList } = this.props;
    if (isPush) {
      articleList = articleList.concat(res);
    } else {
      articleList = res;
    }
    //保存到redux中
    setArticleList(articleList)
    this.setState({
      loading: false
    });
  }

  //获取文章
  async getArticles(isPush = false) {
    this.setState({
      loading:true
    });
    let { title, startTime, endTime, tag, pageIndex, pageSize } = this.state;
    let res = await $_get("/api/getArticlesAll", {
      title,
      startTime,
      endTime,
      tag,
      pageIndex,
      pageSize
    });
    this.handleApiResult(res.data, isPush);
  }

  //获取所有标签
  async getTagsAll() {
    let res = await $_get("/api/getTagsAll");
    //保存到redux中
    this.props.setTagList(res.data);
  }

  //设置当前的检索条件
  //由于本人之前的获取文章接口是由以下几个条件共同约束的，所以需要分别设置下面的检索条件
  //当然你也可以每个检索条件对应一个不同的接口，分开约束
  setQuery(title) {
    this.setState(
      {
        title:title.trim(),
        pageIndex: 1,
        finished: false
      },
      this.getArticles
    );
  }
  //设置当前tag
  setTag(tag,tagName) {
    this.setState(
      {
        tag,
        tagName,
        pageIndex: 1,
        finished: false
      },
      this.getArticles
    );
  }
  //设置当前选择的归档时间
  setTime(startTime, endTime) {
    this.setState(
      {
        startTime,
        endTime,
        pageIndex: 1,
        finished: false
      },
      this.getArticles
    );
  }
  //清楚检索条件：通过点击检索条件的框框来清除
  clearQueryParam(type){
    switch(type){
      case 'title':{
        this.setState({
          title:"",
          finished:false
        },this.getArticles)
        break;        
      }
      case 'tag':{
        this.setState({
          tag:"",
          tagName:"",
          finished:false
        },this.getArticles)
        break;        
      }
      case 'time':{
        this.setState({
          startTime:"",
          endTime:"",
          finished:false
        },this.getArticles)
        break;        
      }
    }
  }

  render() {
    let {
      tagName,
      title,
      startTime,
      endTime,
      show,
      loading,
      finished,
    } = this.state;
    let {articleList,tagList} = this.props;
    return (
      <div className="home">
        <CSSTransition in={show} timeout={500} classNames="router" unmountOnExit>
          <div className="main">
            <div className="main-left">
              <div className="queryBar">
                <b>当前检索条件:</b>
                {title?<span title="点击去除" onClick={this.clearQueryParam.bind(this,'title')}>标题：{title}</span>:null}
                {tagName?<span title="点击去除" onClick={this.clearQueryParam.bind(this,'tag')}>标签名：{tagName}</span>:null}
                {startTime&&endTime?<span title="点击去除" onClick={this.clearQueryParam.bind(this,'time')}>时间区间：{`${startTime}~${endTime}`}</span>:null}
              </div>
              <PassageBox
                articleList={articleList}
                pullUpLoad={this.pullUpLoad.bind(this)}
                loading={loading}
                finished={finished}
              />
            </div>
            <div className="main-right">
              <SearchBar handleSearch={this.setQuery.bind(this)} />
              <OrderMe />
              <Tags tagList={tagList} handleSearch={this.setTag.bind(this)} />
              <Archive handleSearch={this.setTime.bind(this)} />
              <ContactMe />
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

// mapStateToProps：将state映射到组件的props中
const mapStateToProps = (state) => {
  return {
    articleList: state.articleList,
    tagList:state.tagList
  }
}

// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setArticleList (data) {
        dispatch(setArticleList(data))
    },
    setTagList(data){
      dispatch(setTagList(data))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
