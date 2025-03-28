
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Clock,
  User,
  Tag
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Sample calendar events
const events = [
  {
    id: "1",
    title: "Grant Submission Deadline - NIH R01",
    date: "2023-11-15",
    type: "deadline",
    project: "Novel Biomarkers for Early Cancer Detection",
    description: "Final deadline for R01 grant submission to the National Institutes of Health.",
  },
  {
    id: "2",
    title: "Quarterly Progress Review Meeting",
    date: "2023-11-10",
    time: "10:00 AM - 12:00 PM",
    type: "meeting",
    project: "Immunotherapy Response in Pediatric Patients",
    description: "Review progress with research team and stakeholders.",
  },
  {
    id: "3",
    title: "MidTerm Report Due",
    date: "2023-11-20",
    type: "report",
    project: "Machine Learning in Precision Medicine",
    description: "Submit mid-term report to the funding agency.",
  },
  {
    id: "4",
    title: "Equipment Installation - Mass Spectrometer",
    date: "2023-11-08",
    time: "9:00 AM - 5:00 PM",
    type: "event",
    project: "Novel Biomarkers for Early Cancer Detection",
    description: "Installation and calibration of new mass spectrometer.",
  },
  {
    id: "5",
    title: "IRB Protocol Amendment Due",
    date: "2023-11-25",
    type: "deadline",
    project: "Immunotherapy Response in Pediatric Patients",
    description: "Submit protocol amendments to the Institutional Review Board.",
  },
  {
    id: "6",
    title: "Data Analysis Workshop",
    date: "2023-11-17",
    time: "1:00 PM - 4:00 PM",
    type: "workshop",
    project: "Machine Learning in Precision Medicine",
    description: "Team workshop on advanced data analysis techniques.",
  },
  {
    id: "7",
    title: "Budget Review Meeting",
    date: "2023-11-30",
    time: "2:00 PM - 3:30 PM",
    type: "meeting",
    project: "Cardiovascular Health in Urban Populations",
    description: "Financial review with grant administrators.",
  },
];

// Generate grid of days for the current month
const generateCalendarDays = (month: number, year: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  const days = [];
  
  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      month: month - 1,
      year,
      isCurrentMonth: false
    });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      month,
      year,
      isCurrentMonth: true
    });
  }
  
  // Next month days
  const remainingDays = 42 - days.length; // 6 rows * 7 days
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      month: month + 1,
      year,
      isCurrentMonth: false
    });
  }
  
  return days;
};

// Get events for a specific day
const getEventsForDay = (day: number, month: number, year: number) => {
  const date = new Date(year, month, day).toISOString().split('T')[0];
  return events.filter(event => event.date === date);
};

const CalendarPage = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = React.useState(today.getMonth());
  const [currentYear, setCurrentYear] = React.useState(today.getFullYear());
  const [selectedFilter, setSelectedFilter] = React.useState("all");
  const [selectedDay, setSelectedDay] = React.useState<null | {day: number, month: number, year: number}>(null);
  
  const calendarDays = generateCalendarDays(currentMonth, currentYear);
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
  };
  
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
  };
  
  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDay({
      day: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear()
    });
  };
  
  // Get events for selected day
  const selectedDayEvents = selectedDay 
    ? getEventsForDay(selectedDay.day, selectedDay.month, selectedDay.year)
      .filter(event => selectedFilter === "all" || event.type === selectedFilter)
    : [];
  
  // Get events for the current month
  const currentMonthEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === currentMonth && 
           eventDate.getFullYear() === currentYear &&
           (selectedFilter === "all" || event.type === selectedFilter);
  });
  
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Calendar</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Event
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {monthNames[currentMonth]} {currentYear}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={goToToday}>
                      Today
                    </Button>
                    <Button variant="outline" size="icon" onClick={goToNextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter events" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="deadline">Deadlines</SelectItem>
                      <SelectItem value="meeting">Meetings</SelectItem>
                      <SelectItem value="report">Reports</SelectItem>
                      <SelectItem value="event">Events</SelectItem>
                      <SelectItem value="workshop">Workshops</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1">
                  {/* Day names */}
                  {dayNames.map(day => (
                    <div key={day} className="h-8 flex items-center justify-center font-medium text-sm text-muted-foreground">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar days */}
                  {calendarDays.map((day, index) => {
                    const dayEvents = getEventsForDay(day.day, day.month, day.year)
                      .filter(event => selectedFilter === "all" || event.type === selectedFilter);
                    const isToday = today.getDate() === day.day && 
                                    today.getMonth() === day.month && 
                                    today.getFullYear() === day.year;
                    const isSelected = selectedDay &&
                                      selectedDay.day === day.day &&
                                      selectedDay.month === day.month &&
                                      selectedDay.year === day.year;
                    
                    return (
                      <div 
                        key={index} 
                        className={`min-h-[100px] p-1 border rounded-md flex flex-col ${
                          day.isCurrentMonth ? 'bg-background' : 'bg-muted/50 text-muted-foreground'
                        } ${
                          isToday ? 'border-primary' : 'border-border'
                        } ${
                          isSelected ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedDay(day)}
                      >
                        <div className={`text-right p-1 ${
                          isToday ? 'font-bold text-primary' : ''
                        }`}>
                          {day.day}
                        </div>
                        <div className="flex flex-col gap-1 overflow-hidden">
                          {dayEvents.slice(0, 3).map((event, idx) => (
                            <div 
                              key={idx} 
                              className={`text-xs rounded px-1 py-0.5 truncate ${
                                event.type === 'deadline' ? 'bg-red-100 text-red-800' :
                                event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                                event.type === 'report' ? 'bg-amber-100 text-amber-800' :
                                event.type === 'workshop' ? 'bg-purple-100 text-purple-800' :
                                'bg-green-100 text-green-800'
                              }`}
                              title={event.title}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="text-xs text-muted-foreground px-1">
                              +{dayEvents.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDay 
                    ? `Events for ${monthNames[selectedDay.month]} ${selectedDay.day}, ${selectedDay.year}` 
                    : `Upcoming Events (${monthNames[currentMonth]} ${currentYear})`}
                </CardTitle>
                <CardDescription>
                  {selectedDay 
                    ? `${selectedDayEvents.length} event${selectedDayEvents.length !== 1 ? 's' : ''}` 
                    : `${currentMonthEvents.length} event${currentMonthEvents.length !== 1 ? 's' : ''}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(selectedDay ? selectedDayEvents : currentMonthEvents).length > 0 ? (
                    (selectedDay ? selectedDayEvents : currentMonthEvents).map(event => (
                      <Card key={event.id} className="overflow-hidden">
                        <div className={`h-2 ${
                          event.type === 'deadline' ? 'bg-red-500' :
                          event.type === 'meeting' ? 'bg-blue-500' :
                          event.type === 'report' ? 'bg-amber-500' :
                          event.type === 'workshop' ? 'bg-purple-500' :
                          'bg-green-500'
                        }`}></div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold truncate">{event.title}</h3>
                          
                          <div className="mt-2 space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            
                            {event.time && (
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{event.time}</span>
                              </div>
                            )}
                            
                            <div className="flex items-center gap-2">
                              <Tag className="h-4 w-4 text-muted-foreground" />
                              <Badge variant="outline" className="capitalize">
                                {event.type}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="truncate" title={event.project}>
                                {event.project}
                              </span>
                            </div>
                          </div>
                          
                          {event.description && (
                            <p className="mt-2 text-sm text-muted-foreground">
                              {event.description}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      No events found for the selected criteria.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
