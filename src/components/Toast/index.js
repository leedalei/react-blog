import React from "react";
import ReactDOM from "react-dom";
import ToastBox from "./toast";
import "./toast.scss";

function createNotification() {
  return new Promise((resolve, reject) => {
    try {
      const div = document.createElement("div");
      document.body.appendChild(div);
      ReactDOM.render(
        <ToastBox
          ref={notification => {
            resolve({
              addNotice(notice) {
                return notification.addToast(notice);
              },
              destroy() {
                ReactDOM.unmountComponentAtNode(div);
                document.body.removeChild(div);
              }
            });
          }}
        />,
        div
      );
    } catch (err) {
      reject(err);
    }
  });
}

let noti;
const notice = async (type, content, duration = 2000, onClose) => {
  if (!noti) noti = await createNotification();
  return noti.addNotice({ type, content, duration, onClose });
};

export default {
  info(content, duration, onClose) {
    if(typeof content!=="string"){return}
    return notice("info", content, duration, onClose);
  },
  success(content = "操作成功", duration, onClose) {
    if(typeof content!=="string"){return}
    return notice("success", content, duration, onClose);
  },
  error(content, duration, onClose) {
    if(typeof content!=="string"){return}
    return notice("error", content, duration, onClose);
  }
};
