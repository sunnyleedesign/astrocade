export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={`flex items-center justify-center gap-4 text-[12px] font-semibold tracking-[-0.025em] text-white ${className}`}>
      <span>Copyright</span>
      <img src="/img/shared/symbol-footer.svg" alt="Astrocade" className="h-8 w-[33.3px]" />
      <span>©2026</span>
    </footer>
  );
}
