import styles from "./Button.module.css";

export const Button = ({ title, color, icon, action, disableButton, type }) => {
  return (
    <button
      type={type}
      onClick={action}
      className={styles[color]}
      disabled={disableButton}
    >
      {icon && icon}
      {title}
    </button>
  );
};
