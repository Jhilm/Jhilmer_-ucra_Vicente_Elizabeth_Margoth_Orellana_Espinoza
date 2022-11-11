//import "./css/tools.css";
import { Fragment, useRef } from "react";
import useCanvasContext from "../hooks/useCanvasContext";
import text_icon from "../assets/text.png";

const images_route = require.context("../assets", true);

const TextTool = () => {
  const app_ctx = useCanvasContext();
  const class_name = "w3-card w3-col s12";
  let m = {};
  const text_in = useRef();
  var down, move, up, canvas;
  function setText() {
    app_ctx.WRITING.setWritingText(true);
    canvas = document.getElementById("canvas");
    down = canvas.onmousedown;
    move = canvas.onmousemove;
    up = canvas.onmouseup;
    canvas.onmousedown = handleMouseDown;
    canvas.onmousemove = () => {};
    canvas.onmouseup = () => {};
  }
  function handleMouseDown(e) {
    const mainCanvas = document.getElementById(app_ctx.ID_CANVAS);
    m = oMousePos(mainCanvas, e);
    if (mainCanvas) {
      m = oMousePos(mainCanvas, e);
      var ctx_1 = canvas.getContext("2d");
      ctx_1.beginPath();
      ctx_1.strokeStyle = app_ctx.SELECTED_COLOR;
      ctx_1.lineWidth = app_ctx.THICKNESS;

      ctx_1.fillText(text_in.current.value, m.x, m.y, 200);
      ctx_1.closePath();
      app_ctx.WRITING.setWritingText(false);
      canvas.onmousedown = down;
      canvas.onmousemove = move;
      canvas.onmouseup = up;
    }
  }

  function oMousePos(canvas, evt) {
    var ClientRect = canvas.getBoundingClientRect();
    return {
      x: Math.round(evt.clientX - ClientRect.left),
      y: Math.round(evt.clientY - ClientRect.top),
    };
  }
  return (
    <Fragment>
      <h3 className="w3-col s12">Ingresa un Texto</h3>
      <div className="w3-col s12">
        <img src={text_icon} className={class_name} onClick={setText} />
        <input className={class_name} type="text" ref={text_in}></input>
      </div>
    </Fragment>
  );
};

export default TextTool;
