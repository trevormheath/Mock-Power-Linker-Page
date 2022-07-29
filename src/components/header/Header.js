import "./Header.css";

function Header({ json }) {
  let personName =
    json != null
      ? json.persons[1].names[0].nameForms[0].fullText
      : "Loading...";

  return (
    <div className="header">
      <div className="header_main">
        <div className="header_content">
          <p>
            Go to: <a href="#top">Record</a> | <a href="#top">{personName}</a>
          </p>
          <h1>Attach Historical Records to Family Tree</h1>
        </div>
        <img
              className="logo"
              src={require("../../assets/RLL_Logo_Full.png")}
              alt="Record Linking Lab Logo"
            />
      </div>
      <div className="bar" />
    </div>
  );
}

export default Header;
