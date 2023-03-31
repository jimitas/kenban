import styles from "src/components/Layout/layout.module.css";

export function Layout({ children, title }) {
  return (
    <div className="body">
      <main className={styles.main}>
        <div className={styles.mainTitle}>{title}</div>
        <div>{children}</div>
      </main>
    </div>
  );
}
