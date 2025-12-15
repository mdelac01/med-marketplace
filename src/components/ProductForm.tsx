"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';
import styles from '../app/dashboard/add/page.module.css';

interface ProductFormProps {
    initialData?: {
        title: string;
        price: string;
        category: string;
        condition: string;
        description: string;
        manufacturer: string;
        year: string;
        warranty: string;
        imageUrl?: string;
    };
    onSubmit: (formData: FormData) => Promise<void>;
    submitLabel: string;
    onCancel: () => void;
}

export default function ProductForm({ initialData, onSubmit, submitLabel, onCancel }: ProductFormProps) {
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: 'Imaging',
        condition: 'Used',
        description: '',
        manufacturer: '',
        year: '',
        warranty: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                price: initialData.price || '',
                category: initialData.category || 'Imaging',
                condition: initialData.condition || 'Used',
                description: initialData.description || '',
                manufacturer: initialData.manufacturer || '',
                year: initialData.year || '',
                warranty: initialData.warranty || '',
            });
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Create FormData object
        const data = new FormData();
        data.append('title', formData.title);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('condition', formData.condition);
        data.append('description', formData.description);
        data.append('manufacturer', formData.manufacturer);
        data.append('year', formData.year);
        data.append('warranty', formData.warranty);

        if (imageFile) {
            data.append('image', imageFile);
        }

        await onSubmit(data);
        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Product Image</label>
                {initialData?.imageUrl && !imageFile && (
                    <div style={{ marginBottom: '1rem' }}>
                        <img src={initialData.imageUrl} alt="Current" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                        <p style={{ fontSize: '0.8rem', color: '#666' }}>Current Image</p>
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={styles.input}
                />
                <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                    Upload a clear image of the equipment.
                </p>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Product Title</label>
                <input
                    required
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="e.g. Philips Ultrasound System"
                />
            </div>

            <div className={styles.row}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Price ($)</label>
                    <input
                        required
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="0.00"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={styles.input}
                    >
                        <option>Imaging</option>
                        <option>Surgical</option>
                        <option>Diagnostics</option>
                        <option>Anesthesia</option>
                        <option>Furniture</option>
                    </select>
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Condition</label>
                    <select
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        className={styles.input}
                    >
                        <option>New</option>
                        <option>Used</option>
                        <option>Refurbished</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Manufacturer</label>
                    <input
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Year</label>
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="e.g. 2020"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Warranty</label>
                    <input
                        name="warranty"
                        value={formData.warranty}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="e.g. 1 Year"
                    />
                </div>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Description</label>
                <textarea
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={styles.input}
                    rows={5}
                />
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : submitLabel}
                </Button>
            </div>
        </form>
    );
}
