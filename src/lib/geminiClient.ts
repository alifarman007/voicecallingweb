import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

export class GeminiLiveClient {
  private ai: GoogleGenAI;
  private model: string;
  private session: any = null;
  private onAudioCb: ((base64Pcm: string) => void) | null = null;
  private onStateCb: ((state: 'connecting' | 'connected' | 'speaking' | 'listening' | 'disconnected', error?: string) => void) | null = null;
  private onInterruptedCb: (() => void) | null = null;
  private isConnected: boolean = false;

  // `token` is a short-lived ephemeral token from /api/gemini-token, not the
  // long-lived GEMINI_API_KEY. `apiVersion: 'v1alpha'` is required for tokens.
  constructor(token: string, model: string) {
    this.ai = new GoogleGenAI({
      apiKey: token,
      httpOptions: { apiVersion: 'v1alpha' },
    });
    this.model = model;
  }

  async connect(systemPrompt: string) {
    this.onStateCb?.('connecting');
    this.isConnected = false;

    try {
      this.session = await this.ai.live.connect({
        model: this.model,
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
            const msg = error?.message || error?.reason || 'Connection error';
            this.onStateCb?.('disconnected', msg);
            this.isConnected = false;
          },
          onclose: (event: any) => {
            console.log('Live API closed', event);
            // Surface Google's close reason (e.g. model/voice errors) to the UI
            const reason = event?.reason
              ? `${event.reason} (code ${event.code})`
              : 'Connection closed';
            this.onStateCb?.('disconnected', reason);
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
    if (!this.session || !this.isConnected) return;
    try {
      this.session.sendRealtimeInput({
        audio: {
          mimeType: "audio/pcm;rate=16000",
          data: base64PcmChunk
        }
      });
    } catch {
      // Expected during teardown: an in-flight audio frame may race with the
      // WS transitioning to CLOSING. Swallow silently — the next isConnected
      // check will gate further sends.
    }
  }

  disconnect() {
    if (!this.session) return;
    // Flip state BEFORE close() so any in-flight sendAudio in the same tick
    // skips early (otherwise the browser warns about sending on a CLOSING WS).
    this.isConnected = false;
    const session = this.session;
    this.session = null;
    try {
      if (typeof session.close === 'function') {
        session.close();
      }
    } catch (e) {
      console.error('Error disconnecting', e);
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
