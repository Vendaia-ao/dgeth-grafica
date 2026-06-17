/**
 * gsapAnimations.ts
 * Funções reutilizáveis para os 5 efeitos GSAP especificados.
 * Importar e chamar dentro do hook useGSAP (dentro de gsap.context).
 */

import { gsap, ScrollTrigger, SplitText } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, SplitText);

// ─── Efeito 1: "Corte de lâmina" — clip-path reveal por linha ───────────────
// Aplica-se a h1/h2 principais de cada secção.
export function animateTitleReveal(el: Element | null) {
  if (!el) return;

  const split = new SplitText(el, {
    type: 'lines',
    linesClass: 'line-wrapper',
  });

  gsap.set('.line-wrapper', { overflow: 'hidden' });
  gsap.from(split.lines, {
    clipPath: 'inset(0 100% 0 0)',
    duration: 0.9,
    stagger: 0.12,
    ease: 'power4.inOut',
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      once: true,
    },
    onComplete: () => {
      // Limpar will-change após animação
      split.lines.forEach((line) => {
        (line as HTMLElement).style.willChange = 'auto';
      });
    },
  });

  // Adicionar will-change apenas nos elementos a animar
  split.lines.forEach((line) => {
    (line as HTMLElement).style.willChange = 'clip-path';
  });
}

// ─── Efeito 2: "Sobreposição de camadas" — card overlay reveal ──────────────
// Aplica-se a .service-card e .portfolio-card com um elemento .card-overlay interno.
export function animateCardReveal(selector: string) {
  gsap.utils.toArray<HTMLElement>(selector).forEach((card) => {
    const overlay = card.querySelector<HTMLElement>('.card-overlay');
    const content = card.querySelector<HTMLElement>('.card-content');
    if (!overlay) return;

    (overlay as HTMLElement).style.willChange = 'transform';

    gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        once: true,
        onLeave: () => {
          (overlay as HTMLElement).style.willChange = 'auto';
        },
      },
    })
      .set(overlay, { scaleX: 1, transformOrigin: 'left' })
      .from(content ?? card, { opacity: 0, duration: 0.3 })
      .to(
        overlay,
        {
          scaleX: 0,
          transformOrigin: 'right',
          duration: 0.7,
          ease: 'power3.inOut',
        },
        0.1
      );
  });
}

// ─── Efeito 5: "Contagem com corte de número" — stat counter ────────────────
// Aplica-se a .stat-number dentro de .stat-card com data-value="<número>".
export function animateStatCounters() {
  gsap.utils.toArray<HTMLElement>('.stat-number').forEach((el) => {
    const finalValue = parseInt(el.dataset.value ?? '0', 10);
    const wrapper = el.closest<HTMLElement>('.stat-card');
    if (!wrapper) return;

    (wrapper as HTMLElement).style.willChange = 'clip-path';

    gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top 85%',
        once: true,
        onLeave: () => {
          (wrapper as HTMLElement).style.willChange = 'auto';
        },
      },
    })
      .from(wrapper, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.5,
        ease: 'power3.out',
      })
      .to(
        el,
        {
          textContent: finalValue,
          duration: 1.2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          modifiers: {
            textContent: (value: string) =>
              Math.ceil(Number(value)).toLocaleString('pt-PT'),
          },
        },
        0.2
      );
  });
}
