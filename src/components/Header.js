
function Header({json}) {
    let personName = json != null ? json.persons[1].names[0].nameForms[0].fullText : "Loading...";


    return (
        <div className="header">
            <div className="mid">
                 <p>Go to: <a>Record</a> | <a>{personName}</a></p>
                 <h1>Attach Historical Records to Family Tree</h1>
            </div>
        </div>  
    );
}

export default Header;
