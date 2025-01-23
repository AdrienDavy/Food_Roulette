import React from "react";

type CheckboxProps = {
  sentence: string;
  checked: boolean;
  onToggle: () => void;
  isDisabled?: boolean;
  htmlForId: string;
};

const Checkbox: React.FC<CheckboxProps> = ({
  sentence,
  checked,
  onToggle,
  isDisabled = false,
  htmlForId,
}) => {
  return (
    <label
      className="relative text-secondary flex cursor-pointer items-center w-96"
      htmlFor={htmlForId}
    >
      <input
        disabled={isDisabled}
        onClick={onToggle}
        className="peer appearance-none"
        id={htmlForId}
        name="tick"
        type="checkbox"
        checked={checked}
        readOnly
      />
      <span className="absolute right-0 top-1/2 h-[2em] w-[2em] translate-x-full -translate-y-1/2 rounded-[0.25em] border-[2px] border-secondary"></span>
      <svg
        viewBox="0 0 69 89"
        className="absolute right-0 top-1/2 h-[2em] w-[2em] translate-x-full -translate-y-1/2 duration-300 ease-out [stroke-dasharray:100] [stroke-dashoffset:100] peer-checked:[stroke-dashoffset:0] text-green-400"
        fill="none"
        height="89"
        width="69"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M.93 63.984c3.436.556 7.168.347 10.147 2.45 4.521 3.19 10.198 8.458 13.647 12.596 1.374 1.65 4.181 5.922 5.598 8.048.267.4-1.31.823-1.4.35-5.744-30.636 9.258-59.906 29.743-81.18C62.29 2.486 63.104 1 68.113 1"
          strokeWidth="12px"
          stroke="currentColor"
          pathLength="100"
        ></path>
      </svg>
      <p className="text-[1em] font-bold [user-select:none] absolute left-0 top-1/2 transform -translate-y-1/2">
        {sentence}
      </p>
    </label>
  );
};

export default Checkbox;
