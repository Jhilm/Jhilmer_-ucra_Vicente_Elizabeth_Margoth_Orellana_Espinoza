//import "./css/tools.css";
import useCanvasContext from "../hooks/useCanvasContext";
import figure from "../assets/figure";

const images_route = require.context("../assets", true);

const Figure = () => {
  const app_ctx = useCanvasContext();
  const class_name = "w3-card w3-col s12";
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
  function init() {
    canvas = document.getElementById("canvas");
    down = canvas.onmousedown;
    move = canvas.onmousemove;
    up = canvas.onmouseup;
    canvas.onmousedown = handleMouseDown;
    canvas.onmousemove = handleMouseMove;
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
      console.log("posicion inicial", m.x, m.y);
    }
  }

  function handleMouseMove(e) {
    if (drawing) {
      const mainCanvas = document.getElementById(app_ctx.ID_CANVAS);
      m = oMousePos(mainCanvas, e);
      console.log(m.x, m.y);
    }
  }

  function handleMouseUp(e) {
    if (drawing === true) {
      const mainCanvas = document.getElementById(app_ctx.ID_CANVAS);
      m = oMousePos(mainCanvas, e);
      console.log("posicion final", m.x, m.y);
      dibujar();
      canvas.onmousedown = down;
      canvas.onmousemove = move;
      canvas.onmouseup = up;
      drawing = false;
      app_ctx.DRAWING.setDrawing(false);
      app_ctx.DRAWING.setDrawing(false);
    }
  }

  function dibujar() {
    const canvas = document.getElementById(app_ctx.ID_CANVAS);
    var ctx_1 = canvas.getContext("2d");
    ctx_1.beginPath();
    ctx_1.strokeStyle = app_ctx.SELECTED_COLOR;
    ctx_1.lineWidth = app_ctx.THICKNESS;
    switch (localStorage.getItem("figure")) {
      case "circle":
        var x_center = (m.x - x_init) / 2 + x_init;
        var y_center = (m.y - y_init) / 2 + y_init;
        var radio =
          Math.sqrt(Math.pow(m.x - x_init, 2) + Math.pow(m.y - y_init, 2)) / 2;
        console.log("x:", x_center, " y:", y_center, "radio:", radio);
        ctx_1.arc(x_center, y_center, radio, 0, Math.PI * 2, true);
        ctx_1.stroke();
        break;
      case "rectangle":
        var width = m.x - x_init;
        var height = m.y - y_init;
        ctx_1.strokeRect(x_init, y_init, width, height);
        break;
    }
    ctx_1.closePath();
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
    <div className="w3-col s1">
      <img className={class_name} src={figure.circle} onClick={drawingCircle} />
      <img
        className={class_name}
        src={figure.rectangle}
        onClick={drawingRectangle}
      />
    </div>
  );
};

export default Figure;
