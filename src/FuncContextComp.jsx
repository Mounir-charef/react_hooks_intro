import {useTheme} from "./ThemeContext";

function FuncContextComp() {
    const context = useTheme(),
        {theme, toggleTheme} = context;
    // const update = useToggle()
    const themes = {
        backgroundColor: theme ? '#202020' : 'white',
        color: theme ? 'red' : 'blue'
    }
    return (
            <div style={themes}>
                <button onClick={() => toggleTheme()}> change </button>
                <p>Context manager</p>
            </div>
    );
}

export default FuncContextComp;