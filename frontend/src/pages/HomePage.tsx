import { Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";

// تعريف شكل المنتج (TypeScript Interface)
interface Product {
    _id: string;
    title: string;
    image: string;
    price: string;
    description?: string;
}

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch(`${BASE_URL}/product`)
            .then(async (response) => {
                const data = await response.json();
                setProducts(data);
            })
            .catch((err) => console.log("Failed to fetch products", err));
    }, []); // ضفنا الـ Dependency Array الفارغة عشان تشتغل مرة واحدة بس

    return (
        <Container sx={{ mt: 4 }}>
            <Grid container spacing={4}>
                {products.map(({ _id, title, image, price }) => (
                    // ضفنا key فريد لكل عنصر عشان ريأكت
                    <Grid size={{ xs: 12, md: 4 }} key={_id}>
                        <ProductCard id={_id} title={title} image={image} price={price}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HomePage;