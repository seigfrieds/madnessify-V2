import styles from "./Button.module.scss";
import { Button } from "@base-ui/react";

interface Props {
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: "Primary" | "Secondary";
  size?: "Large" | "Medium" | "Small";
  className?: string;
}

function MadnessifyButton({
  onClick,
  children,
  variant = "Primary",
  size = "Medium",
  className = "",
}: Props) {
  return (
    <Button
      onClick={onClick}
      className={styles[`button${variant}`] + " " + styles[`size${size}`] + " " + `${className}`}
    >
      {children}
    </Button>
  );
}

export default MadnessifyButton;
