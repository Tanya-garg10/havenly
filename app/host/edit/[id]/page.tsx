'use client';

import { use, useEffect, useState } from 'react';
import { PropertyWizard } from '@/components/PropertyWizard';
import { useRouter } from 'next/navigation';
import { getStoredProperties, saveStoredProperty } from '@/lib/properties';
import { Property } from '@/lib/dummy-data';
import { Navbar } from '@/components/Navbar';

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allProps = getStoredProperties();
    const found = allProps.find((p) => p.id === id);
    if (found) {
      setProperty(found);
    }
    setLoading(false);
  }, [id]);

  const handleSave = (propertyData: Partial<Property>) => {
    if (!property) return;
    const updatedProperty: Property = {
      ...property,
      ...propertyData,
    };
    saveStoredProperty(updatedProperty);
    router.push('/host');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <h1 className="text-2xl font-bold text-foreground">Property not found</h1>
        </div>
      </div>
    );
  }

  return (
    <PropertyWizard
      mode="edit"
      initialProperty={property}
      onSave={handleSave}
      onCancel={() => router.push('/host')}
    />
  );
}
