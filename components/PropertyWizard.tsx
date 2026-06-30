'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { categories, amenities, Property } from '@/lib/dummy-data';
import { ChevronLeft, ChevronRight, Upload, X } from 'lucide-react';
import {
  Wifi,
  UtensilsCrossed,
  Wind,
  Waves,
  ParkingCircle,
  Droplet,
  Flame,
  Tv,
  Laptop,
  PawPrint,
  Flower,
} from 'lucide-react';

const amenityIconMap: Record<string, React.ReactNode> = {
  wifi: <Wifi size={20} />,
  kitchen: <UtensilsCrossed size={20} />,
  ac: <Wind size={20} />,
  pool: <Waves size={20} />,
  parking: <ParkingCircle size={20} />,
  washer: <Droplet size={20} />,
  dryer: <Wind size={20} />,
  heating: <Flame size={20} />,
  tv: <Tv size={20} />,
  workspace: <Laptop size={20} />,
  pets: <PawPrint size={20} />,
  garden: <Flower size={20} />,
};

type Step = 'basic' | 'images' | 'pricing' | 'amenities' | 'review';

interface PropertyWizardProps {
  mode: 'create' | 'edit';
  initialProperty?: Property;
  onSave: (propertyData: any) => void;
  onCancel: () => void;
}

