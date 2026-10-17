import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// ضفنا الـ id هنا عشان يتطابق مع HomePage وباقي الملفات
interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  price: string;
}

const ProductCard = ({ title, image, price }: ProductCardProps) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardMedia
        sx={{ height: 200 }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 800 }}>
          ${price}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button variant="contained" fullWidth size="medium" sx={{ textTransform: 'none', fontWeight: 600 }}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;