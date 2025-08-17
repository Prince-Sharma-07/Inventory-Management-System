import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "@/lib/gql/mutations";
import gqlClient from "@/lib/services/graphQL";
import { ChevronDownIcon, Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Product, ProductCategory } from "../../../generated/prisma";
import { ProductWithSales } from "@/types";

export function EditProductBtn({
  product,
  setProduct,
}: {
  product: ProductWithSales;
  setProduct: React.Dispatch<React.SetStateAction<ProductWithSales | null>>;
}) {
  const [title, setTitle] = useState(product?.title);
  const [description, setDescription] = useState(product?.description);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl);
  const [category, setCategory] = useState(product?.category);
  const [price, setPrice] = useState(product?.price);
  const [stock, setStock] = useState(product?.stock);

  function clearFields() {
    setTitle(product.title);
    setDescription(product.description);
    setCategory(product.category);
    setPrice(product.price);
    setStock(product.stock);
    setImageUrl(product.imageUrl);
  }

  async function handleAddProduct() {
    try {
      const res: {
        updated: Product;
      } = await gqlClient.request(UPDATE_PRODUCT, {
        id: product.id,
        title,
        description,
        imageUrl,
        category,
        price,
        stock,
      });
      if (res?.updated) {
        toast("Product Updated Successfully!");
        setProduct({
        id: product.id,
        title,
        description,
        imageUrl,
        category,
        price,
        stock,
        sales : product.sales
      })
        clearFields();
      } else {
        toast("Product Updation Terminated!");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return (
    <Dialog>
      <form className="flex items-center">
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white font-medium rounded cursor-pointer">
            {" "}
            <Edit /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Edit details of the product. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title-1">Title</Label>
              <Input
                id="title-1"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description-1">Description</Label>
              <Input
                id="description-1"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="imageUrl-1">ImageUrl</Label>
              <Input
                id="imageUrl-1"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image url"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price-1">Price</Label>
              <Input
                id="price-1"
                name="price"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value || "0"))}
                placeholder="Enter price"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="stock-1">Stock</Label>
              <Input
                id="stock-1"
                name="stock"
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value || "0"))}
                placeholder="Enter stock"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category-1">Select Category</Label>
              <Select
                value={category}
                onValueChange={(val: ProductCategory) => setCategory(val)}
              >
                <SelectTrigger
                  id="category-1"
                  className="w-full border shadow rounded-md text-start px-3 p-1 flex "
                >
                  <div className="flex gap-2 justify-between items-center w-full">
                    <SelectValue placeholder="Select a category" />
                    <ChevronDownIcon className="h-6 w-6" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>categories</SelectLabel>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="decor">Decor</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleAddProduct}>Save</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
