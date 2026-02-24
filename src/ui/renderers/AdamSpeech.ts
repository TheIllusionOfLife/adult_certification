import { DOMManager } from './DOMManager';

export class AdamSpeech {
    private typewriterTimerId: ReturnType<typeof setTimeout> | null = null;
    private typewriterResolve: (() => void) | null = null;
    private shownFor = new Set<string>();

    constructor(private dom: DOMManager) {}

    show(lines: string[], onDismiss: () => void): void {
        const d = this.dom.elements;
        const text = lines.filter(l => l.length > 0).join('\n');
        d.adamSpeechScreen.style.display = 'flex';
        d.adamSpeechBtn.disabled = true;
        d.adamSpeechBtn.style.opacity = '0.5';

        this.typewriterEffect(d.adamSpeechText, text, 25).then(() => {
            d.adamSpeechBtn.disabled = false;
            d.adamSpeechBtn.style.opacity = '1';
        });

        // Allow click to skip typewriter
        const skipHandler = () => {
            if (this.typewriterTimerId !== null) {
                this.cancelTypewriter();
                d.adamSpeechText.textContent = text;
                d.adamSpeechBtn.disabled = false;
                d.adamSpeechBtn.style.opacity = '1';
            }
        };
        d.adamSpeechScreen.onclick = (e) => {
            if (e.target === d.adamSpeechBtn) return;
            skipHandler();
        };

        d.adamSpeechBtn.onclick = () => {
            d.adamSpeechScreen.onclick = null;
            d.adamSpeechScreen.style.display = 'none';
            this.cancelTypewriter();
            onDismiss();
        };
    }

    hasShownFor(key: string): boolean {
        return this.shownFor.has(key);
    }

    markShown(key: string): void {
        this.shownFor.add(key);
    }

    private typewriterEffect(element: HTMLElement, text: string, speed = 30): Promise<void> {
        return new Promise((resolve) => {
            this.cancelTypewriter();
            this.typewriterResolve = resolve;
            element.textContent = '';
            let i = 0;
            const tick = () => {
                if (i < text.length) {
                    element.textContent += text[i];
                    i++;
                    element.scrollTop = element.scrollHeight;
                    this.typewriterTimerId = setTimeout(tick, speed);
                } else {
                    this.typewriterTimerId = null;
                    this.typewriterResolve = null;
                    resolve();
                }
            };
            tick();
        });
    }

    private cancelTypewriter(): void {
        if (this.typewriterTimerId !== null) {
            clearTimeout(this.typewriterTimerId);
            this.typewriterTimerId = null;
        }
        if (this.typewriterResolve) {
            this.typewriterResolve();
            this.typewriterResolve = null;
        }
    }
}
