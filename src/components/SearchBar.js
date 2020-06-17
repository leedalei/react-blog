import React, { Component } from "react";
import "../styles/SearchBar.scss";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      searchKey: ""
    };
  }
  //聚焦变色
  focus(focused) {
    this.setState({
      focused
    });
  }
  //输入
  handleInput(e) {
    this.setState({
      searchKey:e.target.value
    })
  }
  //监听回车
  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.handleClick();
    }
  }

  //点击事件
  handleClick(){
    if(typeof this.props.handleSearch ==="function" ){
      this.props.handleSearch(this.state.searchKey);
    }else{
      console.log('回调函数不存在');
    }
  }

  render() {
    return (
      <div
        className="searchbar"
        style={{ borderColor: this.state.focused ? "#17aaee" : "#d9d9d9" }}
      >
        <input
          type="text"
          value={this.state.searchKey}
          onChange={this.handleInput.bind(this)}
          placeholder="输入文章名进行检索..."
          onFocus={this.focus.bind(this, true)}
          onBlur={this.focus.bind(this, false)}
          onKeyUp={this.handleKeyUp.bind(this)}
        />
        <i className="iconfont icon-search" onClick={this.handleClick.bind(this)} >&#xe759;</i>
      </div>
    );
  }
}
