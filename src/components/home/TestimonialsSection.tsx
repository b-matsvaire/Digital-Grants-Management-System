
const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">What Researchers Say</h2>
          <p className="text-muted-foreground">
            Hear from researchers who have transformed their grant management process
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-white border border-border shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-grant-blue/10 flex items-center justify-center">
                <span className="text-grant-blue font-bold">JD</span>
              </div>
              <div>
                <h4 className="font-semibold">Dr. Jane Doe</h4>
                <p className="text-sm text-muted-foreground">Principal Investigator</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              "This platform has saved me countless hours on administrative tasks, allowing me to focus on my research. The deadline reminders are particularly helpful."
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-white border border-border shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-grant-purple/10 flex items-center justify-center">
                <span className="text-grant-purple font-bold">MS</span>
              </div>
              <div>
                <h4 className="font-semibold">Prof. Michael Smith</h4>
                <p className="text-sm text-muted-foreground">Department Chair</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              "The financial tracking features provide unprecedented transparency. I can now easily monitor department-wide grant performance at a glance."
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-white border border-border shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-grant-green/10 flex items-center justify-center">
                <span className="text-grant-green font-bold">LJ</span>
              </div>
              <div>
                <h4 className="font-semibold">Dr. Lisa Johnson</h4>
                <p className="text-sm text-muted-foreground">Grant Administrator</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              "Managing multiple grants used to be a nightmare. Now I have everything organized in one place with automated reports that save hours of work each week."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
