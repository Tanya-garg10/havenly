'use client';

import { Map } from 'lucide-react';

export default function MapPlaceholder() {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center bg-muted/30 overflow-hidden border border-border rounded-2xl">
      {/* Decorative Grid Lines to Mimic a Map */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      {/* Abstract river mimic */}
      <div className="absolute top-1/4 -left-10 w-[120%] h-12 bg-primary/5 rounded-full blur-xl rotate-12 pointer-events-none" />
      
      {/* Abstract green parks mimic */}
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Floating markers mimic */}
      <div className="absolute top-1/3 left-1/4 h-8 w-16 bg-muted border border-border shadow-sm rounded-full animate-pulse flex items-center justify-center text-[10px] text-muted-foreground font-bold">$...</div>
      <div className="absolute bottom-1/3 right-1/4 h-8 w-16 bg-muted border border-border shadow-sm rounded-full animate-pulse flex items-center justify-center text-[10px] text-muted-foreground font-bold">$...</div>
      <div className="absolute top-1/2 right-1/3 h-8 w-16 bg-muted border border-border shadow-sm rounded-full animate-pulse flex items-center justify-center text-[10px] text-muted-foreground font-bold">$...</div>

      {/* Center content */}
      <div className="relative flex flex-col items-center gap-4 text-center px-6 max-w-sm">
        <div className="h-16 w-16 rounded-full bg-background border border-border flex items-center justify-center shadow-lg text-primary animate-bounce">
          <Map size={32} />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-foreground">Interactive Map View</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Loading geographical listings and nearby areas...
          </p>
        </div>
        <div className="flex gap-1.5 mt-2">
          <span className="h-2 w-2 rounded-full bg-primary/40 animate-ping"></span>
          <span className="h-2 w-2 rounded-full bg-primary/60 animate-ping [animation-delay:0.2s]"></span>
          <span className="h-2 w-2 rounded-full bg-primary/80 animate-ping [animation-delay:0.4s]"></span>
        </div>
      </div>
    </div>
  );
}
