"use client";

import Link from 'next/link';
import Navbar from '../components/Navbar';
import FeaturedListings from '../components/FeaturedListings';
import Button from '../components/Button';
import styles from './page.module.css';

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>
            Medical Equipment Marketplace
            <br />
            Made Simple
          </h1>
          <p className={styles.heroSubtitle}>
            The trusted marketplace for healthcare professionals to buy and sell premium new and refurbished medical equipment.
          </p>

          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search for equipment (e.g., Ultrasound, MRI...)"
              className={styles.searchInput}
            />
            <Link href="/search">
              <Button size="default">Search</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Listings (Client Component) */}
      <FeaturedListings />

      {/* Features / Trust Section */}
      <section className={`section ${styles.features}`}>
        <div className="container">
          <div className={styles.featureGrid}>
            <div>
              <div className={styles.featureIcon}>✓</div>
              <h3 className={styles.featureTitle}>Verified Sellers</h3>
              <p className={styles.featureText}>Every seller is vetted to ensure safe transactions and authentic equipment.</p>
            </div>
            <div>
              <div className={styles.featureIcon}>$</div>
              <h3 className={styles.featureTitle}>Fair Pricing</h3>
              <p className={styles.featureText}>Transparent pricing on new and refurbished equipment from top manufacturers.</p>
            </div>
            <div>
              <div className={styles.featureIcon}>♥</div>
              <h3 className={styles.featureTitle}>Community Trust</h3>
              <p className={styles.featureText}>Join thousands of medical professionals trusting our platform daily.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
