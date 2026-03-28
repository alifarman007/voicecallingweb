import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

export class GeminiLiveClient {
  private ai: GoogleGenAI;
  private session: any = null;
  private onAudioCb: ((base64Pcm: string) => void) | null = null;
  private onStateCb: ((state: 'connecting' | 'connected' | 'speaking' | 'listening' | 'disconnected', error?: string) => void) | null = null;
  private onInterruptedCb: (() => void) | null = null;
  private isConnected: boolean = false;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async connect(systemPrompt: string) {
    this.onStateCb?.('connecting');
    this.isConnected = false;

    try {
      this.session = await this.ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: "Kore"
              }
            }
          },
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          }
        },
        callbacks: {
          onopen: () => {
            console.log('Live API connected');
            this.isConnected = true;
            this.onStateCb?.('connected');
            this.onStateCb?.('listening');
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.interrupted) {
              console.log('Interrupted');
              this.onInterruptedCb?.();
              this.onStateCb?.('listening');
            }
            
            if (message.serverContent?.modelTurn) {
              const parts = message.serverContent.modelTurn.parts;
              for (const part of parts) {
                if (part.inlineData && part.inlineData.data) {
                  this.onStateCb?.('speaking');
                  this.onAudioCb?.(part.inlineData.data);
                }
              }
            }
            
            if (message.serverContent?.turnComplete) {
              console.log('Turn complete');
              this.onStateCb?.('listening');
            }
          },
          onerror: (error: any) => {
            console.error('Live API error', error);
            this.onStateCb?.('disconnected', 'Connection error');
            this.isConnected = false;
          },
          onclose: (event: any) => {
            console.log('Live API closed', event);
            this.onStateCb?.('disconnected', 'Connection closed');
            this.isConnected = false;
          }
        }
      });
    } catch (error: any) {
      console.error('Failed to connect to Live API', error);
      this.onStateCb?.('disconnected', `Failed to connect: ${error.message || 'Unknown error'}`);
    }
  }

  sendAudio(base64PcmChunk: string) {
    if (this.session && this.isConnected) {
      try {
        this.session.sendRealtimeInput({
          audio: {
            mimeType: "audio/pcm;rate=16000",
            data: base64PcmChunk
          }
        });
      } catch (error) {
        console.error('Error sending audio', error);
      }
    }
  }

  disconnect() {
    if (this.session) {
      try {
        // The SDK doesn't have a direct close method on the session object yet in some versions,
        // but we can try to close it or just let it garbage collect if it doesn't.
        if (typeof this.session.close === 'function') {
          this.session.close();
        }
      } catch (e) {
        console.error('Error disconnecting', e);
      }
      this.session = null;
      this.isConnected = false;
    }
  }

  onAudioReceived(cb: (base64Pcm: string) => void) {
    this.onAudioCb = cb;
  }

  onStateChange(cb: (state: 'connecting' | 'connected' | 'speaking' | 'listening' | 'disconnected', error?: string) => void) {
    this.onStateCb = cb;
  }

  onInterrupted(cb: () => void) {
    this.onInterruptedCb = cb;
  }
}
