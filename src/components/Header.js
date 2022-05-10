
function Header({name}) {
    return (
        <div className="header">
            <div className="mid">
                 <p>Go to: <a>Record</a> | <a>{name}</a></p>
                 <h1>Attach Historical Records to Family Tree</h1>
            </div>
        </div>  
    );
}

export default Header;
