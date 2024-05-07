import StarRating from 'react-native-star-svg-rating';
import { useState } from 'react';
const StarRatingCustomer = () => {
  const [rating, setRating] = useState(0);
  return (
      <StarRating
        rating={rating}
        onChange={setRating}
      />
  );
};

export default StarRatingCustomer