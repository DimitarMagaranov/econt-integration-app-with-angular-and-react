import { ICut } from "../../interfaces/cut";
import {Cut} from "../Cut/Cut";

const CutList = ({ cuts, onSelectCutHandler, selectedCut }
    : {cuts: ICut[], onSelectCutHandler: (cut: ICut) => void, selectedCut: ICut}) => {
    return (
        <div className="product-cuts-ctr">
            {cuts.map((x) => <Cut key={x.ml} cut={x} onSelectCutHandler={onSelectCutHandler} selectedCut={selectedCut} />)}
        </div>
    );
};

export {CutList};
