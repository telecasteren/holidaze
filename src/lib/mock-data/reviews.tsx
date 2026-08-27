
import { Avatar } from '@mui/material'

export const userReviews = [
  // todo: get "venue" and "rating" from holidaze API
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    author: 'John Show',
    venue: "Hotel Hot Stone",
    rating: 5,
    reviewText:
      "I absolutely loved this place. It was a perfect blend of comfort and modern amenities.",
  },
  {
    avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />,
    author: 'Reyna Lewis',
    venue: "Sea Side Guesthouse",
    rating: 4,
    reviewText:
      "We were treated so professionally and courteously. The staff was friendly and attentive, making us feel welcome from the moment we arrived.",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />,
    author: 'Cindy Crawbone',
    venue: "Jungle Inn",
    rating: 5,
    reviewText:
      "We had a wonderful stay at the Jungle Inn. The decor was stunning and the staff was friendly and helpful. Green plants everywhere!"
  },
];
