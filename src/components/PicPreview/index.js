import React from "react";
import ReactDOM from "react-dom";
import PicReview from "./PicReview";
import "./PicPreview.scss";

function createPicPreview() {
  return new Promise((resolve, reject) => {
    try {
      const div = document.createElement("div");
      document.body.appendChild(div);
      ReactDOM.render(
        <PicReview
          ref={instance => {
            resolve({
              showPicPreview(option) {
                return instance.showPicPreview(option);
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

let previewer;
const show = async ( src, duration = 2000, onClose) => {
  if (!previewer) previewer = await createPicPreview();
  return previewer.showPicPreview({  src, duration, onClose });
};

export default {
  show
};
