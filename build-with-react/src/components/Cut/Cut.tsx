import { Box, Typography } from "@mui/material";

import { ICut } from "../../interfaces/cut";

const Cut = ({cut, onSelectCutHandler, selectedCut}:
    {cut: ICut, onSelectCutHandler: (cut: ICut) => void, selectedCut: ICut}) => {
    return (
        <Box sx={{
                display: 'flex',
                gap: '5px', border: '1px solid #d7e1e1',
                padding: '6px', cursor: 'pointer',
                backgroundColor: selectedCut?.ml == cut.ml ? '#d7e1e1' : 'none'
            }}
            onClick={() => onSelectCutHandler(cut)}
            className={selectedCut?.ml == cut.ml ? "cut-ctr selected" : "cut-ctr"}>
            <Typography variant="subtitle2">{cut.ml} ml</Typography>
            <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>
                {cut.price}lv
            </Typography>
        </Box>
    );
};

export {Cut};
