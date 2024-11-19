import React from "react";

function AddButtonIcon({ props }: { props?: React.SVGProps<SVGSVGElement> }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <title />
        <g id="Complete">
          <g data-name="add" id="add-2">
            <g>
              <line
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                x1={12}
                x2={12}
                y1={19}
                y2={5}
              />
              <line
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                x1={5}
                x2={19}
                y1={12}
                y2={12}
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default AddButtonIcon;
