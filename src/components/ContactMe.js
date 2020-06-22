import React,{Component} from 'react';
import "../styles/ContactMe.scss";

export default class ContactMe extends Component {

  render(){
    return (
      <div className="cntacme">
        <div className="cntacme-title">
          联系我
        </div>
        <ul className="cntacme-content">
          <li className="cntacme-item">
            <img draggable="false" src={require('../img/qq.png')} alt="QQ:543784988" title="QQ"/>
            <p>QQ</p>
          </li>
          <li className="cntacme-item">
            <img draggable="false" src={require('../img/wechat.png')} alt="wechat:543784988" title="wechat"/>
            <p>微信</p>
          </li>
        </ul>
      </div>
    )
  }
}