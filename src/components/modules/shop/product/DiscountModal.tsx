// uncomplete form

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { addFlashSale } from "@/services/FlashSale";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

type TModalProps = {
    selectedIds : string[];
    setSelectedIds: Dispatch<SetStateAction<string[] | []>>;
}

const DiscountModal = ({selectedIds, setSelectedIds}:TModalProps) => {

    const form = useForm();
    const { formState: {isSubmitting}} = form;

   

const onSubmit: SubmitHandler<FieldValues> = async(data) =>{
    const modifiedData = {
        products: [...selectedIds],
        discountPercentage: parseFloat(data?.discountPercentage),
    }
        try {
            const res = await addFlashSale(modifiedData)
            if(res.success){
                toast.success(res.message)
                setSelectedIds([]);
            }else{
                toast.error(res.message)
            }
        } catch (err:any) {
            console.error(err)
        }
    }
    return (
         <Dialog>
            <DialogTrigger asChild>
                <Button disabled={!selectedIds?.length} size="sm">Add Flash Sale</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Flash Sale</DialogTitle>
                </DialogHeader>
                <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="discountPercentage"
                    render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Input 
                            type="number" 
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
                    {isSubmitting ? "Adding....":"Add"}
                </Button>
               </form>
            </Form>
            </DialogContent>
        </Dialog>
    );
};

export default DiscountModal;