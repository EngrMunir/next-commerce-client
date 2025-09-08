"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";
import { loginSchema } from "./loginValidation";
import { loginUser } from "@/services/AuthService";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
    const form = useForm({
        resolver: zodResolver(loginSchema),
    });

    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirectPath');
    const router = useRouter();

    const { formState:{isSubmitting} } = form;
    
    const onSubmit : SubmitHandler<FieldValues>= async(data) =>{
        try {
            const res = await loginUser(data);
            if(res.success){
                toast.success(res?.message)
                if(redirect){
                    router.push(redirect)
                }
                else{
                    router.push("/profile")
                }
            }else{
                toast.error(res?.message)
            }
        } catch (err:any) {
            console.error(err)
        }
    }
    return (
        <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
            <div className="flex items-center space-x-4">
                <h1>Logo</h1>
                <div>
                    <h1 className="text-xl font-semibold">Login</h1>
                    <p className="font-extrabold text-sm text-gray-600">
                        Join us today and start your journey!
                    </p>
                </div>
            </div>
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
            <p className="text-sm text-gray-600 text-center my-3">Do not have any account?
                <Link href="/register" className="text-primary">Register</Link>
            </p>
        </div>
    );
};

export default LoginForm;