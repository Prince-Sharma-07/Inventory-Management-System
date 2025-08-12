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
import { CREATE_PRODUCT } from "@/lib/gql/mutations";
import gqlClient from "@/lib/services/graphQL";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Product } from "../../../generated/prisma";

export function AddProductBtn() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [category, setCategory] = useState<string>("others");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);

  function clearFields() {
    setTitle("");
    setDescription("");
    setCategory("others");
    setPrice(0);
    setStock(0);
    setImageUrl("");
  }

  async function handleAddProduct() {
    try {
      const res: {
        createdProduct: Product;
      } = await gqlClient.request(CREATE_PRODUCT, {
        title,
        description,
        imageUrl,
        category,
        price,
        stock,
      });
      if (res?.createdProduct) {
        toast("Product Created Successfully!");
        clearFields();
      } else {
        toast("Product creation terminated!");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="cursor-pointer" variant="outline">
            {" "}
            <PlusIcon /> product
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription>
              Add details of the new product. Click save when you&apos;re done.
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
              <Label htmlFor="stock-1">Price</Label>
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
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category-1" className="w-full">
                  <SelectValue placeholder="Select a category" />
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
