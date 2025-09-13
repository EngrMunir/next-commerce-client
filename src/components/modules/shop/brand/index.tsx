// uncomplete form

import { Button } from "@/components/ui/button";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ICategory } from "@/types";
import { getAllCategories } from "@/services/Category";
import { createBrand, getAllBrands } from "@/services/Brand";
import { addProduct } from "@/services/Product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const CreateBrandModal = () => {
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [imagePreview, setImagePreview] = useState<string[] | []>([]);
   
    const router = useRouter();

    const form = useForm();
    const { formState: {isSubmitting}} = form;

   

    const onSubmit: SubmitHandler<FieldValues> = async(data) =>{
        

        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(data));
            formData.append("logo", imageFiles[0] as File);

            const res = await createBrand(formData);
            if(res?.success){
                toast.success(res?.message)
            }else{
                toast.error(res?.message)
            }
        } catch (err:any) {
            console.error(err)
        }
    }
    return (
         <Dialog>
            <DialogTrigger asChild>
                <Button size="sm">Create Brand</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Product Brand</DialogTitle>
                </DialogHeader>
                <div className="flex items-center justify-center">
                    {
                        imagePreview?.length > 0 ? (
                            <ImagePreviewer
                                setImageFiles={setImageFiles}
                                imagePreview={imagePreview}
                                setImagePreview={setImagePreview}
                            />
                        ):(
                            <NMImageUploader
                                setImageFiles={setImageFiles}
                                setImagePreview={setImagePreview}
                                label="Upload logo"
                            />
                        )
                    }
                </div>
                <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                    <FormItem>
                         <FormControl>
                            <Input 
                            type="text" 
                            {...field} 
                            value={field.value || ""}
                            className="rounded-sm w-56"
                            placeholder="Discount Percentage"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
       
                <Button type="submit" className="mt-5 w-full">
                    {isSubmitting ? "Creating....":"Create"}
                </Button>
               </form>
            </Form>
            </DialogContent>
        
        </Dialog>
    );
};

export default CreateBrandModal;