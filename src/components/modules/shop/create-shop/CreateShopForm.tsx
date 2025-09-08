"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import { useState } from "react";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { createShop } from "@/services/Shop";
import { toast } from "sonner";

const CreateShopForm = () => {
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [imagePreview, setImagePreview] = useState<string[] | []>([]);
    const form = useForm()

    const { formState:{isSubmitting} } = form;    

    const onSubmit : SubmitHandler<FieldValues>= async(data) =>{
        const servicesOffered = data?.servicesOffered.split(',').map((service:string) =>service.trim()).filter((service:string)=>service!=="");
        const modifiedData = {
            ...data,
            servicesOffered:servicesOffered,
            establishedYear:Number(data?.establishedYear)
        }

        try {
            const formData = new FormData();
            formData.append('data', JSON.stringify(modifiedData));
            formData.append("logo",imageFiles[0] as File);
            const res = await createShop(formData);

            if(res.success){
                toast.success(res.message);
            }
        } catch (error) {
            
        }
    }
    return (
        <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Shop Name</FormLabel>
                        <FormControl>
                            <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                     <FormField
                    control={form.control}
                    name="businessLicenseNumber"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Business License Number</FormLabel>
                        <FormControl>
                            <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                     <FormField
                    control={form.control}
                    name="address"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                            <Input type="text" {...field} value={field.value || ""} />
                        </FormControl>
                       <FormMessage/>
                    </FormItem>
                    )}
                />
                     <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                            <Input type="text" {...field} value={field.value || ""} />
                        </FormControl>
                       <FormMessage/>
                    </FormItem>
                    )}
                />
                     <FormField
                    control={form.control}
                    name="Website"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                            <Input type="text" {...field} value={field.value || ""} />
                        </FormControl>
                       <FormMessage/>
                    </FormItem>
                    )}
                />
                     <FormField
                    control={form.control}
                    name="establishedYear"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Established Year</FormLabel>
                        <FormControl>
                            <Input type="text" {...field} value={field.value || ""} />
                        </FormControl>
                       <FormMessage/>
                    </FormItem>
                    )}
                />
                     <FormField
                    control={form.control}
                    name="taxIdentificationNumber"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Tax Identification Number</FormLabel>
                        <FormControl>
                            <Input type="text" {...field} value={field.value || ""} />
                        </FormControl>
                       <FormMessage/>
                    </FormItem>
                    )}
                />
                     <FormField
                    control={form.control}
                    name="socialMediaLinks.facebook"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Facebook</FormLabel>
                        <FormControl>
                            <Input type="text" {...field} value={field.value || ""} />
                        </FormControl>
                       <FormMessage/>
                    </FormItem>
                    )}
                />
                     <FormField
                    control={form.control}
                    name="socialMediaLinks.twitter"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Twitter</FormLabel>
                        <FormControl>
                            <Input type="text" {...field} value={field.value || ""} />
                        </FormControl>
                       <FormMessage/>
                    </FormItem>
                    )}
                />
                     <FormField
                    control={form.control}
                    name="socialMediaLinks.instagram"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Instagram</FormLabel>
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
                            name="servicesOffered"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Services Offered</FormLabel>
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
               </form>
            </Form>
        </div>
    );
};

export default CreateShopForm;