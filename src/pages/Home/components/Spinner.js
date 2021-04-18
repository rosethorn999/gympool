import "../scss/Spinner.scss";

function Spinner() {
  return (
    <div className="hide" id="vue-spinner">
      <svg
        version="1.1"
        id="layer1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 150 150"
        // style="enable-background:new 0 0 150 150;"
        //   xml:space="preserve"
      >
        <g>
          <rect
            x="49"
            y="67"
            style={{ fill: "#FFFFFF" }}
            width="52"
            height="16"
          />
        </g>
        <g>
          <path
            style={{ fill: "#FFFFFF" }}
            d="M16,83H4c-2.2,0-4-1.8-4-4v-8c0-2.2,1.8-4,4-4h12c2.2,0,4,1.8,4,4v8C20,81.2,18.2,83,16,83z"
          />
        </g>
        <g>
          <path
            style={{ fill: "#FFFFFF" }}
            d="M146,83h-12c-2.2,0-4-1.8-4-4v-8c0-2.2,1.8-4,4-4h12c2.2,0,4,1.8,4,4v8C150,81.2,148.2,83,146,83z"
          />
        </g>
        <g>
          <path
            style={{ fill: "#FFFFFF" }}
            d="M25,28v94c0,2.2-1.8,4-4,4h-7c-2.2,0-4-1.8-4-4V28c0-2.2,1.8-4,4-4h7C23.2,24,25,25.8,25,28z"
          />
        </g>
        <g>
          <path
            style={{ fill: "#FFFFFF" }}
            d="M49.5,18v114c0,2.2-1.8,4-4,4h-7c-2.2,0-4-1.8-4-4V18c0-2.2,1.8-4,4-4h7C47.7,14,49.5,15.8,49.5,18z"
          />
        </g>
        <g>
          <g>
            <path
              style={{ fill: "#FFFFFF" }}
              d="M125,122V28c0-2.2,1.8-4,4-4h7c2.2,0,4,1.8,4,4v94c0,2.2-1.8,4-4,4h-7C126.8,126,125,124.2,125,122z"
            />
          </g>
          <g>
            <path
              style={{ fill: "#FFFFFF" }}
              d="M100.5,132V18c0-2.2,1.8-4,4-4h7c2.2,0,4,1.8,4,4v114c0,2.2-1.8,4-4,4h-7C102.3,136,100.5,134.2,100.5,132z"
            />
          </g>
        </g>
      </svg>
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
  let overlayDivOld = document.querySelector("#vue-spinner");
  overlayDivOld.classList.add("show");
  createLayer();
}
function close() {
  let overlayDivOld = document.querySelector("#vue-spinner");
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
  let background = "#f00034";
  overlayDiv.id = "overlayDiv";
  overlayDiv.style = `z-index:99997;
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
