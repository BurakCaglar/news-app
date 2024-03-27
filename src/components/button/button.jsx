import React, { useState } from "react";

/* Style */
import "./button.scss";

const Button = (_props) => {
  const {
    type = "primary",
    size = "medium",
    backgroundColor,
    label,
    className,
    onClick,
    icon,
    isActive,
    ...props
  } = _props;

  function handleOnClick() {
    onClick();
  }

  const mode = !isActive ? "button--primary" : "button--secondary";

  return (
    <button
      type="button"
      className={[
        "button",
        `button--${type}`,
        `button--${size}`,
        mode,
        className,
      ].join(" ")}
      onClick={handleOnClick}
      {...props}
    >
      <span className="flex items-center justify-center">
        {icon && <span className="button-icon">{icon}</span>}
        <span className="capitalize">{label}</span>
      </span>
    </button>
  );
};

export default Button;
