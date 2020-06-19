import React, { Component } from 'react';
import "../styles/MusicPlayer.scss"
import { $_get } from "../http";

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      songList: [
      ],
      currentPlayIdx: 0
    }
  }

  componentWillMount() {
    this.getSongList();
  }

  //获取歌单
  async getSongList() {
    let res = await $_get('/api/getMusicsAll');
    this.setState({
      songList: res.data
    })
  }

  //上一曲
  prev() {
    if (this.state.currentPlayIdx - 1 < 0) {
      this.setState({
        currentPlayIdx: this.state.songList.length - 1
      })
      return;
    }
    this.setState({
      currentPlayIdx: this.state.currentPlayIdx - 1,
      isPlaying:false
    })
    this.refs.player.pause();
    setTimeout(() => {
      this.setState({
        isPlaying: true
      });
      this.refs.player.play();
    })
  }
  //播放-暂停
  togglePlay() {
    if (this.state.isPlaying) {
      //正在播放
      this.setState({
        isPlaying: false
      });
      this.refs.player.pause();
    } else {
      //正在暂停
      this.setState({
        isPlaying: true
      });
      this.refs.player.play();
    }
  }
  //下一曲
  next() {
    if (this.state.currentPlayIdx + 2 > this.state.songList.length) {
      this.setState({
        currentPlayIdx: 0
      })
      return;
    }
    this.setState({
      currentPlayIdx: this.state.currentPlayIdx + 1,
      isPlaying:false
    })
    this.refs.player.pause();
    setTimeout(() => {
      this.setState({
        isPlaying: true
      });
      this.refs.player.play();
    })
  }

  render() {
    let{songList,currentPlayIdx,isPlaying}= this.state;
    if (songList.length) {
      return (
        <div className="mplayer"
          style={{
            width: this.props.width,
            height: this.props.height,
            left: this.props.left,
            right: this.props.right,
            top: this.props.top,
            bottom: this.props.bottom
          }}>
          <div className="mplayer-screen">
            <audio loop="loop" src={ 'http://www.leelei.info/static/uploads/'+songList[currentPlayIdx].src} ref="player">
              您的浏览器不支持 audio 标签。
            </audio>
            <p className={["mplayer-song", isPlaying ? 'mplayer-song--playing' : ""].join(' ')}>
              {songList[currentPlayIdx].name}
            </p>
          </div>
          <div className="mplayer-controll">
            <div className="mplayer-prev" onClick={this.prev.bind(this)}>
              <i className="iconfont">&#xe6e7;</i>
            </div>
            <div onClick={this.togglePlay.bind(this)}>
              {isPlaying ? <i className="iconfont mplayer-pause">&#xe76b;</i> : <i className="iconfont mplayer-play">&#xe6f6;</i>}
            </div>
            <div className="mplayer-next" onClick={this.next.bind(this)}>
              <i className="iconfont">&#xe6fd;</i>
            </div>
          </div>
        </div>)
    } else {
      return null
    }
  }
}