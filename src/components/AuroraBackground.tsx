export default function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="animate-aurora-a absolute -top-[20%] -left-[10%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.22),transparent_62%)] blur-3xl" />
      <div className="animate-aurora-b absolute top-[10%] -right-[15%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.16),transparent_60%)] blur-3xl" />
      <div className="animate-aurora-c absolute -bottom-[25%] left-[15%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.13),transparent_60%)] blur-3xl" />
      <div className="absolute top-[30%] left-[40%] h-[30vmax] w-[30vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.07),transparent_60%)] blur-3xl" />
    </div>
  );
}
