"use client";
import React from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { DELETE_PRODUCT } from "@/lib/gql/mutations";
import gqlClient from "@/lib/services/graphQL";
import { toast } from "sonner";

export default function ({ id }: { id: string }) {
  async function handleDelete() {
    try {
      const res : {
        deleted : boolean
      } = await gqlClient.request(DELETE_PRODUCT, { id });
     
      if(res?.deleted) {
        toast("Product deleted successfully!")
      }
      else{
        toast("Something went wrong!")
      }
    } catch (err: any) {
      console.log("Error while deleting product ", err.message);
    }
  }

  return (
    <Button
      onClick={handleDelete}
      className="flex items-center gap-2 cursor-pointer rounded dark:bg-white font-medium"
    >
      <Trash className="h-6 w-6 dark:text-black" />
      Delete
    </Button>
  );
}
