// Stereo 48kHz 16-bit PCM WAV Encoder
export function encodeAudioBufferToWav(buffer: AudioBuffer): Uint8Array {
  const numChannels = 2;
  const sampleRate = buffer.sampleRate;
  const length = buffer.length;
  const bytesPerSample = 2; // 16-bit PCM
  const blockAlign = numChannels * bytesPerSample;
  const dataByteCount = length * blockAlign;
  const headerByteCount = 44;
  const totalLength = headerByteCount + dataByteCount;


  const wavBytes = new Uint8Array(totalLength);
  const view = new DataView(wavBytes.buffer);


  // Write ASCII string helper
  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };


  // RIFF chunk
  writeString(0, "RIFF");
  view.setUint32(4, 36 + dataByteCount, true);
  writeString(8, "WAVE");


  // fmt sub-chunk
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);             // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true);              // AudioFormat (1 for PCM)
  view.setUint16(22, numChannels, true);    // NumChannels
  view.setUint32(24, sampleRate, true);     // SampleRate
  view.setUint32(28, sampleRate * blockAlign, true); // ByteRate
  view.setUint16(32, blockAlign, true);     // BlockAlign
  view.setUint16(34, 16, true);             // BitsPerSample


  // data sub-chunk
  writeString(36, "data");
  view.setUint32(40, dataByteCount, true);


  const leftChannel = buffer.getChannelData(0);
  const rightChannel = buffer.numberOfChannels > 1 ? buffer.getChannelData(1) : leftChannel;


  let offset = 44;
  for (let i = 0; i < length; i++) {
    // Left sample
    let sL = Math.max(-1, Math.min(1, leftChannel[i]));
    const intL = sL < 0 ? Math.round(sL * 32768) : Math.round(sL * 32767);
    view.setInt16(offset, intL, true);
    offset += 2;


    // Right sample
    let sR = Math.max(-1, Math.min(1, rightChannel[i]));
    const intR = sR < 0 ? Math.round(sR * 32768) : Math.round(sR * 32767);
    view.setInt16(offset, intR, true);
    offset += 2;
  }


  return wavBytes;
}


