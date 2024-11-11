import React from "react";

function FolderIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill="#1b2c5a"
        d="M0 1h5l3 2h5v2H3.746L2.03 11h2.08l1.143-4H16l-2 7H0V1z"
      />
    </svg>
  );
}

export default FolderIcon;
