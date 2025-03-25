import { wixClientServer } from "@/libs/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PRODUCTS_PER_PAGE = 20;

export const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const wixClient = await wixClientServer();
  const res = await wixClient.products
    .queryProducts()
    .eq("collectionIds", categoryId)
    .limit(limit || PRODUCTS_PER_PAGE)
    .find();
  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {res.items.map((product: products.Product) => (
        <Link
          href={"/" + product.slug}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product._id}
        >
          <div className="relative w-full h-80">
            <Image
              src={product.media?.mainMedia?.image?.url || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            />
            <Image
              src="https://images.pexels.com/photos/3640668/pexels-photo-3640668.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md"
            />
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Product Name</span>
            <span className="font-semibold">$49</span>
          </div>
          <div className="text-sm text-gray-500">My description</div>
          <button className="rounded-2xl ring-1 ring-custom text-custom w-max py-2 px-4 text-xs hover:bg-custom hover:text-white">
            Add To Cart
          </button>
        </Link>
      ))}
    </div>
  );
};
