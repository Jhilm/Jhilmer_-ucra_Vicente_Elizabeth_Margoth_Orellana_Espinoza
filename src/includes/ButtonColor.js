import { Fragment, useEffect, useRef, useState } from "react";
import useCanvasContext from "../hooks/useCanvasContext";

const BtnColor = () => {
  const colors_array = ["black", "green", "red", "blue", "yellow", "purple"];
  const button_color = useRef();
  var [selected_color, setColor] = useState("#000000");
  var app_ctx = useCanvasContext();
  function set_color(color_in) {
    if (color_in !== selected_color) {
      switch (color_in) {
        case "green":
          setColor("#008000");
          break;
        case "red":
          setColor("#ff0000");
          break;
        case "purple":
          setColor("#6a0dad");
          break;
        case "blue":
          setColor("#0000ff");
          break;
        case "yellow":
          setColor("#ffff00");
          break;
        case "black":
          setColor("#000000");
          break;
        case "white":
          setColor("#ffffff");
          break;
        default:
          setColor(color_in);

      }
    }
  }
  useEffect(() => {
    app_ctx.SELECTED_COLOR = selected_color;
    button_color.current.value = selected_color;
  }, [selected_color]);
  return (
    <Fragment>
      <input
        type="color"
        ref={button_color}
        onChange={() => {
          set_color(button_color.current.value);
        }}
      ></input>
      {colors_array.map((data, pos) => {
        let btn_color_class_name = "w3-button w3-" + data;
        return (
          <button
            key={pos}
            className={btn_color_class_name}
            onClick={() => {
              set_color(data);
            }}
          ></button>
        );
      })}
    </Fragment>
  );
};

export default BtnColor;
