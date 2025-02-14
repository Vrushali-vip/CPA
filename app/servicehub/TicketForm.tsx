
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FileInput from "@/components/custom/FileInput";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import ArticleCardSkeleton from "@/components/custom/ArticleCardSkeleton";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters long" }),
  topic: z.string().min(1, { message: "Please select a topic" }),
  issue: z.string().optional(),
  subIssue: z.string().optional(),
  description: z.string().min(15, { message: "Description should be at least 15 characters" }),
  invitation_mail: z.union([
    z.string().email({ message: "Enter a valid email" }),
    z.literal("")
  ]),
  attachments: z.array(z.instanceof(File)).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function TicketForm() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      topic: "",
      issue: "",
      subIssue: "",
      description: "",
      invitation_mail: "",
      attachments: [],
    },
    mode: "onSubmit",
  });

  const validateStep = async (step: number) => {
    let fieldsToValidate: Array<keyof FormSchema> = [];
    
    switch (step) {
      case 1:
        fieldsToValidate = ['title', 'topic'];
        break;
      case 2:
        fieldsToValidate = ['description'];
        break;
      case 3:
        fieldsToValidate = ['invitation_mail'];
        break;
    }

    const results = await Promise.all(
      fieldsToValidate.map(field => form.trigger(field))
    );

    return results.every(result => result === true);
  };

  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    if (currentStep < 3) {
      const isValid = await validateStep(currentStep);
      if (isValid) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault(); 
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (values: FormSchema) => {
    if (isSubmitting) return;
    
    const isValid = await form.trigger();
    if (!isValid) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please check all fields and try again.",
      });
      return;
    }

    setIsSubmitting(true);

    const fd = new FormData();
    fd.append("title", values.title);
    fd.append("topic", values.topic);
    fd.append("issue", values.issue || "");
    fd.append("subIssue", values.subIssue || "");
    fd.append("description", values.description);
    fd.append("invitation_mail", values.invitation_mail);
    fd.append("files_attached", "" + selectedFiles.length);

    selectedFiles.forEach((file, i) => {
      fd.append(`attachments_${i}`, file);
    });

    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        body: fd,
      });

      const responseData = await response.json();

      if (responseData.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: responseData.error,
        });
      } else {
        toast({
          title: "Success",
          description: "Ticket submitted successfully.",
        });
        form.reset();
        setSelectedFiles([]);
        setDialogOpen(false);
        setCurrentStep(1);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while submitting the ticket.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  function handleFileSelection(newFiles: File[]) {
    setSelectedFiles(newFiles);
    form.setValue("attachments", newFiles, { shouldValidate: true });
  }

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You are not logged in. Please log in to continue.</div>;
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={(open) => {
      setDialogOpen(open);
      if (!open) {
        setCurrentStep(1);
        form.reset();
        setSelectedFiles([]);
      }
    }}>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-auto">
          <Plus size={10} /> Create Ticket
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center mb-6 space-x-4">
            {["What's happening", "What we need", "Next steps"].map((label, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold ${
                    index + 1 < currentStep
                      ? "bg-green-500 text-white"
                      : index + 1 === currentStep
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {index + 1 < currentStep ? "✓" : index + 1}
                </div>
                <span
                  className={`text-sm ${
                    index + 1 < currentStep
                      ? "text-green-500 font-bold"
                      : index + 1 === currentStep
                        ? "text-blue-600 font-bold"
                        : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
                {index < 2 && (
                  <div
                    className={`flex-1 h-1 ${
                      index + 1 < currentStep
                        ? "bg-green-500"
                        : index + 1 === currentStep
                          ? "bg-blue-500"
                          : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="w-full md:w-2/3">
            <Form {...form}>
              <form noValidate className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {currentStep === 1 && (
                  <>
                    <div className="flex flex-wrap lg:flex-nowrap space-x-4 mb-20 items-center">
                      <div className="text-center lg:text-left lg:flex-1">
                        <h2 className="text-3xl lg:text-4xl font-semibold typewriter">
                          Hi {session?.user?.name}, our experts are ready to help
                        </h2>
                      </div>
                    </div>
                    <DialogHeader>
                      <DialogTitle className="text-2xl mb-4 mt-20">Describe What is Happening</DialogTitle>
                    </DialogHeader>
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Describe the issue in 10 or more words</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="topic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select topic</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a topic" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fixed-assets">Fixed Assets</SelectItem>
                                <SelectItem value="inventory">Inventory</SelectItem>
                                <SelectItem value="reporting">Reporting</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="" disabled={true} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="relative">
                      <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select topic</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} value={field.value} disabled={true}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a topic" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="fixed-assets">Fixed Assets</SelectItem>
                                  <SelectItem value="inventory">Inventory</SelectItem>
                                  <SelectItem value="reporting">Reporting</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <button
                        type="button"
                        className="mt-2 text-blue-600 hover:underline font-semibold"
                        onClick={() => setCurrentStep(1)}
                      >
                        Edit
                      </button>
                    </div>
                    <FormField
                      control={form.control}
                      name="issue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What does your question relate to? (optional)</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an Issue (Optional)" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ACCOUNT_ACCESS_MODIFICATION">
                                  Account access modification
                                </SelectItem>
                                <SelectItem value="DISCOUNTS_AND_PROMOTIONS">
                                  Discounts and promotions
                                </SelectItem>
                                <SelectItem value="SUBSCRIPTION_CHANGES">
                                  Subscription changes
                                </SelectItem>
                                <SelectItem value="SUBSCRIPTION_INVOICES_AND_PAYMENTS">
                                  Subscription invoices and payments
                                </SelectItem>
                                <SelectItem value="TRANSFER_SUBSCRIPTION">
                                  Transfer subscription
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tell us what happened</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Provide details" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <p className="text-sm text-gray-500">Include what you did before the problem appeared, what you have tried already, and anything else you think would be useful</p>

                    <FileInput
                      onChange={handleFileSelection}
                      label="Add Images"
                      multiple={true}
                      accept="image/*"
                      value={selectedFiles}
                    />
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <h1 className="text-xl font-bold">Share case progress with your colleagues</h1>
                    <FormField
                      control={form.control}
                      name="invitation_mail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter email address" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <div className="flex justify-between mt-6">
                  {currentStep > 1 && (
                    <Button type="button" onClick={handleBack}>
                      Back
                    </Button>
                  )}
                  {currentStep < 3 ? (
                    <Button type="button" onClick={handleNext}>
                      Next
                    </Button>
                  ) : (
                    <Button 
                      type="button" 
                      onClick={form.handleSubmit(handleSubmit)}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>

          <div className="w-full md:w-1/3 flex flex-col items-center space-y-4 px-4 md:px-0">
            <div className="relative overflow-visible">
              <img
                src="/service-hub-bot.png"
                alt="Experts ready to help"
                className="w-48 sm:w-56 md:w-64 lg:w-72 max-w-full h-auto animate-zoom"
              />
            </div>
            <div className="space-y-4">
              <ArticleCardSkeleton />
              <p className="text-gray-500 mt-4 text-center">More articles coming soon...</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}