import './App.css';
import { useState } from 'react';
import Logo from "./gilbarco.png" 


function App() {
  const [valor, setvalor] = useState("0,00")
  const [volume, setvolume] = useState("0,00")
  const [troca, settroca] = useState(true)
  function adicionar(tecla){
    if(troca){
      tecla = String(tecla)
      if(valor === "0,00"){
        setvalor("")
      }
      if(tecla !== "Gum" || tecla !== "Gdois" || tecla !== "Pum" || tecla !== "Pdois" || tecla !== "$" || tecla !== "C" || tecla !== "E"){
        setvalor( mascara_valor(valor + (tecla)))
      }
      else{
        console.log("passou aqui")
        if(tecla === "Pum"){
            setvalor("5,00")
        }
      }    
    }
    else{
      
    }
  }
  function volume(){
    setvalor("0,00")
    settroca(false)
  }
  function mascara_valor(e){
    e = e.replace(/\D/g, "")
    e = e.replace(/(\d)(\d{2})$/, "$1,$2")
    e = e.replace(/(?=(\d{3})+(\D))\B/g, ".")
    if( e.substr(0, 1) === '0'){ 
      return e.substring(1)
    }
    else{
      return e
    }
  }
  return (
    <div className="App">
        <div className='tela'>
            <label>{valor}</label>
        </div>
        <div className='tela'>
            <label>{volume}</label>
        </div>
        <div className='quadro'>
          <img src={Logo} alt="logo"/>
          <div className='teclado'>
            <div onClick={(event) => adicionar(event.target.innerText)} className='tecla'>1</div>
            <div onClick={(event) => adicionar(event.target.innerText)} className='tecla'>2</div>
            <div onClick={(event) => adicionar(event.target.innerText)} className='tecla'>3</div>
            <div onClick={(event) => adicionar(event.target.id)} id="Pum" className='tecla'>P1</div>
            <div onClick={(event) => adicionar(event.target.innerText)} className='tecla'>4</div>
            <div onClick={(event) => adicionar(event.target.innerText)} className='tecla'>5</div>
            <div onClick={(event) => adicionar(event.target.innerText)} className='tecla'>6</div>
            <div onClick={(event) => adicionar(event.target.id)}  id="Pdois" className='tecla'>P2</div>
            <div onClick={(event) => adicionar(event.target.innerText)} className='tecla'>7</div>
            <div onClick={(event) => adicionar(event.target.innerText)} className='tecla'>8</div>
            <div onClick={(event) => adicionar(event.target.innerText)} className='tecla'>9</div>
            <div onClick={(event) => adicionar(event.target.innerText)} className='tecla'>$</div>
            <div onClick={(event) => adicionar(event.target.innerText)} className='tecla'>C</div>
            <div onClick={(event) => adicionar(event.target.innerText)} className='tecla'>0</div>
            <div onClick={(event) => adicionar(event.target.innerText)} className='tecla'>E</div>
            <div onClick={(event) => adicionar(event.target.innerText)} className='tecla'>V</div>
            <div onClick={(event) => adicionar(event.target.id)}  id="Gum" className='tecla'>G1</div>
            <div onClick={(event) => adicionar(event.target.innerText)} className='tecla'>◀</div>
            <div onClick={(event) => adicionar(event.target.innerText)} className='tecla'>▶</div>
            <div onClick={(event) => adicionar(event.target.id)}  id="Gdois" className='tecla'>G2</div>
          </div>
        </div>
    </div>
  );
}

export default App;
