'use client';

import { PropertyWizard } from '@/components/PropertyWizard';
import { useRouter } from 'next/navigation';
import { saveStoredProperty } from '@/lib/properties';
import { Property } from '@/lib/dummy-data';

export default function AddPropertyPage() {
  const router = useRouter();

  const handleSave = (propertyData: any) => {
    const newProperty: Property = {
      ...propertyData,
      id: `prop-${Date.now()}`,
      hostId: 'host-1', // Mock current host
      rating: 5.0,
      reviewCount: 0,
      createdAt: new Date(),
    };
    saveStoredProperty(newProperty);
    router.push('/host');
  };

  return (
    <PropertyWizard
      mode="create"
      onSave={handleSave}
      onCancel={() => router.push('/host')}
    />
  );
}
