import React from "react";

export default function Toast({ message, setToastFunction }) {
  return (
    <div
      className="alert alert-success alert-dismissible fade show"
      role="alert"
      style={{ maxWidth: "350px" }}
    >
      <strong>{message}</strong>
      <button
        type="button"
        class="close"
        onClick={() => {
          setToastFunction(false);
        }}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
