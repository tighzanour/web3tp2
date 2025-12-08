import * as Tone from "tone.js";

let step = 0;

const kick = new Tone.MembraneSynth().toDestination();
const snare = new Tone.NoiseSynth({ envelope: { attack: 0.001, decay: 0.12 } }).toDestination();
const hiHat = new Tone.MetalSynth({ frequency: 600, envelope: { attack: 0.001, decay: 0.05 }, resonance: 4000 }).toDestination();
const bass = new Tone.MonoSynth({
  oscillator: { type: "sine" },
  envelope: { attack: 0.001, decay: 0.4, sustain: 0.7, release: 0.8 },
  filterEnvelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.8, baseFrequency: 400, octaves: -2 },
}).toDestination();
const lead = new Tone.Synth({ oscillator: { type: "triangle" } }).toDestination();

// _____________

hiHat.volume.value = -25;
kick.volume.value = -3;
bass.volume.value = -3;
snare.volume.value = -5;

Tone.Transport.bpm.value = 70; // le bpm

const pattern = {
  kick: ["kick", null, "kick", null, null, "kick", "kick", null, null, null, "kick", null, null, "kick", null, "kick"],
  snare: [null, null, null, null, "snare", null, null, null, null, "snare", null, null, "snare", null, null, null],
  hiHat: ["hiHat", "hiHat", "hiHat", null, "hiHat", null, "hiHat", null, "hiHat", "hiHat", "hiHat", null, "hiHat", null, "hiHat", "hiHat"],
  bass: ["F#1", null, null, null, "A#0", null, null, "C#1", null, null, null, "C#1", null, null, "C#1", null],
  lead: ["F#3", null, "F#4", "A2", null, null, "D3", null, null, "C#4", "C#3", null, null, "C#3", "A2", "C#4"],
};

// ____________________

const loop = new Tone.Loop((time) => {
  const i = step % 16;
  if (pattern.kick[i]) kick.triggerAttackRelease("C1", "8n", time);
  if (pattern.snare[i]) snare.triggerAttackRelease("16n", time);
  if (pattern.hiHat[i]) hiHat.triggerAttackRelease("16n", time);
  if (pattern.bass[i]) bass.triggerAttackRelease(pattern.bass[i], "8n", time);
  if (pattern.lead[i]) lead.triggerAttackRelease(pattern.lead[i], "8n", time);
  step++;
}, "16n");

// ____________________

document.querySelector("button").addEventListener("click", async () => {
  await Tone.start();
  loop.start(0);
  Tone.Transport.start();
});

document.getElementById("stop").addEventListener("click", () => {
  Tone.Transport.stop();
  step = 0;
});
