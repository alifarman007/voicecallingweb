export class AudioManager {
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private processor: ScriptProcessorNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private onAudioDataCb: ((base64Pcm: string) => void) | null = null;

  private playbackQueue: AudioBuffer[] = [];
  private isPlaying = false;
  private currentSource: AudioBufferSourceNode | null = null;
  private nextPlayTime = 0;

  async startMicrophone(): Promise<string | null> {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return 'Microphone API is not supported in this browser or context.';
      }

      // Create AudioContext before await to ensure it's within the user gesture context for Safari
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });

      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        }
      });

      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      this.source = this.audioContext.createMediaStreamSource(this.mediaStream);
      
      this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);
      
      this.processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const pcm16 = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          let s = Math.max(-1, Math.min(1, inputData[i]));
          pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        
        const buffer = pcm16.buffer;
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const base64 = btoa(binary);
        this.onAudioDataCb?.(base64);
      };

      this.source.connect(this.processor);
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = 0;
      this.processor.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      return null;
    } catch (err: any) {
      console.error('Error accessing microphone', err);
      return err.message || 'Microphone access denied or unavailable.';
    }
  }

  stopMicrophone() {
    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(t => t.stop());
      this.mediaStream = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  onAudioData(cb: (base64Pcm: string) => void) {
    this.onAudioDataCb = cb;
  }

  playAudioChunk(base64PcmData: string) {
    if (!this.audioContext) return;

    const binaryString = atob(base64PcmData);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    const int16Array = new Int16Array(bytes.buffer);
    const float32Array = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768.0;
    }

    const audioBuffer = this.audioContext.createBuffer(1, float32Array.length, 24000);
    audioBuffer.getChannelData(0).set(float32Array);

    this.playbackQueue.push(audioBuffer);
    if (!this.isPlaying) {
      this.playNextChunk();
    }
  }

  private playNextChunk() {
    if (this.playbackQueue.length === 0 || !this.audioContext) {
      this.isPlaying = false;
      return;
    }

    this.isPlaying = true;
    const buffer = this.playbackQueue.shift()!;
    this.currentSource = this.audioContext.createBufferSource();
    this.currentSource.buffer = buffer;
    this.currentSource.connect(this.audioContext.destination);
    
    const currentTime = this.audioContext.currentTime;
    if (this.nextPlayTime < currentTime) {
      this.nextPlayTime = currentTime;
    }
    
    this.currentSource.start(this.nextPlayTime);
    this.nextPlayTime += buffer.duration;

    this.currentSource.onended = () => {
      this.playNextChunk();
    };
  }

  stopPlayback() {
    this.playbackQueue = [];
    if (this.currentSource) {
      try {
        this.currentSource.stop();
      } catch (e) {}
      this.currentSource.disconnect();
      this.currentSource = null;
    }
    this.isPlaying = false;
    this.nextPlayTime = 0;
  }
}
