import React, { Component } from "react";
import "../styles/Book.scss";
import { Motion, spring } from "react-motion";

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flipDeg: 0
    };
  }

  //翻转
  flip(deg) {
    this.setState({
      flipDeg: deg
    });
  }

  render() {
    return (
      <div className="book">
        <Motion
          style={{
            deg: spring(this.state.flipDeg, {
              stiffness: 200,
              damping: 30,
              precision: 30
            })
          }}
        >
          {interpolatingStyle => {
            return (
              <div
                className="book--before"
                style={{ transform: `rotateY(${interpolatingStyle.deg}deg)` }}
              >
                <div className="book-pic">
                  <img draggable="false" src={this.props.src} alt="书籍封面" />
                </div>
                <p className="book-title ellipsis">{this.props.name}</p>
                <p className="book-author ellipsis">{this.props.author}</p>
                <i className="iconfont icon-flip" onClick={this.flip.bind(this, 180)}>&#xe64d;</i>
              </div>
            );
          }}
        </Motion>
        <Motion
          style={{
            deg: spring(this.state.flipDeg, {
              stiffness: 200,
              damping: 30,
              precision: 30
            })
          }}
        >
          {interpolatingStyle => {
            return (
              <div
                className="book--after"
                style={{
                  transform: `rotateY(${interpolatingStyle.deg - 180}deg)`
                }}
              >
                <ul className="book-point">
                  <li className="book-point--easy">
                    <span>难易指数</span>
                    {
                      Array.from({ length: this.props.difficulty}, (v, i) => (
                        <i className="iconfont icon-star" key={i}>&#xe870;</i>
                      ))
                    }
                  </li>
                  <li className="book-point--recommend">
                    <span>推荐指数</span>
                    {
                      Array.from({ length: this.props.recommendation}, (v, i) => (
                        <i className="iconfont icon-star" key={i}>&#xe870;</i>
                      ))
                    }
                  </li>
                </ul>
                <div className="book-remark">
                {this.props.evaluation}
                </div>
                <i className="iconfont icon-flip" onClick={this.flip.bind(this, 0)}>&#xe64d;</i>
              </div>
            );
          }}
        </Motion>
      </div>
    );
  }
}
