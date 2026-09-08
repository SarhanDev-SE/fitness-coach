function PageHeader({title, description, action}){
    return(
        <div className="flex items-center justify-between my-2">
            <div>
                <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-wide uppercase text-foreground">{title}</h1>

                {description && 
                <p className="text-muted-foreground text-sm mt-0.5">{description}</p>
                }
            </div>
            {/* we can also pass an action so we can add buttons here, eg start workout */}
            {action && <div>{action}</div>}
        </div>
    )
}

export default PageHeader;