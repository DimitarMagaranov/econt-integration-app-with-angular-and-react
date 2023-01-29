const Cut = ({cut, onSelectCutHandler, selectedCut}) => {
    return (
        <div onClick={() => onSelectCutHandler(cut)} className={selectedCut?.ml == cut.ml ? "cut-ctr selected" : "cut-ctr"}>
            <span>{cut.ml} ml</span>
            <span>
                <strong>{cut.price} lv</strong>
            </span>
        </div>
    );
};

export default Cut;
