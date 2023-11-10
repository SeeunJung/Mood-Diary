import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import MyButton from "./MyButton";
import MoodItem from "./MoodItem";
import { DiaryDispatchContext } from "../App";
import { getStringDate } from "../util/date";
import { moodList } from "../util/mood";

const DiaryEditor = ({isEdit, originData}) => {
    const contentRef = useRef();
    const [content, setContent] = useState("");
    const [date, setDate] = useState(getStringDate(new Date()));
    const [mood, setMood] = useState(3);

    const {onCreate, onEdit, onRemove} = useContext(DiaryDispatchContext);
    const navigate = useNavigate();

    const handleClickMood = useCallback((mood) =>{
        setMood(mood);
    }, []);

    const handleSubmit = () => {
        if(content.length<1){
            contentRef.current.focus();
            return;
        }
        if(window.confirm(isEdit?"Edit Diary?":"Save New Diary")){
            if(!isEdit){
                onCreate(date, content, mood);
            } else{
                onEdit(originData.id, date, content, mood);
            }
        }
        navigate('/', {replace: true});
    };

    const handleRemove = () => {
        if(window.confirm('Delete Diary?')){
            onRemove(originData.id);
            navigate('/', {replace:true})
        }
    };

    useEffect(()=>{
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setMood(originData.mood);
            setContent(originData.content);
        }
    }, [isEdit, originData])
    

    return(
        <div className="DiaryEditor">
            <Header 
                headText={isEdit?"Edit Diary":"New Diary"} 
                leftChild={<MyButton text={"< Back"} onClick={()=>navigate(-1)}/>}
                rightChild={
                    isEdit&&(<MyButton text={"Delete"} type={'negative'}
                    onClick={handleRemove}/>)}
            />
            <div>
                <section>
                    <h4>Date</h4>
                    <div className="inputBox">
                        <input 
                            className="inputDate"
                            value={date} onChange={(e)=>setDate(e.target.value)}
                            type="date" />
                    </div>
                </section>
                <section>
                    <h4>Today's Mood</h4>
                    <div className="inputBox moodListWrapper">
                        {moodList.map((it)=>(
                            <MoodItem key={it.moodId}{...it} onClick={handleClickMood}
                                isSelected={it.moodId === mood}/>
                        ))}
                    </div>
                </section>
                <section>
                    <h4>Today's Diary</h4>
                    <div className="inputBox textWrapper">
                        <textarea placeholder="How was your day?" ref={contentRef} value={content} onChange={(e)=>setContent(e.target.value)}/>
                    </div>
                </section>
                <section>
                    <div className="controlBox">
                        <MyButton text={"Cancel"} onClick={()=>navigate(-1)}/>
                        <MyButton text={"Save"} type={"positive"} onClick={handleSubmit}/>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;