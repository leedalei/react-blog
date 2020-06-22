import React, { Component } from "react";
import "./OrderDialog.scss";
import Toast from "../Toast/index";
import Animate from "rc-animate";

export default class OrderDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mail: ""
    };
  }

  componentDidMount() {}
  //表单输入
  onInputChange(type, e) {
    if (type === "name") {
      this.setState({
        name: e.target.value
      });
    } else {
      this.setState({
        mail: e.target.value
      });
    }
  }

  //提交订阅
  onSubmit(isSubscribed) {
    let { name, mail } = this.state;
    if (name.trim() === "" || name.length > 30) {
      Toast.error("用户名为空或者长度大于30字符");
      return;
    } else if (
      !/^([-_A-Za-z0-9.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/.test(mail)
    ) {
      Toast.error("邮箱格式不对");
      return;
    }
    this.insertGuest();
  }

  //插入新用户
  async insertGuest() {
    //这里发一个请求，插入一个订阅，略
    Toast.success("订阅成功！");
  }
 

  render() {
    return (
      <Animate transitionName="dialog" component="div">
        {this.props.show ? (
          <div className="dialog">
            <div className="dialog-title">信息填写</div>
            <form action="">
              <input type="password" style={{ display: "none" }} />
              <div className="form-item">
                <label className="form-key" htmlFor="name">
                  起个响当当的名字吧！
                </label>
                <p className="form-value">
                  <input
                    type="text"
                    id="name"
                    autoComplete="off"
                    onChange={this.onInputChange.bind(this, "name")}
                  />
                </p>
              </div>
              <div className="form-item">
                <label className="form-key" htmlFor="mail">
                  整个静鸡鸡的邮箱吧！
                </label>
                <p className="form-value">
                  <input
                    type="text"
                    id="mail"
                    autoComplete="off"
                    onChange={this.onInputChange.bind(this, "mail")}
                  />
                </p>
              </div>
              <div className="form-tip">
                TIP:此订阅仅会向您推送博文，博主用生命担保不会把你的信息卖个其他网站来牟取利益，请您放心
              </div>
              <div>
                {this.props.openType === "subscribe" ? (
                  <button
                    className="form-btn form-submit"
                    type="button"
                    onClick={this.onSubmit.bind(this,true)}
                  >
                    订 &nbsp; 阅
                  </button>
                ) : (
                  <button
                    className="form-btn form-submit"
                    type="button"
                    onClick={this.onSubmit.bind(this,false)}
                  >
                    确 &nbsp; 定
                  </button>
                )}
                <button
                  className="form-btn form-close"
                  type="button"
                  onClick={this.props.handleClose}
                >
                  关 &nbsp; 闭
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </Animate>
    );
  }
}
