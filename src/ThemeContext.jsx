import {createContext, useState, useContext} from "react";

const ThemeProvider = createContext()
// const ThemeUpdateContext = createContext()

export function useTheme() {
    return useContext(ThemeProvider)
}

// export function useToggle() {
//     return useContext(ThemeUpdateContext)
// }


function ThemeContext({children}) {

    const [theme, setTheme] = useState(true);

    const toggleTheme = () => {
        setTheme(prevState => !prevState)
    }

    return (
        <ThemeProvider.Provider value={{theme, toggleTheme}} >
                {children}
        </ThemeProvider.Provider>
    );
}

export default ThemeContext;