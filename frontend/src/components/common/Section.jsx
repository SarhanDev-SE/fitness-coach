// children is to render child componenets

function Section({title, description, children}){
    return (
        <section className="my-4">
            {(title || description) && (
                <div className="my-4">
                    {title && <h2 className="text-lg font-semibold">{title}</h2>}
                    {description && <p className="text-muted-foreground text-sm">{description}</p>}
                </div>
            )}

            {children}
        </section>
    )
}

export default Section;