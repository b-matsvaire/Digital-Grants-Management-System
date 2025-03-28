
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const grantFormSchema = z.object({
  title: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }),
  fundingAgency: z.string().min(2, {
    message: "Funding agency is required.",
  }),
  startDate: z.string().min(1, {
    message: "Start date is required.",
  }),
  endDate: z.string().min(1, {
    message: "End date is required.",
  }),
  amount: z.string().min(1, {
    message: "Budget amount is required.",
  }),
  category: z.string().min(1, {
    message: "Please select a grant category.",
  }),
  summary: z.string().min(50, {
    message: "Summary must be at least 50 characters.",
  }),
  objectives: z.string().min(50, {
    message: "Objectives must be at least 50 characters.",
  }),
});

type GrantFormValues = z.infer<typeof grantFormSchema>;

const GrantSubmission = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<GrantFormValues>({
    resolver: zodResolver(grantFormSchema),
    defaultValues: {
      title: "",
      fundingAgency: "",
      startDate: "",
      endDate: "",
      amount: "",
      category: "",
      summary: "",
      objectives: "",
    },
  });

  function onSubmit(data: GrantFormValues) {
    console.log(data);
    
    // Simulate submission to backend
    setTimeout(() => {
      toast({
        title: "Grant Proposal Submitted",
        description: "Your grant proposal has been successfully submitted for review.",
      });
      navigate("/dashboard/grants");
    }, 1000);
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Submit New Grant Proposal</h1>
        
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Grant Proposal Form</CardTitle>
            <CardDescription>
              Fill out the form below to submit a new grant proposal for review.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter project title" {...field} />
                        </FormControl>
                        <FormDescription>
                          Provide a clear and concise title for your research project.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="fundingAgency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Funding Agency</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter funding agency" {...field} />
                        </FormControl>
                        <FormDescription>
                          Specify the agency or organization providing the funding.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormDescription>
                          Expected project start date.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormDescription>
                          Expected project end date.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget Amount ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter budget amount" {...field} />
                        </FormControl>
                        <FormDescription>
                          Total budget requested for the project.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grant Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="research">Research Grant</SelectItem>
                            <SelectItem value="clinical">Clinical Trial</SelectItem>
                            <SelectItem value="equipment">Equipment</SelectItem>
                            <SelectItem value="travel">Travel Grant</SelectItem>
                            <SelectItem value="conference">Conference</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select the category that best describes your grant.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Summary</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide a summary of your research project" 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Brief summary of the project's purpose and goals (250-500 words).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="objectives"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Research Objectives</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List the key objectives of your research" 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Clearly state the objectives or hypotheses of your research.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end space-x-4">
                  <Button variant="outline" type="button" onClick={() => navigate('/dashboard/grants')}>
                    Cancel
                  </Button>
                  <Button type="submit">Submit Proposal</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default GrantSubmission;
