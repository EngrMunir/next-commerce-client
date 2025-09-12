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
import { getAllBrands } from "@/services/Brand";
import { addProduct } from "@/services/Product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UpdateProductForm = ({product}:{product: IProduct}) => {
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [imagePreview, setImagePreview] = useState<string[] | []>([]);
    const [categories, setCategories] = useState<ICategory[]|[]>([])
    const [brands, setBrands] = useState<ICategory[]|[]>([])
    const router = useRouter();

    const form = useForm({
        defaultValues:{
            name:product?.name|| "",
            description:product?.description ||"",
            price:product?.price || "",
            category:product?.category?.name || "",
            brand:product?.brand?.name || "",
            stock:product?.stock || "",
            weight: product?.weight ||"",
            availableColors: product?.availableColors?.map((color) =>({
                value:color,
            })) || [{value:""}],
            specification: Object.entries(product?.specification || {}).map(
                ([key, value]) => ({key, value})
            ) || [{key:"", value:""}],
            keyFeatures: product?.keyFeatures?.map((feature) => ({ value: feature})) || [{value:""}],
        },
    });
    const { formState: {isSubmitting}} = form;

     const { append: appendColor, fields:colorFields } = useFieldArray({
        control:form.control,
        name: "availableColors",
    });

     const addColor =()=>{
        appendColor({value:""});
    }

    const { append: appendFeatures, fields:featureFields } = useFieldArray({
        control:form.control,
        name: "keyFeatures",
    });

    const addFeatures =()=>{
        appendFeatures({value:""});
    }

    useEffect(()=>{
        const fetchData = async()=>{
            const [categoriesData, brandsData] = await Promise.all([
                getAllCategories(),
                getAllBrands()
            ]);
            setCategories(categoriesData?.data);
            setBrands(brandsData?.data);
        }
        fetchData();
    },[])

    const onSubmit: SubmitHandler<FieldValues> = async(data) =>{
        const availableColors = data?.availableColors.map( (color: {value:string}) => color.value);
        const keyFeatures = data?.keyFeatures.map( (feature: {value:string}) => feature.value);

        const specification:{[key:string]:string} = {};
        data?.specification.forEach((item:{key:string; value:string}) => specification[item.key] = item.value);


        const modifiedData ={
            ...data,
            availableColors,
            keyFeatures,
            specification,
            price:parseFloat(data?.price),
            stock:parseInt(data?.stock),
            weight: parseFloat(data?.weight),
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(modifiedData));
        for(const file of imageFiles){
            formData.append("images",file);
        }

        try {
            const res = await addProduct(formData);
            if(res?.success){
                toast.success(res?.message)
                router.push("/user/shop/products");
            }else{
                toast.error(res?.message)
            }
        } catch (err:any) {
            console.error(err)
        }
    }
    return (
         <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
            <div className="flex items-center space-x-4 mb-5">
                <h1 className="text-xl font-bold">Update Product Info</h1>
            </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                            <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                     <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                     <FormField
                    control={form.control}
                    name="price"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                            <Input type="text" {...field} value={field.value || ""} />
                        </FormControl>
                       <FormMessage/>
                    </FormItem>
                    )}
                />
                    <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Product Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                     {
                        categories.map((category) =>(
                           <SelectItem key={category?._id} value={category?._id}>{category?.name}</SelectItem>
                        ))
                    }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
                    <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Brands" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                     {
                        brands.map((brand) =>(
                           <SelectItem key={brand?._id} value={brand?._id}>{brand?.name}</SelectItem>
                        ))
                    }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="stock"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                        <Input type="text" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="weight"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                        <Input type="text" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
                     
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div className="col-span-4 md:col-span-3">
                        <FormField
                            control={form.control}
                            name="availableColors"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Available Colors</FormLabel>
                                    <FormControl>
                                        <Textarea 
                                        className="h-36"
                                        {...field}
                                        value={field.value || ""}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                   { imagePreview.length>0 ? (
                    <ImagePreviewer 
                    className="mt-8"
                    setImageFiles={setImageFiles} 
                    setImagePreview={setImagePreview} 
                    imagePreview={imagePreview}
                    />
                ):(
               <div className="mt-8">
                 <NMImageUploader 
                setImageFiles={setImageFiles} 
                setImagePreview={setImagePreview} 
                label="Upload Logo" 
                />
               </div>
                )}
            </div>
                <Button type="submit" className="mt-5 w-full">Create</Button>

                <div className="my-5">
                    {
                        featureFields.map((featureField, index) =>(
                            <div key={featureField.id}>
                                <FormField
                                    control={form.control}
                                    name={`keyFeatures.${index}.value`}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Key Features {index + 1}</FormLabel>
                                            <FormControl>
                                                <Input {...field} value={field.value || ""}/>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ))
                    }
                </div>
               </form>
            </Form>
        </div>
    );
};

export default UpdateProductForm;