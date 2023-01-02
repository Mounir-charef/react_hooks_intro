import {useState, useTransition} from "react";

function RestOfHooks() {

    const [input, setInput] = useState("");
    const [list, setList] = useState([]);
    const [isPending, startTransition] = useTransition();
    const LIST_SIZE = 20000;

    function handleChange(e) {
        setInput(e.target.value);
        startTransition(() => {
            const l = [];
            for(let i=0; i<LIST_SIZE; i++){
                l.push(e.target.value);
            }
            setList(l);
        });
    }

    return (
        <div>
            <div className="UseTransition">
                <input type="text" value={input}
                    onChange={handleChange}/>
                {isPending? <h2>Loading...</h2> :
                    list.map((item, index) => {
                        return <div key={index}>{index} - {item}</div>
                    })
                }
            </div>
        </div>
    );
}

export default RestOfHooks;