import styles from "./Button.module.scss";

interface Props {
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: "Primary" | "Secondary";
  size?: "Large" | "Medium" | "Small";
  className?: string;
}

function Button({
  onClick,
  children,
  variant = "Primary",
  size = "Medium",
  className = "",
}: Props) {
  return (
    <button
      onClick={onClick}
      className={styles[`button${variant}`] + " " + styles[`size${size}`] + " " + `${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
