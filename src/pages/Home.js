import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import Header from './../components/Header';
import MyButton from './../components/MyButton';
import DiaryList from "../components/DiaryList";

const Home = () => {

    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const headText = `${curDate.getFullYear()} ${month[curDate.getMonth()]}`
    
    useEffect( () => {
        if(diaryList.length >= 1){
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();
            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth()+1,
                0,
                23,
                59,
                59
            ).getTime();
    
            setData(diaryList.filter((it)=>firstDay<=it.date&&it.date<=lastDay));
        }  
    }, [diaryList, curDate]);

    const increaseMonth = () =>{
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate()));
    };
    const decreaseMonth = () =>{
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate()));
    };

    return(
        <div>
            <Header headText={headText}
                leftChild={<MyButton text={'<'} onClick={decreaseMonth} />}
                rightChild={<MyButton text={'>'} onClick={increaseMonth} />}
                />
            <DiaryList diaryList={data}/>
        </div>
    );
};

export default Home;