let synth;
if (typeof window !== "undefined") {
  synth = window.speechSynthesis;
}

export default function speak(text) {
    const speech = new SpeechSynthesisUtterance()
    speech.text = text;
    synth.speak(speech)
}
