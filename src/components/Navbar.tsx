import Link from 'next/link';
import styles from './Navbar.module.css';
import Button from './Button';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.inner}`}>
                <Link href="/" className={styles.logo}>
                    Med<span>Market</span>
                </Link>

                <div className={styles.links}>
                    <Link href="/search" className={styles.link}>Buy Equipment</Link>
                    <Link href="/sell" className={styles.link}>Sell Equipment</Link>
                    <Link href="/community" className={styles.link}>Community</Link>
                </div>

                <div className={styles.actions}>
                    <Button variant="outline" size="small">Log In</Button>
                    <Button variant="primary" size="small">Post Item</Button>
                </div>
            </div>
        </nav>
    );
}
