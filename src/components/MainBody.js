import ExpandList from './ExpandList.js';

function MainBody() {
    return (
        <div className="body">
            <div className="mid">
                <h2>Name of the Record</h2>
                <p>Person Name</p>
                <p>View: <a>Record</a></p>
                <ExpandList category="Parents" />

                {/*<ExpandList category="Spouses"/>
                <ExpandList category="Children"/>
                get the parents children
                <ExpandList category="Siblings"/>
                <ExpandList category="Others References"/> */}
            </div>
        </div>  
    );
}

export default MainBody;