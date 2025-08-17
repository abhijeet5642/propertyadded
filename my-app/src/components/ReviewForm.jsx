import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function ReviewForm({ onReviewSubmit }) {
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (author && comment && rating > 0) {
      onReviewSubmit({ author, comment, rating });
      setAuthor('');
      setComment('');
      setRating(0);
    }
  };

  return (
    <div className="p-8 bg-blue-50 rounded-xl shadow-md border border-blue-200 mt-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Leave a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Your Name</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Your Review</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Your Rating</label>
          <div className="flex space-x-1 mt-1">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <Star
                key={starValue}
                size={24}
                className={`cursor-pointer transition-colors duration-200 ${
                  starValue <= (hoverRating || rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'
                }`}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHoverRating(starValue)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}