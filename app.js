let conductor = new BandJS();
conductor.setTimeSignature(4, 4);
let piano = conductor.createInstrument();
let c4 = piano.note("quarter", "C4");
let d4 = piano.note("quarter", "D4");
let e4 = piano.note("quarter", "E4");
let f4 = piano.note("quarter", "F4");
let player = conductor.finish();

const bBox = $("#button-box");
let keys = [c4, d4, e4, f4];

$("#play").on("click", () => {
  player.play();
});

const band = new BandJS(); // create a single instance of BandJS
band.setTimeSignature(4, 4);
const instrument = band.createInstrument();
instrument.note("quarter", "C4");
let note = band.finish();

$("#c4").on("click", () => {
  note.play();
});

const band2 = new BandJS(); // create a single instance of BandJS
band2.setTimeSignature(4, 4);
const instrument2 = band2.createInstrument();
instrument2.note("quarter", "D4");
let note2 = band2.finish();

$("#d4").on("click", () => {
  note2.play();
});

const band3 = new BandJS(); // create a single instance of BandJS
band3.setTimeSignature(4, 4);
const instrument3 = band3.createInstrument();
instrument3.note("quarter", "E4");
let note3 = band3.finish();

$("#e4").on("click", () => {
  note3.play();
});

const band4 = new BandJS(); // create a single instance of BandJS
band4.setTimeSignature(4, 4);
const instrument4 = band4.createInstrument();
instrument4.note("quarter", "F4");
let note4 = band4.finish();

$("#f4").on("click", () => {
  note4.play();
});
