import './App.css';
import { useState } from 'react';
import Logo from "./gilbarco.png";
import At from "./at.png";
import Mangeuria from "./mang.png"

function App() {
  const [valor, setvalor] = useState("0,00")
  const [volume, setvolume] = useState("0,00")
  const [ direita, setdireita] = useState(0)
  const [modal_moeda, setmodal_moeda] = useState(false)
  const [modal_seta, setmodal_seta] = useState(false)
  const [troca, settroca] = useState(0)
  function adicionar(tecla){
    if(direita !==0){
      if(troca !== 0){
        if(troca === 1){
          tecla = String(tecla)
          if(valor === "0,00"){
            setvalor("")
          }
          if(tecla !== "Gum" || tecla !== "Gdois" || tecla !== "Pum" || tecla !== "Pdois" || tecla !== "$" || tecla !== "C" || tecla !== "E"){
            setvalor( mascara_valor(valor + (tecla)))
          }
          else{
            if(tecla === "Pum"){
                setvalor("5,00")
            }
          }  
        }
        else{
          tecla = String(tecla)
          if(volume === "0,00"){
            setvolume("")
          }
          if(tecla !== "Gum" || tecla !== "Gdois" || tecla !== "Pum" || tecla !== "Pdois" || tecla !== "$" || tecla !== "C" || tecla !== "E"){
            setvolume( mascara_valor(volume + (tecla)))
          }
          else{
            if(tecla === "Pum"){
                setvolume("5,00")
            }
          }  
        }
      }
      else{
        setmodal_moeda(true)
      }
    }
    else{
      setmodal_seta(true)
    }
  }
  function escolher_combustivel(val){
    if(valor ==="0,00"){
      setdireita(val)
    }
  }
  function moeda(){
    setvalor("0,00")
    settroca(1)
  }
  function vol(){
    setvalor("0,00")
    settroca(2)
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

  function abastecer(){
    var abastecimento = parseFloat((valor.replace(".", "")).replace(',', "."))
    var intervalo = abastecimento/15
    setvalor("0,00")
    setvalor(volume)
    alert('Abastecido')
  }
  return (
    <div className="App">
        <div className='abastecer' onClick={() => abastecer()}>
          <img src={Mangeuria} alt='abastecer'/>
        </div>
        <div className={modal_moeda?'modal-moeda show':'modal-moeda'}>
          <div className='alerta'>
            <img src={At} alt='atencao'/>
            <p>Escolha se o valor digitado será em reais($) ou volume(VOL)</p>
            <button onClick={() => setmodal_moeda(false)}>OK</button>
          </div>
        </div>
        <div className={modal_seta?'modal-seta show':'modal-seta'}>
          <div className='alerta'>
            <img src={At} alt='atencao'/>
            <p>Escolha qual lado da bomba será usado ◀ ▶</p>
            <button onClick={() => setmodal_seta(false)}>OK</button>
          </div>
        </div>
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
            <div onClick={(event) => moeda()} className='tecla'>$</div>
            <div onClick={(event) => adicionar(event.target.innerText)} className='tecla'>C</div>
            <div onClick={(event) => adicionar(event.target.innerText)} className='tecla'>0</div>
            <div onClick={(event) => adicionar(event.target.innerText)} className='tecla'>E</div>
            <div onClick={(event) => vol()} className='tecla'>V</div>
            <div onClick={(event) => adicionar(event.target.id)}  id="Gum" className='tecla'>G1</div>
            <div onClick={() => escolher_combustivel(1)} className='tecla'>◀</div>
            <div onClick={() => escolher_combustivel(2)} className='tecla'>▶</div>
            <div onClick={(event) => adicionar(event.target.id)}  id="Gdois" className='tecla'>G2</div>
          </div>
        </div>
    </div>
  );
}

export default App;
