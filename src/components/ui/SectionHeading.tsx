'use client';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  badge,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl mb-12 lg:mb-16 ${alignClass}`}>
      {badge && (
        <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber bg-amber/10 border border-amber/20 rounded-full">
          {badge}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-text-heading sm:text-4xl lg:text-5xl leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-text-muted sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
