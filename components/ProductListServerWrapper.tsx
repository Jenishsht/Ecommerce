import { getProducts, GetproductsParams } from "@/lib/Action";
import { ProductList } from "./product-list";
import { sleep } from "@/lib/utils";

interface productListServerWrapperPropsv
{
    params: GetproductsParams;

}

export async function ProductListServerWrapper({params}: productListServerWrapperPropsv){

    await sleep(1000);
    const products = await getProducts(params);
    return <ProductList products= {products}/>
    
}