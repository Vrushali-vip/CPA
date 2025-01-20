"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import FileInput from "@/components/custom/FileInput";
import { useState } from "react";
import { clientRevalidate } from "../../action";

const formSchema = z.object({
    content: z.string().min(1, "Content is required"),
});

type CommentFormProps = {
    ticketId: string;
};

export default function CommentForm({ ticketId }: CommentFormProps) {
    const { toast } = useToast();
    const [working, setWorking] = useState(false);
    const [files, setFiles] = useState<File[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { content: "" },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setWorking(true);

        const fd = new FormData();
        fd.append("content", values.content);
        fd.append("ticket", ticketId);
        files.forEach((file, i) => fd.append(`attachments_${i}`, file));

        console.log(values);
        console.log(files);
        const res = await fetch("/api/comments", { method: "POST", body: fd });
        const responseData = await res.json();

        if (responseData.error) {
            toast({ variant: "destructive", title: "Error", description: responseData.error });
        } else {
            toast({ title: "Success", description: "Comment added successfully." });
            await clientRevalidate("/servicehub/support/" + ticketId);
        }

        form.reset();
        setFiles([]);
        setWorking(false);
        
    }
   
    return (
        <div className="mt-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Type your comment here..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FileInput onChange={setFiles} label="Upload Attachments" multiple={true} accept="image/*" />
                    <Button disabled={working} type="submit" className="w-full">
                        {working ? "Submitting..." : "Submit Comment"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
