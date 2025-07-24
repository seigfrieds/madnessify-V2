import "./Button.scss";

interface Props {
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "large" | "medium" | "small";
  className?: string;
}

function Button({
  onClick,
  children,
  variant = "primary",
  size = "medium",
  className = "",
}: Props) {
  return (
    <button onClick={onClick} className={`button-${variant} size-${size} ${className}`}>
      {children}
    </button>
  );
}

export default Button;
