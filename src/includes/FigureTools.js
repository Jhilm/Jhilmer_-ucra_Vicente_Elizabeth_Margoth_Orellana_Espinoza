//import "./css/tools.css";
import useCanvasContext from "../hooks/useCanvasContext";
import figure from "../assets/figure";
import { Fragment } from "react";

const images_route = require.context("../assets", true);

const Figure = () => {
  const app_ctx = useCanvasContext();
  const class_name = "w3-card w3-col s6";
  var x_init = 0,
    y_init = 0,
    drawing = false;
  let m = {};
  var canvas = document.getElementById("canvas");
  var down, move, up;

  function drawingCircle() {
    init();
    localStorage.setItem("figure", "circle");
  }
  function drawingRectangle() {
    init();
    localStorage.setItem("figure", "rectangle");
  }
  function drawingLine() {
    init();
    localStorage.setItem("figure", "line");
  }
  function init() {
    canvas = document.getElementById("canvas");
    down = canvas.onmousedown;
    move = canvas.onmousemove;
    up = canvas.onmouseup;
    canvas.onmousedown = handleMouseDown;
    canvas.onmousemove = () => {};
    canvas.onmouseup = handleMouseUp;
    app_ctx.DRAWING.setDrawing(true);
  }
  function handleMouseDown(e) {
    const mainCanvas = document.getElementById(app_ctx.ID_CANVAS);
    if (mainCanvas) {
      m = oMousePos(mainCanvas, e);
      x_init = m.x;
      y_init = m.y;
      drawing = true;
    }
  }

  function handleMouseUp(e) {
    if (drawing === true) {
      const mainCanvas = document.getElementById(app_ctx.ID_CANVAS);
      m = oMousePos(mainCanvas, e);
      drawingFigure();
      canvas.onmousedown = down;
      canvas.onmousemove = move;
      canvas.onmouseup = up;
      drawing = false;
      app_ctx.DRAWING.setDrawing(false);
      app_ctx.DRAWING.setDrawing(false);
    }
  }

  function drawingFigure() {
    const canvas = document.getElementById(app_ctx.ID_CANVAS);
    const canvas_backing = document.getElementById(app_ctx.ID_CANVAS_AUX);
    var ctx_1 = canvas.getContext("2d");
    ctx_1.beginPath();
    ctx_1.strokeStyle = app_ctx.SELECTED_COLOR;
    ctx_1.lineWidth = app_ctx.THICKNESS;

    var ctx_2 = canvas_backing.getContext("2d");
    ctx_2.beginPath();
    ctx_2.strokeStyle = app_ctx.SELECTED_COLOR;
    ctx_2.lineWidth = app_ctx.THICKNESS;
    switch (localStorage.getItem("figure")) {
      case "circle":
        var x_center = (m.x - x_init) / 2 + x_init;
        var y_center = (m.y - y_init) / 2 + y_init;
        var radio =
          Math.sqrt(Math.pow(m.x - x_init, 2) + Math.pow(m.y - y_init, 2)) / 2;
        ctx_1.arc(x_center, y_center, radio, 0, Math.PI * 2, true);
        ctx_1.stroke();
        ctx_2.arc(x_center, y_center, radio, 0, Math.PI * 2, true);
        ctx_2.stroke();
        break;
      case "rectangle":
        var width = m.x - x_init;
        var height = m.y - y_init;
        ctx_1.strokeRect(x_init, y_init, width, height);
        ctx_2.strokeRect(x_init, y_init, width, height);
        break;
      case "line":
        ctx_1.moveTo(x_init, y_init);
				ctx_1.lineTo(m.x, m.y);
				ctx_1.stroke();
        ctx_2.moveTo(x_init, y_init);
				ctx_2.lineTo(m.x, m.y);
				ctx_2.stroke();
        break;
    }
    ctx_1.closePath();
    ctx_2.closePath();
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
      <h3 className="w3-col s12">Selecciona una figura para Dibujar</h3>
      <img className={class_name} src={figure.circle} onClick={drawingCircle} />
      <img
        className={class_name}
        src={figure.rectangle}
        onClick={drawingRectangle}
      />
      <img className={class_name} src={figure.line} onClick={drawingLine} />
    </Fragment>
  );
};

export default Figure;
