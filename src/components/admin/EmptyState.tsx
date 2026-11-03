import React from "react";

function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
      <div className="mb-2 rounded-full bg-primary/10 p-3 text-primary">{icon}</div>
      <p className="font-medium">{title}</p>
      <p className="max-w-sm text-sm text-base-content/60">{description}</p>
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

export default EmptyState;
