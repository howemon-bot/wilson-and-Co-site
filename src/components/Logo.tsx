// The Wilson & Co wordmark. It takes the text colour, so the same file
// works in teal on light backgrounds and in white over photographs.
export function Logo({ className }: { className?: string }) {
  return <span className={className ? `mark ${className}` : 'mark'} role="img" aria-label="Wilson & Co." />;
}
