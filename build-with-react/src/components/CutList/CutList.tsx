import { Box } from "@mui/material";

import { ICut } from "../../interfaces/cut";
import {Cut} from "../Cut/Cut";

const CutList = ({ cuts, onSelectCutHandler, selectedCut }
    : {cuts: ICut[], onSelectCutHandler: (cut: ICut) => void, selectedCut: ICut}) => {
    return (
        <Box sx={{marginBottom: '30px', display: 'flex', gap: '12px'}} className="product-cuts-ctr">
            {cuts.map((x) => <Cut key={x.ml} cut={x} onSelectCutHandler={onSelectCutHandler} selectedCut={selectedCut} />)}
        </Box>
    );
};

export {CutList};
