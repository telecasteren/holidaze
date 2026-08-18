import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';


const userReviews = [
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

export default function Reviews() {

  return (
    <Container
      id="reviews"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          Reviews
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          See what our customers love about our venues. Discover how easy it is to book and stay — from affordable guesthouses to luxury spa hotels.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userReviews.map((review, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex' }}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
              }}
            >
              <CardContent>
                <Typography
                  component="div"
                  variant="body1"
                  gutterBottom
                  sx={{ color: 'text.secondary' }}
                >
                  <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.secondary' }}>
                    <Link href={review.venue}>{review.venue}</Link>
                  </Typography>
                  {review.reviewText}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <CardHeader
                  avatar={review.avatar}
                  title={review.author}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
