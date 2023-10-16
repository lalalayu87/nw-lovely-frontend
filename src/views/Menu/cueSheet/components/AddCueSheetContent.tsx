const AddCueSheetContent = ({ isOpen, onClose }) => {
    return (
        <div className={`dialog ${isOpen ? 'open' : ''}`}>
            <div className="content">
                {/* 팝업 내용 */}
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    )
}

export default AddCueSheetContent
