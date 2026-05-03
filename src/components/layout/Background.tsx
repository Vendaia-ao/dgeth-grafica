const Background = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden -z-50 bg-background">
      {/* Paper Texture Overlay - Visible and Noticeable */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Secondary Paper Grain */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grainFilter'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grainFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '150px 150px',
        }}
      />

      {/* Subtle Fiber Lines */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 0%, hsl(var(--foreground)) 50%, transparent 100%),
            linear-gradient(0deg, transparent 0%, hsl(var(--foreground)) 50%, transparent 100%)
          `,
          backgroundSize: '300px 1px, 1px 300px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Radial Glow (Top Right) - Softer */}
      <div
        className="absolute top-0 right-0 w-[60vw] h-[50vh] opacity-20 blur-[120px] rounded-full bg-ns-cyan animate-pulse-slow"
      />

      {/* Radial Glow (Bottom Left) - Softer */}
      <div
        className="absolute bottom-0 left-0 w-[40vw] h-[40vh] opacity-15 blur-[140px] rounded-full bg-ns-blue animate-float-random"
      />

      {/* Yellow Accent - Softer */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25vw] h-[25vw] opacity-[0.08] blur-[170px] rounded-full bg-ns-yellow"
      />

      {/* Grid Pattern Overlay - More Visible */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
};

export default Background;
