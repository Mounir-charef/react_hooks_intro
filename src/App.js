import './App.css';
import {useState, useMemo, useEffect, useRef, useReducer, useCallback, useLayoutEffect} from "react";
import FuncContextComp from "./FuncContextComp";
import ThemeContext from "./ThemeContext";
import List from "./List";
import useLocal from "./useLocal";
import useUpdaterLogger from "./useUpdateLogger";

function reducer(state, action){
  switch (action.type) {
    case 'inc':
      return {counter : state.counter + 1}
    case 'dec':
      return {counter : state.counter - 1}
    default :
      return state
  }
}

function App() {
  const [dark, setDark] = useState(true),
      [number, setNumber] = useState(0),
      [name, setName] = useState(''),
      renderCount = useRef(1),
      inputRef = useRef(),
      [state, dispatch] = useReducer(reducer, {counter: 0}),
      [num, setNum] = useState(1),
      [cookie, setCookie] = useLocal('names', ['hamid','mounir']),
      [show, setShow] = useState(false),
      button = useRef(),
      popup = useRef();

  useUpdaterLogger(num)

  const doubleNumber = useMemo(() => {
    return slowFunc(number)
  }, [number])

  const x = useMemo(() => {
    return {
      backgroundColor: dark? '#282c34' : 'white',
      color: dark? 'white': '#282c34'
    }
  }, [dark]);



  useEffect(()=> {
    console.log('theme changed')
  }, [x])

  useEffect(() => {
    renderCount.current++
  }, [name])


  useLayoutEffect(() => {
    if(popup.current == null || button.current == null ) return
    const {bottom, left} = button.current.getBoundingClientRect()
    popup.current.style.top = `${bottom - 70}px`
    popup.current.style.left = `${left + 500}px`
  }, [show])

  const focus = () => {
    inputRef.current.focus()
  }

  const getItems = useCallback((inc) => {
    return [num, num + inc, num + inc*2]
  }, [num])


  function increment() {
    dispatch({type: 'inc'})
  }
  function decrement() {
    dispatch({type: 'dec'})
  }
  function saveName() {
    setCookie(prev => [...prev, name]);
    setName('');
  }


  return (
    <div className="App">
      <header className="App-header" style={x}>
        <button onClick={() => setDark(oldTheme => !oldTheme)}> Change theme </button>
        <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value))}/>
        <p>{doubleNumber}</p>
        <input value={name} ref={inputRef} onChange={e => setName(e.target.value)}/>
        <p> My name is {name}, rendered {renderCount.current}</p>
        <button onClick={focus}>Focus</button>
        <ThemeContext>
          <FuncContextComp />
        </ThemeContext>
        <div>
          <button onClick={decrement}>-</button>
          <span>{state.counter}</span>
          <button onClick={increment}>+</button>
        </div>
        <input type="number" value={num} onChange={e => setNum(parseInt(e.target.value))}/>
        <button onClick={() => setDark(oldTheme => !oldTheme)}>Toggle theme</button>
        <List getItems={getItems} />
        <button onClick={saveName}> save name </button>
        {cookie.map(name => <span key={name}>{name}</span>)}
        <div className='useLayoutEffect'>
          <button ref={button} onClick={() => setShow(prev => !prev)}>
            Click here
          </button>
          {show && (
              <div style={{position: 'absolute'}} ref={popup}>
                This is a popup with useLayoutEffect
              </div>
          )}
        </div>
      </header>
    </div>
  );
}

const slowFunc = n => {
  console.log('calling the func');
  for(let i=0;i<=1000000000;i++){}
  return n*2
}
export default App;
