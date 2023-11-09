const MoodItem = ({moodId, moodImg, moodDesc, onClick, isSelected}) => {
    return(
        <div onClick={() => onClick(moodId)} className={["MoodItem", 
            isSelected?`MoodItemOn${moodId}`:`MoodItemOff`].join(" ")}>
            <img src={moodImg} />
            <span>{moodDesc}</span>
        </div>
    );
};

export default MoodItem;