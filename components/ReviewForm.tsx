'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Review } from '@/lib/dummy-data';

interface ReviewFormProps {
  propertyId: string;
  onSubmit: (review: Review) => void;
}

export function ReviewForm({ propertyId, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError('Please select a rating.');
      return;
    }
    if (comment.trim().length < 10) {
      setError('Review must be at least 10 characters.');
      return;
    }

    setSubmitting(true);

    const newReview: Review = {
      id: `review-${Date.now()}`,
      propertyId,
      guestId: 'guest-local',
      guestName: 'You',
      guestAvatar: '/placeholder-avatar.png',
      rating,
      comment: comment.trim(),
      createdAt: new Date(),
    };

    onSubmit(newReview);

    setRating(0);
    setComment('');
    setSubmitting(false);
  };

  return (
    <Card className="p-6 border-border mt-6">
      <h4 className="text-lg font-semibold text-foreground mb-4">Write a Review</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Your Rating
          </label>
          <div className="flex gap-1" role="group" aria-label="Star rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i + 1)}
                onMouseEnter={() => setHoverRating(i + 1)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 transition-transform hover:scale-110"
                aria-label={`Rate ${i + 1} star${i > 0 ? 's' : ''}`}
              >
                <Star
                  size={24}
                  className={`${
                    i < (hoverRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="review-comment" className="text-sm font-medium text-foreground mb-2 block">
            Your Review
          </label>
          <Textarea
            id="review-comment"
            placeholder="Share your experience staying at this property..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            maxLength={1000}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {comment.length}/1000 characters
          </p>
        </div>

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </Card>
  );
}
