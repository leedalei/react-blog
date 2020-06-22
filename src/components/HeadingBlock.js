import React, { PureComponent } from "react";
import Heading from "./Heading";
import { inherit } from "highlight.js";

class HeadingBlock extends PureComponent {
  renderHtml = () => {
    const { level, children } = this.props;

    if (children && children.length > 0) {
      const nodeValue = children[0].props.value;
      return (
        <Heading level={`h${level}`} id={nodeValue} >
          <a href={`#${nodeValue}`} className="link" style={{color:inherit,textDecoration:'none'}}>
            <span className="title">{children}</span>
          </a> 
        </Heading>
      );
    } else {
      return <>{children}</>;
    }
  };
  render() {
    return <>{this.renderHtml()}</>;
  }
}

export default HeadingBlock;