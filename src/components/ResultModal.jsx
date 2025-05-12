import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from 'react-dom'

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset},
  ref
) {
  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
  
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} onClose={onReset} className="result-modal">
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        The stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      {/* Clicking the button on the form triggers form submission by default therein calling onSubmit on the form. Doesn't need any wiring. */}
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModal;
