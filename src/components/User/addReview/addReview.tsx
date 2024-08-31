import React, { useState, Fragment } from 'react';
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import { addReview } from '@/api/reviewUrl';
import { toast } from 'sonner';
import { IoStar } from "react-icons/io5";
import "../../../styles/film-details.scss";

interface AddReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  movieId: string;
}

const AddReviewDialog: React.FC<AddReviewDialogProps> = ({ isOpen, onClose, movieId }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const reviewData = {
      movieId,
      review,
      rating,
    };

    try {
      await addReview(reviewData);
      toast.success('Review Added Successfully');
      setReview('');
      setRating(0);
      onClose();
    } catch (error) {
      toast.error('Failed to Add Review');
    }
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <HeadlessDialog as="div" className="fixed inset-0 z-50 flex items-center justify-center p-4" onClose={onClose}>
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
          <HeadlessDialog.Title className="text-lg font-semibold text-black">Add Review</HeadlessDialog.Title>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full px-3 py-2 border rounded textarea" /* Add the class */
              placeholder="Write your review"
            />
            <div className="flex justify-center">
              {[...Array(10)].map((_, index) => (
                <span
                  key={index}
                  className={`cursor-pointer ${rating >= index + 1 ? 'text-yellow-400' : 'text-gray-300'}`}
                  onClick={() => handleRatingChange(index + 1)}
                >
                  <IoStar size={30} />
                </span>
              ))}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-500"
              >
                Submit
              </button>
            </div>
          </form>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};

export default AddReviewDialog;
