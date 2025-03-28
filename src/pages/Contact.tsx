
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  User
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  topic: z.string({
    required_error: "Please select a topic.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'system', message: 'Welcome to our live chat support. How can we help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      topic: "",
      message: "",
    },
  });

  function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
      });
      setIsSubmitting(false);
      form.reset();
    }, 1500);
  }

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // Add user message
    setChatMessages([...chatMessages, { sender: 'user', message: chatInput }]);
    setChatInput('');
    
    // Simulate response
    setTimeout(() => {
      setChatMessages(prevMessages => [
        ...prevMessages, 
        { 
          sender: 'system', 
          message: 'Thank you for your message. One of our grant specialists will assist you shortly.' 
        }
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-secondary py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
              <p className="text-lg text-muted-foreground">
                Get in touch with our team for support with grants, technical assistance, or general inquiries
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-[#DC2626]/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-[#DC2626]" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-muted-foreground">grants@university.edu</p>
                      <p className="text-sm text-muted-foreground">For general inquiries</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-[#DC2626]/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-[#DC2626]" />
                    </div>
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-muted-foreground">+1 (234) 567-8901</p>
                      <p className="text-sm text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-[#DC2626]/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-[#DC2626]" />
                    </div>
                    <div>
                      <h4 className="font-medium">Visit Us</h4>
                      <p className="text-muted-foreground">123 University Ave</p>
                      <p className="text-muted-foreground">Research Building, Suite 400</p>
                      <p className="text-sm text-muted-foreground">By appointment only</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-[#DC2626]/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-[#DC2626]" />
                    </div>
                    <div>
                      <h4 className="font-medium">Support Hours</h4>
                      <p className="text-muted-foreground">Monday - Friday: 9am - 5pm</p>
                      <p className="text-sm text-muted-foreground">Weekends: Closed</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button 
                    className="w-full flex items-center gap-2 bg-[#DC2626] hover:bg-[#b91c1c]"
                    onClick={() => setShowChat(!showChat)}
                  >
                    <MessageSquare className="h-4 w-4" />
                    {showChat ? 'Close Chat Support' : 'Open Chat Support'}
                  </Button>
                </div>
              </div>
              
              {/* Form or Chat */}
              <div className="lg:col-span-2">
                {showChat ? (
                  <Card className="h-[500px] flex flex-col">
                    <CardHeader>
                      <CardTitle>Live Chat Support</CardTitle>
                      <CardDescription>
                        Chat with our support team in real-time
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                        {chatMessages.map((msg, index) => (
                          <div 
                            key={index} 
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-[80%] p-3 rounded-lg ${
                                msg.sender === 'user' 
                                  ? 'bg-[#DC2626] text-white' 
                                  : 'bg-secondary'
                              }`}
                            >
                              {msg.sender === 'system' && (
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                                    <User className="h-3 w-3 text-[#DC2626]" />
                                  </div>
                                  <span className="text-xs font-medium">Support Agent</span>
                                </div>
                              )}
                              <p>{msg.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <form onSubmit={handleSendChatMessage} className="flex gap-2">
                        <Input 
                          value={chatInput} 
                          onChange={(e) => setChatInput(e.target.value)} 
                          placeholder="Type your message..." 
                          className="flex-1"
                        />
                        <Button 
                          type="submit" 
                          className="bg-[#DC2626] hover:bg-[#b91c1c]" 
                          disabled={!chatInput.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Send a Message</CardTitle>
                      <CardDescription>
                        Fill out the form below and we'll get back to you as soon as possible
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your email" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="topic"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Topic</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a topic" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="general">General Inquiry</SelectItem>
                                    <SelectItem value="support">Technical Support</SelectItem>
                                    <SelectItem value="submission">Grant Submission</SelectItem>
                                    <SelectItem value="financial">Financial Management</SelectItem>
                                    <SelectItem value="reporting">Reporting</SelectItem>
                                    <SelectItem value="ip">IP Management</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Please describe your inquiry in detail" 
                                    className="min-h-[120px]" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit" 
                            className="w-full bg-[#DC2626] hover:bg-[#b91c1c]"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-soft">
                  <h3 className="text-lg font-medium mb-2">How do I submit a grant proposal?</h3>
                  <p className="text-muted-foreground">
                    You can submit a grant proposal by creating an account, logging in, and navigating to the "My Grants" section. From there, click on "New Grant Proposal" and follow the guided form.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-soft">
                  <h3 className="text-lg font-medium mb-2">What types of financial reports can I generate?</h3>
                  <p className="text-muted-foreground">
                    Our platform allows you to generate various financial reports including budget summaries, expense reports, procurement tracking, and financial compliance documentation.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-soft">
                  <h3 className="text-lg font-medium mb-2">How does the deadline tracking feature work?</h3>
                  <p className="text-muted-foreground">
                    The system automatically tracks important deadlines related to your grants, including submission dates, reporting deadlines, and project milestones. You'll receive email notifications and dashboard alerts as deadlines approach.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-soft">
                  <h3 className="text-lg font-medium mb-2">How do I document student participation in my research?</h3>
                  <p className="text-muted-foreground">
                    You can record student participation through the Students section of your project dashboard. Add student details, assign roles, track hours, and document their contributions to the research.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
