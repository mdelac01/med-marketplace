import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.css';

interface Product {
    id: string;
    title: string;
    price: number;
    condition: 'New' | 'Used' | 'Refurbished';
    category: string;
    imageUrl: string;
}

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/products/${product.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className={styles.image}
                />
            </div>
            <div className={styles.content}>
                <span className={styles.category}>{product.category}</span>
                <h3 className={styles.title}>{product.title}</h3>
                <div className={styles.meta}>
                    <span className={styles.price}>${product.price.toLocaleString()}</span>
                    <span className={styles.condition}>{product.condition}</span>
                </div>
            </div>
        </Link>
    );
}
