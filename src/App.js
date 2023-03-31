import './App.css';
import { useEffect, useState } from 'react';
import Logo from "./gilbarco.png";
import At from "./at.png";
import Mangeuria from "./mang.png"
import Erro from "./error.png"
import { useRef } from 'react';

function App() {
  const inputRef = useRef();
  const [valor, setvalor] = useState("0,00")
  const [volume, setvolume] = useState("0,00")
  const [direita, setdireita] = useState(0)
  const [bomba, setbomba] = useState(false)
  const [modal_moeda, setmodal_moeda] = useState(false)
  const [modal_erro, setmodal_erro] = useState(false)
  const [modal_seta, setmodal_seta] = useState(false)
  const [troca, settroca] = useState(0)
  const [pergunta_principal, setpergunta_principal] = useState("")
  const [resposta, setresposta] = useState("")
  const [tipo, settipo] = useState("")
  const problemas = [
    {q:"Colocar R$ 10.00 de gasolina aditivada", r:"10,00", tipo:1}, 
    {q:"R$ 15.00 de gasolina comum", r:"15,00", tipo:1},
    {q:"Colocar R$ 121.75 de gasolina comum", r:"121,75", tipo:1},
    {q:"Colocar R$ 15.00 de gasolina aditivada", r:"15,00", tipo:1},
    {q:"Botar R$ 84.20 de gasolina comum no tanque", r:"84,20", tipo:1},
    {q:"Abastecer 2 litros de gasolina aditivada", r:"2,00", tipo:2},
    {q:"Colocar 4 litros de gasolina aditivada", r:"4,00", tipo:2},
    {q:"Botar 24 litros de gasolina comum", r:"24,00", tipo:2},
    {q:"Bote R$ 130.20 de gasolina comum", r:"130,20", tipo:1},
    {q:"7 litros de gasolina comum", r:"7,00", tipo:2},
    {q:"14 litros de gasolina aditivada", r:"14,00", tipo:2},
    {q:"Abastecer R$ 13.00 de gasolina comum", r:"13,00", tipo:1},
  ]
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
    setvolume("0,00")
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
    if(valor === resposta && tipo === troca || volume === resposta && tipo === troca){
      //inputRef.current.focus()
      setbomba(true)
      var abastecimento = parseFloat((valor.replace(".", "")).replace(',', "."))
      var intervalo = abastecimento/15
      setvalor("0,00")
      setvolume('0,00')
      setTimeout(() => {
        gerar_pergunta()
      }, 2000);
      setbomba(false)
    }
    else{
      setmodal_erro(true)
    }
  }
  useEffect(()=>{
    gerar_pergunta()
  }, [])
  function gerar_pergunta(){
    var pergunta_inicial = problemas[Math.floor(Math.random() * (problemas.length - 1 + 1)) + 1] 
    setpergunta_principal(pergunta_inicial.q)
    setresposta(pergunta_inicial.r)
    settipo(pergunta_inicial.tipo)
  }
  return (
    <div className="App">
        <div className={bomba?'abastecer show':'abastecer'} onClick={() => abastecer()}>
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
        <div className={modal_erro?'modal-erro show':'modal-erro'}>
          <div className='alerta'>
            <img src={Erro} alt='atencao'/>
            <p>Ops! Você deve ter errado alguma coisa</p>
            <button onClick={() => setmodal_erro(false)}>OK</button>
          </div>
        </div>
        <div className='pergunta'>
          <p>{pergunta_principal}</p>
        </div>
        <div className={bomba?'tela show':'tela'}>
            <label>{valor}</label>
        </div>
        <div className={bomba?'tela show':'tela'}>
            <label>{volume}</label>
        </div>
        <div className='quadro'>
          <img src={Logo} ref={inputRef} alt="logo"/>
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
