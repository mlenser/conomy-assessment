import styles from './Button.module.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const Button = ({ children, ...htmlAttributes }: ButtonProps) => (
  <button className={styles.button} {...htmlAttributes}>
    {children}
  </button>
);
