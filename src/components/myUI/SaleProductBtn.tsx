"use client";
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
import { CREATE_SALE } from "@/lib/gql/mutations";
import gqlClient from "@/lib/services/graphQL";
import { useState } from "react";
import { toast } from "sonner";
import { Product } from "../../../generated/prisma";
import { CreditCard, ShoppingCart, ShoppingCartIcon } from "lucide-react";

export function SaleProductBtn({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(0);

  function clearFields() {
    setQuantity(1);
  }

  async function handleSaleProduct() {
    if (product.stock < quantity || quantity == 0) {
      toast("Quantity is more than no of stocks available!");
      return;
    }
    try {
      const res: {
        createSale: boolean;
      } = await gqlClient.request(CREATE_SALE, {
        id: product.id,
        quantity,
      });
      if (res?.createSale) {
        toast("Sale Created Successfully!");
        clearFields();
      } else {
        toast("Sale creation aborted!");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white font-medium rounded cursor-pointer">
              {" "}
              <ShoppingCartIcon />Create Sale
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Sale Product</DialogTitle>
              <DialogDescription>
                Select quantity. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value || "0"))}
                  placeholder="Enter quantity"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleSaleProduct}>Save</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
