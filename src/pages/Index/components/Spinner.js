import "../scss/Spinner.scss";
import { ReactComponent as BrandIcon } from "../assets/logo.svg";

function Spinner() {
  return (
    <div className="hide" id="react-spinner">
      <BrandIcon />
    </div>
  );
}
function trigger(options) {
  const isShow = options.isShow;
  if (isShow) {
    open();
  } else {
    close();
  }
}
function open() {
  let overlayDivOld = document.querySelector("#react-spinner");
  overlayDivOld.classList.add("show");
  createLayer();
}
function close() {
  let overlayDivOld = document.querySelector("#react-spinner");
  overlayDivOld.classList.remove("show");
  removeLayer();
}
function createLayer() {
  let body = document.querySelector("body");
  let overlayDivOld = document.querySelector("#overlayDiv");
  if (overlayDivOld) {
    body.removeChild(overlayDivOld);
  }
  let overlayDiv = document.createElement("div");
  let background = "#e52525";
  overlayDiv.id = "overlayDiv";
  overlayDiv.style = `z-index:497;
      position:fixed;
      width:100%;height:100%;
      background:${background};
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity:0.8`;
  body.appendChild(overlayDiv);
  body.style["overflow-y"] = "hidden";
}
function removeLayer() {
  let body = document.querySelector("body");
  let overlayDivOld = document.querySelector("#overlayDiv");
  if (overlayDivOld) {
    body.removeChild(overlayDivOld);
  }
  body.style["overflow-y"] = "auto";
}

export { Spinner, open, close, trigger };
