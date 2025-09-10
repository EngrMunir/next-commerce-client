import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const CreateCategoryModal = () => {
      const form = useForm();
      const { formState: {isSubmitting}}= form;

      const onSubmit: SubmitHandler<FieldValues> = async(data) =>{
        try {
            console.log(data)
        } catch (error) {
            console.error(error)
        }
      }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Category </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Create Product Category</DialogTitle>
                </DialogHeader>
                <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}>
                    
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                     <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="text" {...field} value={field.value || ""} />
                        </FormControl>
                       <FormMessage/>
                    </FormItem>
                    )}
                />
                <Button  
                type="submit"
                className="mt-5 w-full"
                >
                    {isSubmitting ? "Logging....":"Login"}
                </Button>
               </form>
            </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateCategoryModal;