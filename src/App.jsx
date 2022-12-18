
import './App.css'
import star from "../src/download.png"
import { useState , useEffect} from 'react'

const getLocalData=()=>{
  const lists = localStorage.getItem("myThings");
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return[];
  }
}

function App() {
  const [inputdata, setInputData]=useState("");
  const [items, setItems]=useState(getLocalData());
  const [isEditItem, setIsEditItem]=useState("");
  const [toggleButton, setToggleButton]=useState(false);

  const addItem =() =>{
    if(!inputdata){
      alert("Add the item!")
    }
    else if(inputdata && toggleButton){
      setItems(
        items.map((curElem)=>{
          if(curElem.id === isEditItem){
            return{...curElem, name: inputdata}
          }
          else{
            return curElem;
          }
        })
      )
      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    }
    else{
      const myNewInputData ={
        id: new Date().getTime().toString(),
        name: inputdata,
      }
      setItems([...items, myNewInputData])
      setInputData("");
    }
  };
  const editItem=(index)=>{
    const item_todo_edited =find((curElem)=>{
      return curElem.id ===index;
    })
    setInputData(item_todo_edited);
    setIsEditItem(index);
    setToggleButton(true);
  }
  const delteItem =(index) => {
    const updatedItems = items.filter((curElem) =>{
      return curElem.id !== index;
    })
    
    setItems(updatedItems);
  };

  const removeAll=()=>{
    setItems([]);
  };

  useEffect(()=>{
    localStorage.setItem("myThings",JSON.stringify(items))
  },[items]);


  return (
    <div className="main-div">
      <div className='child-div'>
        <figure>
          <img src={star} alt='image'/>
          <figcaption>Add your daily to-do list here</figcaption>
        </figure>

        <div className='addItems'>
          <input type="text" placeholder="🧐 Add here" className='form-control' value={inputdata} onChange={(event)=> setInputData(event.target.value)} />
          {toggleButton ? (<i className="fa fa-edit add-btn" onClick={addItem}></i>):(<i className="fa fa-plus add-btn" onClick={addItem}></i>)}
          
        </div>

        <div className='showItems'>
          {items.map((curElem, index)=>{return(
             <div className='eachItem' key={curElem.id}>
             <h3>{curElem.name}</h3>
             <div className='todo-btn'>
             <i className="far fa-edit add-btn" onClick={()=> editItem(curElem.id)}></i>
             <i className="far fa-trash-alt add-btn" onClick={()=> delteItem(curElem.id)}></i>
             </div>
           </div>
          );})}
         
        </div>

        <div className='showItems'>
          <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>All Done</span></button></div>
      </div>
    </div>
  )
}

export default App
