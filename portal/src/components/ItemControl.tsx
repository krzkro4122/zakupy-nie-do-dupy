import { v4 as uuidv4 } from 'uuid';

import type { Id } from "../types/common"

interface ItemControlProps {
    id: Id;
    child: React.ReactNode;
    onClick: (id: Id) => void;
}

export const ItemControl = ({ id, child, onClick }: ItemControlProps) => {
    return (
        <button type="button" key={uuidv4()} onClick={() => onClick(id)} className="item-control">{child}</button>
    )
}