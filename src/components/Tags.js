import React, { Component } from 'react';
import QueueAnim from "rc-queue-anim";
import "../styles/Tags.scss";
export default class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  handleClick(id,name){
    this.setState({
      currentTag:id
    })
    if(typeof this.props.handleSearch ==="function" ){
      this.props.handleSearch(id,name);
    }else{
      console.log('回调函数不存在');
    }
  }
  render() {
    return (
      <div className="tags">
        <div className="tags-title">
          标签
        </div>
        <QueueAnim
          className="tags-content"
          component="ul"
          type={["right", "left"]}
          ease={["easeOutQuart", "easeInOutQuart"]}
        >
          {this.props.tagList.map(v => {
            return <li
            key={v.id} 
            className='tags-item ellipsis'
            onClick={this.handleClick.bind(this,v.id,v.name)}>{v.name}</li>
          })}
        </QueueAnim>
      </div>
    );
  }
}
