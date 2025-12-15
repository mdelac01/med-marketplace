export interface Product {
    id: string;
    title: string;
    price: number;
    condition: 'New' | 'Used' | 'Refurbished';
    category: string;
    imageUrl: string;
    description: string;
    specs: {
        manufacturer: string;
        year: number;
        warranty: string;
    };
}

export const products: Product[] = [
    {
        id: '1',
        title: 'GE Voluson E8 Ultrasound System',
        price: 25000,
        condition: 'Refurbished',
        category: 'Imaging',
        imageUrl: 'https://placehold.co/600x400?text=Ultrasound+System',
        description: 'High-end ultrasound system designed for women\'s health applications. Features advanced 4D imaging capabilities.',
        specs: {
            manufacturer: 'GE Healthcare',
            year: 2019,
            warranty: '1 Year'
        }
    },
    {
        id: '2',
        title: 'Drager Fabius GS Anesthesia Machine',
        price: 12500,
        condition: 'Used',
        category: 'Anesthesia',
        imageUrl: 'https://placehold.co/600x400?text=Anesthesia+Machine',
        description: 'Reliable anesthesia workstation with ventilated breathing system and electronic gas flow measurement.',
        specs: {
            manufacturer: 'Drager',
            year: 2018,
            warranty: '6 Months'
        }
    },
    {
        id: '3',
        title: 'Stryker 1588 AIM Camera System',
        price: 8900,
        condition: 'Refurbished',
        category: 'Surgical',
        imageUrl: 'https://placehold.co/600x400?text=Camera+System',
        description: 'Advanced Imaging Modality (AIM) platform designed to improve patient outcomes with premium optics.',
        specs: {
            manufacturer: 'Stryker',
            year: 2020,
            warranty: '1 Year'
        }
    },
    {
        id: '4',
        title: 'Philips PageWriter TC70 ECG',
        price: 3200,
        condition: 'New',
        category: 'Diagnostics',
        imageUrl: 'https://placehold.co/600x400?text=ECG+Machine',
        description: 'State-of-the-art cardiograph with automated workflow and clinical decision support tools.',
        specs: {
            manufacturer: 'Philips',
            year: 2023,
            warranty: '3 Years'
        }
    },
    {
        id: '5',
        title: 'Midmark 630 Barrier-Free Table',
        price: 4500,
        condition: 'Used',
        category: 'Furniture',
        imageUrl: 'https://placehold.co/600x400?text=Exam+Table',
        description: 'Power procedure table designed for patient comfort and efficient workflow in clinical settings.',
        specs: {
            manufacturer: 'Midmark',
            year: 2017,
            warranty: '30 Days'
        }
    },
    {
        id: '6',
        title: 'Welch Allyn Connex Spot Monitor',
        price: 1800,
        condition: 'New',
        category: 'Diagnostics',
        imageUrl: 'https://placehold.co/600x400?text=Vital+Signs',
        description: 'Accurate, reliable vital signs measurement with touchscreen interface and EMR connectivity.',
        specs: {
            manufacturer: 'Welch Allyn',
            year: 2023,
            warranty: '2 Years'
        }
    }
];
