function PageHeader({title, description, action}){
    return(
        <div className="flex items-center justify-between my-2">
            <div>
                <h1 className="text-2xl font-bold">{title}</h1>

                {description && 
                <p className="text-gray-500">{description}</p>
                }
            </div>
            {/* we can also pass an action so we can add buttons here, eg start workout */}
            {action && <div>{action}</div>}
        </div>
    )
}

export default PageHeader;