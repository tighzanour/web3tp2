import Zdog from "https://esm.sh/zdog";

const illo = new Zdog.Illustration({
  element: ".zdog-canvas",
  resize: true,
  dragRotate: true,
  zoom: 1,
});

new Zdog.Cylinder({
  addTo: illo,
  diameter: 100,
  length: 20,
  color: "#af0000ff",
  backface: "#ff0000ff",
});

let glissement = 0;

illo.onDragMove = function (pointer, moveX) {
  glissement = moveX * 0.01;
};

function animate() {
  illo.rotate.y += 0.01 + glissement;
  glissement *= 0.9;

  illo.updateRenderGraph();
  requestAnimationFrame(animate);
}

animate();
