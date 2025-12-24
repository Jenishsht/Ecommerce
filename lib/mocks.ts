export type Product ={

    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}
export const mockProducts: Product[]=[

    {
        id :"1",
        name: "Wireless Headphone",
        description: " Premium noise-cancelling wireless headphone with long battery life.",
        price: 199.9,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lfGVufDB8fDB8fHww",
        category: "Electronics",
    },
    {
        id :"2",
        name: "Smart Watch",
        description: " Fitness tracker with heart rate monitoring and sleep analysis.",
        price: 199.9,
        image: "https://images.unsplash.com/photo-1617043983671-adaadcaa2460?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
        category: "Electronics",

    },
    {
        id :"3",
        name: "Running Shoes",
        description: " Lightweight running shoes with responseive cushioning.",
        price: 89.9,
        image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cnVubmluZyUyMHNob2VzfGVufDB8fDB8fHww",
        category: "sport",
        
    },
    {
        id :"4",
        name: "Ceramic Mug",
        description: "Handcrafted ceramic mug with minimalist design.",
        price: 24.9,
        image: "https://images.unsplash.com/photo-1666445844615-0a3930270f13?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2VyYW1pYyUyMG11Z3xlbnwwfHwwfHx8MA%3D%3D",
        category: "Home",
        
    },
    {
        id :"5",
        name: "Leader Backpack",
        description: " durable leather backpack with multiple compartments.",
        price: 79.9,
        image: "https://images.unsplash.com/photo-1592289924034-c423dd2f1c5d?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TGVhZGVyJTIwQmFja3BhY2t8ZW58MHx8MHx8fDA%3D",
        category: "Fashion",
        
    }
]