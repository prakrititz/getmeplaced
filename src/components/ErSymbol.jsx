import React from 'react';

export function ErSymbol({ type }) {
  const commonClasses = "w-16 h-12 stroke-rose-400 fill-slate-900 stroke-2 drop-shadow-md";
  switch(type) {
    case "Rectangle":
      return (
        <svg viewBox="0 0 100 60" className={commonClasses}>
          <rect x="5" y="5" width="90" height="50" />
        </svg>
      );
    case "Double Rectangle":
      return (
        <svg viewBox="0 0 100 60" className={commonClasses}>
          <rect x="5" y="5" width="90" height="50" />
          <rect x="12" y="12" width="76" height="36" />
        </svg>
      );
    case "Oval":
      return (
        <svg viewBox="0 0 100 60" className={commonClasses}>
          <ellipse cx="50" cy="30" rx="45" ry="25" />
        </svg>
      );
    case "Double Oval":
      return (
        <svg viewBox="0 0 100 60" className={commonClasses}>
          <ellipse cx="50" cy="30" rx="45" ry="25" />
          <ellipse cx="50" cy="30" rx="38" ry="18" />
        </svg>
      );
    case "Oval with underline":
      return (
        <svg viewBox="0 0 100 60" className={commonClasses}>
          <ellipse cx="50" cy="30" rx="45" ry="25" />
          <line x1="30" y1="35" x2="70" y2="35" />
        </svg>
      );
    case "Oval with dashed underline":
      return (
        <svg viewBox="0 0 100 60" className={commonClasses}>
          <ellipse cx="50" cy="30" rx="45" ry="25" />
          <line x1="30" y1="35" x2="70" y2="35" strokeDasharray="4,4" />
        </svg>
      );
    case "Dashed Oval":
      return (
        <svg viewBox="0 0 100 60" className={commonClasses} strokeDasharray="5,5">
          <ellipse cx="50" cy="30" rx="45" ry="25" />
        </svg>
      );
    case "Diamond":
      return (
        <svg viewBox="0 0 100 60" className={commonClasses}>
          <polygon points="50,5 95,30 50,55 5,30" strokeLinejoin="round" />
        </svg>
      );
    case "Double Diamond":
      return (
        <svg viewBox="0 0 100 60" className={commonClasses}>
          <polygon points="50,5 95,30 50,55 5,30" strokeLinejoin="round" />
          <polygon points="50,13 83,30 50,47 17,30" strokeLinejoin="round" />
        </svg>
      );
    case "Double Line":
      return (
        <svg viewBox="0 0 100 60" className={commonClasses}>
          <line x1="5" y1="25" x2="95" y2="25" />
          <line x1="5" y1="35" x2="95" y2="35" />
        </svg>
      );
    default:
      return null;
  }
}

