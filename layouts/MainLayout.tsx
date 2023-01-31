import Link from "next/link";
import { Children, ReactNode } from "react";
import styles from "../styles/MainLayout.module.css";

interface LayoutProps {
  className?: string
  children: ReactNode 
}

export default function MainLayout({className, children}: LayoutProps) {
  return (
    <div className={className}>
      <nav className={styles.navigation}>
        <Link href={"/"}>Home</Link>
        <Link href={"/about"}>About</Link>
        <Link href={"/posts"}>Posts</Link>
      </nav>
      <main className={styles.main}>
        {Children.map( children, (child) => child)}
      </main>
    </div>
  );
}
