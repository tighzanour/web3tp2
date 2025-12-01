import { animate, utils } from "animejs";

let loops = 0;
const pulse = animate(".dot", {
  scale: 10,
  loop: true,
});