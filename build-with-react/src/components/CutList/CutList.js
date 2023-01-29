import Cut from "../Cut/Cut";

const CutList = ({ cuts, onSelectCutHandler, selectedCut }) => {
    return (
        <div className="product-cuts-ctr">
            {cuts.map((x) => <Cut key={x.ml} cut={x} onSelectCutHandler={onSelectCutHandler} selectedCut={selectedCut} />)}
        </div>
    );
};

export default CutList;
