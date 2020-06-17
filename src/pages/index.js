import React,{Component} from 'react';
import CommonHeader from '../components/CommonHeader';
import MusicPlayer from '../components/MusicPlayer';
import BackToTop from '../components/BackToTop/index';
import "../iconfont/iconfont.css";

export default class Index extends Component {
  
  render(){
    return (
      <div>
        <CommonHeader />
        {this.props.children}
        <MusicPlayer  bottom="20px" right="20px" width="160px" height="70px"/>
        <BackToTop />
      </div>
    )
  }
}