import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({id, mood, content, date}) => {

    const navigate = useNavigate();
    const goDetail = () => {
        navigate(`/diary/${id}`);
    };
    const goEdit = () => {
        navigate(`/edit/${id}`)
    }

    const strDate = new Date(parseInt(date)).toLocaleDateString();

    return(
        <div className="DiaryItem">
            <div onClick={goDetail} className={["moodImgWrapper", `moodImgWrapper_${mood}`].join(" ")}>
                <img src={process.env.PUBLIC_URL + `assets/emotion${mood}.png`} />
            </div>

            <div onClick={goDetail} className="infoWrapper">
                <div className="diaryDate">{strDate}</div>
                <div className="diaryContentPreview">{content.slice(0, 25)}</div>
            </div>

            <div className="btnWrapper">
                <MyButton onClick={goEdit} text={"Edit"} />
            </div>
        </div>
    );
};

export default DiaryItem;