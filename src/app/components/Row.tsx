import React from 'react';

export interface RowProps {
  label: string;
  children: React.ReactNode
}

export default function Row(props: RowProps) {
  return (
    <div className="row">
      <h1>{props.label}</h1>
      <p>{props.children}</p>
    </div>
  );
}