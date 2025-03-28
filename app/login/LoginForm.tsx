// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod";

// import { Button } from "@/components/ui/button"
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { signIn, useSession } from "next-auth/react";
// import { useToast } from "@/hooks/use-toast";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// const formSchema = z.object({
//     email: z.string().email(),
//     password: z.string().min(6),
// })

// export default function LoginForm() {
    
//     const { toast } = useToast();
//     const router = useRouter();
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             email: "",
//             password: ""
//         },
//     })

//     // 2. Define a submit handler.
//     async function onSubmit(values: z.infer<typeof formSchema>) {
//         const res = await signIn("credentials", {
//             email: values.email,
//             password: values.password,
//             redirect: false
//         });

//         if(res?.error) {
//             toast({
//                 variant: "destructive",
//                 title: "Error",
//                 description: res.error
//             })
//         } else {
//             toast({
//                 title: "Success",
//                 description: "Logged in"
//             })
//             router.refresh();
//             if(process.env.NODE_ENV === "production") {
//                 window.location.reload();
//             }
//         }
//     }
    
//     const session = useSession();
//     useEffect(() => {
//         if(session.data?.user) {
//             console.log("logged in");
            
//             const url = new URL(window.location.href);
//             router.push(url.searchParams.get("callbackUrl") || "/servicehub");
//         }
//     }, [session.data?.user, router]);

//     return (
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96">
//                 <FormField
//                     control={form.control}
//                     name="email"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Email</FormLabel>
//                             <FormControl>
//                                 <Input placeholder="customer@example.com" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="password"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Password</FormLabel>
//                             <FormControl>
//                                 <Input placeholder="y0urPa$$word" type="password" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <Button size="sm" type="submit">Submit</Button>
//             </form>
//         </Form>
//     )
// }

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn, useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false
        });

        if(res?.error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: res.error
            })
        } else {
            toast({
                title: "Success",
                description: "Logged in"
            })
            router.refresh();
            if(process.env.NODE_ENV === "production") {
                window.location.reload();
            }
        }
    }
    
    const session = useSession();
    useEffect(() => {
        if(session.data?.user) {
            console.log("logged in");
            
            const url = new URL(window.location.href);
            router.push(url.searchParams.get("callbackUrl") || "/servicehub");
        }
    }, [session.data?.user, router]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="customer@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl className="relative">
                                <div className="relative">
                                    <Input 
                                        placeholder="y0urPa$$word" 
                                        type={showPassword ? "text" : "password"} 
                                        {...field} 
                                        className="pr-10"
                                    />
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{showPassword ? "Hide" : "Show"} Password</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button size="sm" type="submit">Submit</Button>
            </form>
        </Form>
    )
}