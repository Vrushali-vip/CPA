"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import FileInput from "@/components/custom/FileInput";
import { clientRevalidate } from "../action";
const formSchema = z.object({
    content: z.string()
})

type CommentFormProps = {
    ticketId: string;
}
export default function CommentForm({ ticketId }: CommentFormProps) {

    const { toast } = useToast();
    const [working, setWorking] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: ""
        },
    })


    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setWorking(true);

        const fd = new FormData();
        fd.append("content", values.content);
        fd.append("ticket", ticketId);
        fd.append("files_attached", "" + files.length);

        // append files to form data
        files.forEach((file, i) => fd.append(`attachments_${i}`, file));

        const res = await fetch("/api/comments", { method: "POST", body: fd });
        const responseData = await res.json();
        // createTicketComment(ticketId, values.content, files);

        if (responseData.error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: responseData.error
            })
        } else {
            await clientRevalidate("/servicehub/" + ticketId);
            toast({
                title: "Success",
                description: "Comment added successfully."
            })
        }
        form.reset();
        setWorking(false);
    }

    function onFileInputChange(files: File[]) {
        setFiles(files);
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel></FormLabel>
                            <FormControl>
                                <Textarea placeholder="Type a comment" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FileInput onChange={onFileInputChange} label="Add Images" multiple={true} accept="image/*" />
                <Button disabled={working} type="submit" className="w-full">
                        {working ? "Submitting..." : "Submit Comment"}
                    </Button>                
            </form>
        </Form>
    )
}