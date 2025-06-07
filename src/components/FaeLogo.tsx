import { cn } from "@/lib/utils";

interface FaeLogoProps {
  className?: string;
  isFooter?: boolean;
}

export function FaeLogo({ className, isFooter = false }: FaeLogoProps) {
  const textColorClass = isFooter ? "text-muted-foreground" : "text-foreground";
  const accentColorClass = isFooter ? "text-muted-foreground" : "text-accent";
  return (
    <div className={cn("font-headline text-2xl font-bold", textColorClass, className)}>
      Fae<span className={accentColorClass}>Intelligence</span>Reborn
    </div>
  );
}
