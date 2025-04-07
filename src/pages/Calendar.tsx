
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Calendar as CalendarIcon } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useState } from "react";

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const events = [
    { id: 1, title: "NIH Grant Submission Deadline", date: "2025-04-15" },
    { id: 2, title: "Progress Report Due", date: "2025-05-01" },
    { id: 3, title: "Grant Review Meeting", date: "2025-04-10" },
    { id: 4, title: "Research Team Meeting", date: "2025-04-12" },
    { id: 5, title: "WHO Grant Application Opens", date: "2025-04-20" }
  ];
  
  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = events.filter(event => event.date >= today);
  
  return (
    <DashboardLayout userRole="researcher">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Calendar</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5" />
                Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex flex-col space-y-1 border-l-4 border-primary pl-4 py-2">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
