import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { writeFile } from 'fs/promises';

const productsFilePath = path.join(process.cwd(), 'src/data/products.json');
const uploadsDir = path.join(process.cwd(), 'public/uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

export async function GET() {
    try {
        const fileContents = fs.readFileSync(productsFilePath, 'utf8');
        const products = JSON.parse(fileContents);
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error reading products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        // Extract file
        const file = formData.get('image') as File | null;
        let imageUrl = '';

        if (file) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Create unique filename
            const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
            const filepath = path.join(uploadsDir, filename);

            await writeFile(filepath, buffer);
            imageUrl = `/uploads/${filename}`;
        } else {
            // Fallback or use placeholder if provided in JSON part (logic could vary)
            imageUrl = 'https://placehold.co/600x400?text=No+Image';
        }

        // Extract other fields
        const newProduct = {
            id: Math.random().toString(36).substr(2, 9),
            title: formData.get('title') as string,
            price: parseFloat(formData.get('price') as string),
            category: formData.get('category') as string,
            condition: formData.get('condition') as string,
            description: formData.get('description') as string,
            imageUrl: imageUrl,
            specs: {
                manufacturer: formData.get('manufacturer') as string,
                year: parseInt(formData.get('year') as string) || new Date().getFullYear(),
                warranty: formData.get('warranty') as string || 'None'
            }
        };

        // Read existing products
        const fileContents = fs.readFileSync(productsFilePath, 'utf8');
        const products = JSON.parse(fileContents);

        // Add new product
        products.unshift(newProduct);

        // Save back to file
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error('Error adding product:', error);
        return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const formData = await request.formData();
        const id = formData.get('id') as string;

        if (!id) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
        }

        // Read existing products
        const fileContents = fs.readFileSync(productsFilePath, 'utf8');
        let products = JSON.parse(fileContents);
        const productIndex = products.findIndex((p: any) => p.id === id);

        if (productIndex === -1) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        // Handle Image
        const file = formData.get('image') as File | null;
        let imageUrl = products[productIndex].imageUrl; // Default to existing image

        if (file && file.size > 0) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
            const filepath = path.join(uploadsDir, filename);

            await writeFile(filepath, buffer);
            imageUrl = `/uploads/${filename}`;
        }

        // Update fields
        const updatedProduct = {
            ...products[productIndex],
            title: formData.get('title') as string,
            price: parseFloat(formData.get('price') as string),
            category: formData.get('category') as string,
            condition: formData.get('condition') as string,
            description: formData.get('description') as string,
            imageUrl: imageUrl,
            specs: {
                manufacturer: formData.get('manufacturer') as string,
                year: parseInt(formData.get('year') as string) || new Date().getFullYear(),
                warranty: formData.get('warranty') as string || 'None'
            }
        };

        products[productIndex] = updatedProduct;

        // Save back to file
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}
