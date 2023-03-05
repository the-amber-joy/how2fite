let synth;
if (typeof window !== "undefined") {
  synth = window.speechSynthesis;
}

export default function speak(text, volume) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = text;
  speech.volume = volume;

  synth.speak(speech);
}
