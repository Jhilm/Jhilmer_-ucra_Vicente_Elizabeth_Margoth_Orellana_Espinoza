import { Fragment } from "react";
import useCanvasContext from "../hooks/useCanvasContext";
function Canvas() {
  const app_ctx = useCanvasContext();
  var x = 0,
    y = 0,
    dibujando = false;
  let m = {};
  function handleMouseDown(e) {
    const mainCanvas = document.getElementById(app_ctx.ID_CANVAS);
    if (
      mainCanvas &&
      !app_ctx.DRAWING.free_drawing &&
      !app_ctx.WRITING.writing_text
    ) {
      m = oMousePos(mainCanvas, e);
      x = m.x;
      y = m.y;
      dibujando = true;
    }
  }

  function handleMouseMove(e) {
    if (
      dibujando &&
      !app_ctx.DRAWING.free_drawing &&
      !app_ctx.WRITING.writing_text
    ) {
      const mainCanvas = document.getElementById(app_ctx.ID_CANVAS);
      m = oMousePos(mainCanvas, e);
      dibujar(x, y, m.x, m.y);
      x = m.x;
      y = m.y;
    }
  }

  function handleMouseUp(e) {
    if (
      dibujando &&
      !app_ctx.DRAWING.free_drawing &&
      !app_ctx.WRITING.writing_text
    ) {
      const mainCanvas = document.getElementById(app_ctx.ID_CANVAS);
      m = oMousePos(mainCanvas, e);
      dibujar(x, y, m.x, m.y);
      x = 0;
      y = 0;
      dibujando = false;
    }
  }

  function dibujar(x1, y1, x2, y2) {
    const canvas = document.getElementById(app_ctx.ID_CANVAS);
    var ctx_1 = canvas.getContext("2d");
    ctx_1.beginPath();
    ctx_1.strokeStyle = app_ctx.SELECTED_COLOR;
    ctx_1.lineWidth = app_ctx.THICKNESS;
    ctx_1.moveTo(x1, y1);
    ctx_1.lineTo(x2, y2);
    ctx_1.stroke();
    ctx_1.closePath();

    const canvas_backing = document.getElementById(app_ctx.ID_CANVAS_AUX);
    var ctx_2 = canvas_backing.getContext("2d");
    ctx_2.beginPath();
    ctx_2.strokeStyle = app_ctx.SELECTED_COLOR;
    ctx_2.lineWidth = app_ctx.THICKNESS;
    ctx_2.moveTo(x1, y1);
    ctx_2.lineTo(x2, y2);
    ctx_2.stroke();
    ctx_2.closePath();
  }

  function oMousePos(canvas, evt) {
    var ClientRect = canvas.getBoundingClientRect();
    return {
      //objeto
      x: Math.round(evt.clientX - ClientRect.left),
      y: Math.round(evt.clientY - ClientRect.top),
    };
  }
  return (
    <Fragment>
      <canvas
        className="w3-card-4 w3-border"
        id="canvas"
        width="800"
        height="600"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
      <canvas
        id="canvas_backing"
        width="800"
        height="600"
        style={{ display: "none" }}
      ></canvas>
    </Fragment>
  );
}

export default Canvas;
