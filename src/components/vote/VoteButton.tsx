interface VoteButtonProps {
  disabled?: boolean;
  onClick: () => void;
}

export default function VoteButton({
  disabled,
  onClick,
}: VoteButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="w-full rounded-xl bg-black py-3 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Vote
    </button>
  );
}