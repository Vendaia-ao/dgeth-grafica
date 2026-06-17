import { useEffect, useRef, type DependencyList } from 'react';
import { gsap } from 'gsap/all';

/**
 * Hook que envolve useEffect com gsap.context() para cleanup correcto
 * e prevenção de re-disparo duplicado em React StrictMode.
 *
 * @param animationFn   função que recebe o gsap.context e define as animações
 * @param deps          dependências do useEffect (default: [])
 * @param containerRef  ref opcional ao elemento container; se omitido usa document
 */
const useGSAP = (
  animationFn: (context: gsap.Context) => void,
  deps: DependencyList = [],
  containerRef?: React.RefObject<Element | null>
) => {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    // Respeitar prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context((self) => {
      animationFn(self);
    }, containerRef?.current ?? document.documentElement);

    ctxRef.current = ctx;

    return () => {
      ctx.revert(); // limpar todas as animações ao desmontar
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ctxRef;
};

export default useGSAP;
