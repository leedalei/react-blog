import React, { Component } from "react";
import "../styles/booklist.scss";
import Book from "../components/Book";
import QueueAnim from 'rc-queue-anim';
import { CSSTransition } from 'react-transition-group'
import "../styles/animation.scss";
import { $_get } from "../http";
import {setBookList} from "../store/action"
import { connect } from "react-redux";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show:false,
    };
  }
  componentDidMount() {
    this.setState({
      show:true
    })
    if(this.props.bookList.length===0){this.getBookList();}
  }
  componentWillUnmount(){
    this.setState({
      show:false
    })
  }

  async getBookList(){
    //redux中有数据不再请求
    let res  =await $_get('/api/getBooksAll');
    this.props.setBookList(res.data)
  }

  //根据屏幕适配，因为queueAnim会在移动端会抖动，效果不太好
  adjustRender(){
    if(window.screen.availWidth>768){
      return  (<QueueAnim 
        className="booklist" 
        component="div" 
        type={['bottom', 'top']}
        ease={['easeOutQuart', 'easeInOutQuart']}>
        {this.props.bookList.map((value, idx) => {
          return (
            <Book
              key={idx}
              src={require('../img/default.png')}
              name={value.name}
              author={value.author}
              evaluation={value.evaluation}
              difficulty={value.difficulty}
              recommendation={value.recommendation}
            />
          );
        })}
        </QueueAnim>)
    }else{
      return ( <ul className="booklist" >
        {this.props.bookList.map((value, idx) => {
          return (
            <Book
              key={idx}
              src={require('../img/default.png')}
              name={value.name}
              author={value.author}
              evaluation={value.evaluation}
              difficulty={value.difficulty}
              recommendation={value.recommendation}
            />
          );
        })}
        </ul>)
    }
  }
  render() {
    return (
      <CSSTransition
      in={this.state.show}
      timeout={500}
      classNames="router"
      unmountOnExit>
        {this.adjustRender()}
      </CSSTransition>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    bookList: state.bookList
  }
}

// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setBookList (data) {
        dispatch(setBookList(data))
    },
    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(BookList)