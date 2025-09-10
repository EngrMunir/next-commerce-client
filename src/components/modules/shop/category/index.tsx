import { NMTable } from "@/components/ui/core/NMTable";
import CreateCategoryModal from "./CreateCategoryModal";
import { ICategory } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Trash } from "lucide-react";

type TCategoriesProps = {
    categories:ICategory[];
}

const ManageCategories = ({categories}:TCategoriesProps) => {
    const handleDelete =(data:ICategory) =>{
        console.log(data)
    }
    const columns: ColumnDef<ICategory>[] = [
  {
    accessorKey: "name",
    header: () => <div>Category Name</div>,
    cell:({row}) => (
        <div className="flex items-center space-x-3">
            <Image
            src={row.original.icon}
            alt={row.original.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
            />
            <span className="truncate">{row.original.name}</span>
        </div>
    ),
  },
  {
    accessorKey:"action",
    header:()=> <div>Action</div>,
    cell: ({ row}) =>(
        <button className="text-red-500" title="Delete" onClick={()=>handleDelete(row.original)}>
            <Trash className="w-5 h-5"/>
        </button>
    )
  }
]
    return (
        <div>
           <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Manage Categories</h1>
               <CreateCategoryModal/>
           </div>
           <NMTable data={categories} columns={columns}/>
        </div>
    );
};

export default ManageCategories;