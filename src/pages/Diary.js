import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date";
import Header from "../components/Header";
import MyButton from "../components/MyButton";
import { moodList } from "../util/mood";

const Diary = () => {
    const {id} = useParams();
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [data, setData] = useState();

    useEffect(()=>{
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = `Diary No. ${id}`;
    }, []);

    useEffect(()=>{
        if(diaryList.length >= 1){
            const targetDiary = diaryList.find(
                (it)=>parseInt(it.id)===parseInt(id));
        if(targetDiary){
            setData(targetDiary);
        } else{
            alert("Diary does not exist.");
            navigate('/', {replace: true});
        }
      }
    }, [id, diaryList]);

    if(!data){
        return<div className="DiaryPage">Loading...</div>;
    } else{
        const curMoodData = moodList.find((it)=>parseInt(it.moodId)===parseInt(data.mood));

        return(
            <div className="DiaryPage">
                <Header headText={`${getStringDate(new Date(data.date))}`}
                    leftChild={<MyButton text={'< Back'} onClick={() => navigate(-1)}/>}
                    rightChild={<MyButton text={'Edit'} onClick={() => navigate(`/edit/${data.id}`)}/>}
                    />
            <article>
                <section>
                    <h4>Today's Mood</h4>
                    <div className={["diaryImgWrapper",`diaryImgWrapper${data.mood}`].join(" ")}>
                        <img src={curMoodData.moodImg} />
                        <div className="moodDescription">
                            {curMoodData.moodDesc}
                        </div>
                    </div>
                </section>
                <section>
                    <h4>Today's Diary</h4>
                    <div className="diaryContentWrapper">
                        <p>{data.content}</p>
                    </div>
                </section>
            </article>
            </div>
        );
    }    
};

export default Diary;