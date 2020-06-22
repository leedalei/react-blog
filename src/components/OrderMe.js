import React, { Component } from "react";
import "../styles/OrderMe.scss";
import "../components/OrderDialog/index";
import { $_get} from "../http";
import OrderDialog from "../components/OrderDialog/index";
import Toast from "./Toast/index";
import { connect } from "react-redux";
import { setBlogInfo } from "../store/action"

class OrderMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false
    };
  }
  componentDidMount() {
    this.getUserLikeAndOrder();
  }

  //获取用户所有点赞和阅读数量和所有的博文数
  async getUserLikeAndOrder() {
    let res = await $_get('/api/getUserLikeAndOrder');
    this.props.setBlogInfo(res.data);
  }
  //已注册用户，但是未订阅
  async subscribe(id) {
    Toast.success('感谢您的订阅！');
  }

  //点击订阅
  handleSubscribe() {
    this.openDialog();
  }
  //开启模态框
  openDialog() {
    this.setState({
      showDialog: true
    });
  }
  //关闭模态框
  closeDialog() {
    this.setState({
      showDialog: false
    });
  }

  render() {
    let { showDialog } = this.state;
    let { blogInfo } = this.props;
    return (
      <div className="ordme">
        <div className="ordme-avator">
          <img draggable="false" src={require("../img/avator.png")} alt="" />
        </div>
        <p className="ordme-name">leelei</p>
        <div className="ordme-info">
          <p>
            <span>{blogInfo.totalArticleNum}</span>
            <i title="博文">博文</i>
          </p>
          <p>
            <span>{blogInfo.totalLikeNum}</span>
            <i title="喜欢">点赞</i>
          </p>
          <p>
            <span>{blogInfo.totalOrderNum}</span>
            <i title="订阅">订阅</i>
          </p>
        </div>
            <button
              className="ordme-btn"
              onClick={this.handleSubscribe.bind(this)}
            >
              订 阅
          </button>
        <OrderDialog
          show={showDialog}
          openType="subscribe"
          handleClose={this.closeDialog.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    blogInfo: state.blogInfo
  }
}

// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setBlogInfo(data) {
      dispatch(setBlogInfo(data))
    },

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderMe)