export function PropertyWizard({
  mode,
  initialProperty,
  onSave,
  onCancel,
}: PropertyWizardProps) {
  const [currentStep, setCurrentStep] = useState<Step>('basic');
  const [uploadedImages, setUploadedImages] = useState<string[]>(
    initialProperty?.images || []
  );
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    initialProperty?.amenities || []
  );

  const [formData, setFormData] = useState({
    title: initialProperty?.title || '',
    description: initialProperty?.description || '',
    category: initialProperty?.category || '',
    type: initialProperty?.type || 'Entire Place',
    guests: initialProperty?.capacity.guests || 1,
    bedrooms: initialProperty?.capacity.bedrooms || 1,
    beds: initialProperty?.capacity.beds || 1,
    bathrooms: initialProperty?.capacity.bathrooms || 1,
    pricePerNight: initialProperty?.pricePerNight.toString() || '',
    city: initialProperty?.location.city || '',
    state: initialProperty?.location.state || '',
  });

  const steps: { id: Step; label: string }[] = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'images', label: 'Images' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'review', label: 'Review' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id);
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImages((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePublishOrSave = () => {
    if (!formData.title || !formData.pricePerNight || !formData.city || !formData.state) {
      alert("Please fill in all required fields (Title, Price, City, State)");
      return;
    }

    const propertyData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      type: formData.type as 'Entire Place' | 'Room' | 'Shared Room',
      capacity: {
        guests: formData.guests,
        bedrooms: formData.bedrooms,
        beds: formData.beds,
        bathrooms: formData.bathrooms,
      },
      location: {
        city: formData.city,
        state: formData.state,
        country: initialProperty?.location.country || 'United States',
        coordinates: initialProperty?.location.coordinates || { lat: 37.7749, lng: -122.4194 },
      },
      pricePerNight: parseFloat(formData.pricePerNight) || 0,
      images: uploadedImages,
      image: uploadedImages[0] || '/assets/unsplash/unsplash-9a746e442094.jpg',
      amenities: selectedAmenities,
    };

    onSave(propertyData);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {mode === 'create' ? 'Add a New Property' : 'Edit Property Details'}
            </h1>
            <p className="text-muted-foreground">
              Step {currentStepIndex + 1} of {steps.length}
            </p>
          </div>
          <Button variant="ghost" onClick={onCancel} className="text-muted-foreground hover:text-foreground">
            Cancel
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="relative h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{
                width: `${((currentStepIndex + 1) / steps.length) * 100}%`,
              }}
            />
          </div>
          <div className="mt-4 flex justify-between text-xs font-medium text-muted-foreground">
            {steps.map((step) => (
              <span
                key={step.id}
                className={
                  currentStep === step.id ? 'text-primary font-semibold' : ''
                }
              >
                {step.label}
              </span>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card className="p-8 border-border mb-8">
          {/* Step 1: Basic Info */}
          {currentStep === 'basic' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Property Title *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Sunny Beachfront Villa"
                  className="h-10"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe your property..."
                  rows={4}
                  className="w-full rounded-lg border border-border px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full rounded-lg border border-border px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Property Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full rounded-lg border border-border px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  >
                    <option>Entire Place</option>
                    <option>Room</option>
                    <option>Shared Room</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2 uppercase">
                    Guests
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })
                    }
                    className="h-10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2 uppercase">
                    Bedrooms
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.bedrooms}
                    onChange={(e) =>
                      setFormData({ ...formData, bedrooms: parseInt(e.target.value) || 1 })
                    }
                    className="h-10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2 uppercase">
                    Beds
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.beds}
                    onChange={(e) =>
                      setFormData({ ...formData, beds: parseInt(e.target.value) || 1 })
                    }
                    className="h-10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2 uppercase">
                    Bathrooms
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.bathrooms}
                    onChange={(e) =>
                      setFormData({ ...formData, bathrooms: parseInt(e.target.value) || 1 })
                    }
                    className="h-10"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    City *
                  </label>
                  <Input
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder="e.g., Malibu"
                    className="h-10"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    State *
                  </label>
                  <Input
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    placeholder="e.g., California"
                    className="h-10"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Images */}
          {currentStep === 'images' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-4">
                  Upload Property Images
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center relative">
                  <Upload size={32} className="mx-auto text-muted-foreground mb-3" />
                  <p className="text-foreground font-medium mb-2">
                    Drag and drop your images
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to select
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Button variant="outline">Select Images</Button>
                  </label>
                </div>
              </div>

              {uploadedImages.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Uploaded Images ({uploadedImages.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Property ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Pricing */}
          {currentStep === 'pricing' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Price per Night *
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">$</span>
                  <Input
                    type="number"
                    min="0"
                    value={formData.pricePerNight}
                    onChange={(e) =>
                      setFormData({ ...formData, pricePerNight: e.target.value })
                    }
                    placeholder="0"
                    className="h-12 text-2xl font-bold"
                    required
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  This is the nightly rate guests will see
                </p>
              </div>

              <div className="bg-muted rounded-lg p-4 space-y-2">
                <h3 className="font-semibold text-foreground">Price Breakdown Example</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>${formData.pricePerNight || 0} × 5 nights</span>
                    <span className="font-medium text-foreground">
                      ${(parseInt(formData.pricePerNight) * 5) || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span className="font-medium text-foreground">$50</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-bold text-foreground">
                      ${(parseInt(formData.pricePerNight) * 5) + 50 || 50}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Amenities */}
          {currentStep === 'amenities' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  Select Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenities.map((amenity) => (
                    <button
                      key={amenity.id}
                      type="button"
                      onClick={() => toggleAmenity(amenity.id)}
                      className={`flex items-center gap-3 rounded-lg border-2 p-4 text-left transition ${selectedAmenities.includes(amenity.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                        }`}
                    >
                      <div
                        className={`${selectedAmenities.includes(amenity.id)
                            ? 'text-primary'
                            : 'text-muted-foreground'
                          }`}
                      >
                        {amenityIconMap[amenity.id]}
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {amenity.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 'review' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Review Your Property
                </h3>
                <div className="space-y-4 bg-muted rounded-lg p-4">
                  <div>
                    <p className="text-xs uppercase font-semibold text-muted-foreground">
                      Title
                    </p>
                    <p className="text-foreground font-medium">{formData.title || 'Untitled Property'}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-semibold text-muted-foreground">
                      Location
                    </p>
                    <p className="text-foreground">
                      {formData.city || 'N/A'}, {formData.state || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-semibold text-muted-foreground">
                      Price
                    </p>
                    <p className="text-foreground font-medium">
                      ${formData.pricePerNight || '0'} per night
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-semibold text-muted-foreground">
                      Capacity
                    </p>
                    <p className="text-foreground">
                      {formData.guests} guests • {formData.bedrooms} bedrooms •{' '}
                      {formData.beds} beds • {formData.bathrooms} bathrooms
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-semibold text-muted-foreground">
                      Images
                    </p>
                    <p className="text-foreground">
                      {uploadedImages.length} images uploaded
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-semibold text-muted-foreground">
                      Amenities
                    </p>
                    <p className="text-foreground">
                      {selectedAmenities.length} amenities selected
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-between">
          <Button
            variant="outline"
            onClick={goToPreviousStep}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft size={18} />
            Previous
          </Button>

          {currentStep === 'review' ? (
            <Button onClick={handlePublishOrSave} className="bg-primary text-primary-foreground flex items-center gap-2">
              {mode === 'create' ? 'Publish Property' : 'Save Changes'}
            </Button>
          ) : (
            <Button
              onClick={goToNextStep}
              className="bg-primary text-primary-foreground flex items-center gap-2"
            >
              Next
              <ChevronRight size={18} />
            </Button>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-muted py-12 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 Havenly, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
