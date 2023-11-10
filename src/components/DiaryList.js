import React, { useState } from "react";
import MyButton from "./MyButton";
import { useNavigate } from 'react-router-dom';
import DiaryItem from "./DiaryItem";

const ControlMenu = React.memo(({value, onChange, optionList}) => {
    return (
        <select className="ControlMenu" value={value} onChange={(e)=>onChange(e.target.value)}>
        {optionList.map((it, idx)=>(
            <option key={idx} value={it.value}>
                {it.name}
            </option>
            ))}
        </select>
    );
});

const sortOptionList = [
    {value:"Latest", name:"Latest"},
    {value:"Earliest", name:"Earliest"},
];

const filterOptionList = [
    {value:"All", name:"All"},
    {value:"Good", name:"Good Mood"},
    {value:"Bad", name:"Bad Mood"}
];

const DiaryList = ({diaryList}) => {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState('Latest');
    const [filter, setFilter] = useState("All");
    
    const getProcessedDiaryList = () => {
        const filterCallBack = (item) => {
            if(filter==="Good"){
                return parseInt(item.mood)<=3;
            }else{
                return parseInt(item.mood)>3;
            }
        }
        const compare = (a, b) =>{
            if(sortType==="Latest"){
                return parseInt(b.date) - parseInt(a.date);
            } else{
                return parseInt(a.date) - parseInt(b.date);
            }  
        }
        const copyList = JSON.parse(JSON.stringify(diaryList));
        const filteredList = filter ==="All"? copyList : copyList.filter((it)=>filterCallBack(it));
        const sortedList = filteredList.sort(compare);
        return sortedList;
    }
    
    return (
    <div className="DiaryList">
        <div className="menuWrapper">
            <div className="leftCol">
            <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList}/>
            <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
            </div>
            <div className="rightCol">
            <MyButton type={'positive'} text={'New Diary'} onClick={()=>navigate('/new')}/>
            </div>
        </div>

        {getProcessedDiaryList().map((it)=>(
            <DiaryItem key={it.id}{...it}/>
        ))}
    </div>
    );
};

DiaryList.defaultProps={
    diaryList: [],
};

export default DiaryList;