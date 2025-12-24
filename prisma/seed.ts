/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';  //toensure the.env file is import 
import { PrismaClient } from '../app/generated/prisma/client'; 
import { Product } from '@/app/generated/prisma/browser';
const prisma = new PrismaClient();

async function main() {
    await prisma.product.deleteMany();
    await prisma.catagory.deleteMany();

    const  electronics =await prisma.catagory.create({    // used to create row 
      data: {
        name : "Electronics",
        slug : "electronics",
        
      },
    });
    const  clothing =await prisma.catagory.create({
      data: {
        name : "Clothing",
        slug : "clothing",
        
      },
    });
    const  home =await prisma.catagory.create({
      data: {
        name : "Home",
        slug : "home",
        
      },
    });
    const sport = await prisma.catagory.create({
      data: {
        name: "Sport",
        slug: "sport",
      },
    });


     const Products: Product[]=[
    
        {
          id: "1",
          name: "Wireless Headphone",
          description: " Premium noise-cancelling wireless headphone with long battery life.",
          price: 199.9,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lfGVufDB8fDB8fHww",
          catagoryId: electronics.id,
          slug: 'Wireless-headphone'
        },
        {
            id :"2",
            name: "Smart Watch",
            description: " Fitness tracker with heart rate monitoring and sleep analysis.",
            price: 199.9,
            image: "https://images.unsplash.com/photo-1617043983671-adaadcaa2460?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
            catagoryId: electronics.id,
            slug: 'smart-watch',
    
        },
        {
            id :"3",
            name: "Running Shoes",
            description: " Lightweight running shoes with responseive cushioning.",
            price: 89.9,
            image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cnVubmluZyUyMHNob2VzfGVufDB8fDB8fHww",
            catagoryId: sport.id,
            slug: 'running-shoes',
            
        },
        {
            id :"4",
            name: "Ceramic Mug",
            description: "Handcrafted ceramic mug with minimalist design.",
            price: 24.9,
            image: "https://images.unsplash.com/photo-1666445844615-0a3930270f13?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2VyYW1pYyUyMG11Z3xlbnwwfHwwfHx8MA%3D%3D",
            catagoryId: home.id,
            slug: 'Ceramic-mug'
            
        },
        {
            id :"5",
            name: "Leader Backpack",
            description: " durable leather backpack with multiple compartments.",
            price: 79.9,
            image: "https://images.unsplash.com/photo-1592289924034-c423dd2f1c5d?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TGVhZGVyJTIwQmFja3BhY2t8ZW58MHx8MHx8fDA%3D",
            catagoryId: clothing.id,
            slug: 'Leader-backpack'
            
        }
    ];
    for (const product of Products){
      await prisma.product.create({
        data :product,
        
      })
    }
}

main()
  .then(async () => {
    console.log("Seeding complete!")    //if  successfully it print 
    await prisma.$disconnect()          //disnconnect prisma from databases
  })
  .catch(async (e) => {
    console.error(e)            //if error print error
    await prisma.$disconnect()  // then disconnect prisma from the databases
    process.exit(1)
  })




  
