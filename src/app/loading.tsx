import PacManLoader from "@/components/ui/PacManLoader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary gap-6">
      <PacManLoader size="lg" />
      <p className="text-sm font-mono text-text-muted animate-pulse">
        Loading the maze...
      </p>
    </div>
  );
}
