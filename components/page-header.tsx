interface PageHeaderProps {
  title: string
  description?: string
  image?: string
}

export function PageHeader({ title, description, image }: PageHeaderProps) {
  return (
    <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">{title}</h1>
          {description && (
            <p className="text-lg md:text-xl text-muted-foreground animate-slide-up" style={{ animationDelay: "0.1s" }}>
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
