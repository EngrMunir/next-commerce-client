import { Button } from "@/components/ui/button"
import { NMTable } from "@/components/ui/core/NMTable"
import { IProduct } from "@/types/product"
import { ColumnDef } from "@tanstack/react-table"
import { Plus } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react"
import DiscountModal from "./DiscountModal"

const ManageProducts = ({products}:{products:IProduct[]})=>{
    const router = useRouter();
    const [selectedIds, setSelectedIds] = useState<string[] | []>([]);

    const handleView = (product: IProduct)=>{
        console.log("Deleting product with ID:",product)
    };
    const handleDelete =(productId:string) =>{
        console.log("Deleting product with id ", productId)
    };

    const columns: ColumnDef<IProduct>[]=[
          {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) =>{
             if(value){
                setSelectedIds((prev) => [...prev, row.original._id]);
            }else{
                setSelectedIds(selectedIds.filter(id => id !== row.original._id))
            }
             row.toggleSelected(!!value)
            }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
        {
            accessorKey:"name",
            header: "Product Name",
            cell: ({row}) =>(
                <div className="flex items-center space-x-3">
                    <Image
                        src={row.original.imageUrls[0]}
                        alt={row.original.name}
                        width={40}
                        height={40}
                        className="w-8 h-8 rounded-full"
                    />
                </div>
            )
        }
    ]
    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Manage Products</h1>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={()=> router.push("/user/shop/products/add-product")}
                        size="sm"
                    >
                        Add Product <Plus/>
                    </Button>
                    <DiscountModal selectedIds={selectedIds} setSelectedIds={setSelectedIds}/>
                </div>
            </div>
            <NMTable columns={columns} data={products || []}/>
        </div>
    )
}