import './App.css';
import React, { useReducer, useRef } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Diary from './pages/Diary'


const reducer = (state, action) =>{
  let newState = [];
  switch(action.type){
    case 'INIT':{
      return action.data;
    }
    case 'CREATE':{
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE':{
      newState = state.filter((it)=>it.id !== action.targetId);
      break;
    }
    case 'EDIT':{
      newState = state.map((it)=>it.id ===action.data.id ? {...action.data} : it);
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id:1,
    mood:1,
    content:"Number 1",
    date: 1699358001792
  },
  {
    id:2,
    mood:5,
    content:"Number 2",
    date: 1699358001793
  },
  {
    id:3,
    mood:3,
    content:"Number 3",
    date: 1699358001794
  },
  {
    id:4,
    mood:4,
    content:"Number 4",
    date: 1699358001795
  }
]



function App() {

  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(0);

  //CREATE
  const onCreate = (date, content, mood)=>{
    dispatch({type:'CREATE', data:{
      id: dataId.current,
      date: new Date(date).getTime(),
      content,
      mood
    }})
    dataId.current += 1;
  }

  //REMOVE
  const onRemove = (targetId) => {
    dispatch({type:'REMOVE', targetId});
  }

  //EDIT
  const onEdit = (targetId, date, content, mood)=>{
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        mood
      },
    });
  };




  return (
    <DiaryStateContext.Provider value={data}>
    <DiaryDispatchContext.Provider value={{
      onCreate,
      onEdit,
      onRemove
    }}>
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<New />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/diary/:id' element={<Diary />} />
      </Routes>
    </div>
    </BrowserRouter>
    </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;


