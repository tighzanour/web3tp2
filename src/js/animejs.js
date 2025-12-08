import { createDraggable } from "animejs";

const modules = document.querySelectorAll(".crypto, .cat, .balance, .graph, .data, .music, .map, .visualizer");
modules.forEach((mod) => {
  createDraggable(mod, {
    container: "body",
  });
});
