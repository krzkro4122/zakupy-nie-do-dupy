import type { Identifiable, TimeTracked } from "../types/common";
import { InlineForm } from "./InlineForm";
import { useCallback, useEffect, useRef } from "react";
import { Button } from "./Button";

type NamedItem = (Identifiable & TimeTracked & { name: string });

interface ManagedListProps {
    items: NamedItem[];
    selectedItemIds: string[];
    setSelectedItemIds: React.Dispatch<React.SetStateAction<string[]>>;
    deleteItemAction: (id: string) => Promise<void>;
    updateItemAction: (id: string, formData: FormData) => Promise<void>;
    manageItemsAction: (formData: FormData) => Promise<void>;
}

export const ManagedList = ({ items, updateItemAction, deleteItemAction, selectedItemIds, setSelectedItemIds }: ManagedListProps) => {
    const lastSelectedId = useRef<string>(null);

    const escapeClickFunction = useCallback((event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setSelectedItemIds([]);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", (event) => escapeClickFunction(event), false);
        return () => {
            document.removeEventListener("keydown", (event) => escapeClickFunction(event), false);
        };
    }, [escapeClickFunction]);

    const handleItemSelect = (id: string, event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        event.preventDefault();
        if (event.target === event.currentTarget) {

            if (lastSelectedId.current !== null && event.nativeEvent.shiftKey) {
                const ids = items.map(item => item.id);
                const lastSelectedIdIndex = ids.findIndex((_id) => _id === lastSelectedId.current);
                const clickedIdIndex = ids.findIndex((_id) => _id === id) + 1;
                const start = Math.min(lastSelectedIdIndex, clickedIdIndex - 1);
                const end = Math.max(lastSelectedIdIndex, clickedIdIndex);
                const extraIdsToSelect = ids.slice(start, end);

                setSelectedItemIds(Array.from(new Set([...selectedItemIds, ...extraIdsToSelect])));
                return;
            }

            if (selectedItemIds.includes(id)) {
                lastSelectedId.current = null;
                setSelectedItemIds(selectedItemIds.filter(selectedId => selectedId !== id));
            } else {
                lastSelectedId.current = id;
                setSelectedItemIds([...selectedItemIds, id])
            }

        }
    }

    return (
        <>
            <Button
                displayValue=""
            ></Button>
            <ul className="managed-list">
                {items.map(item => {
                    const isSelected = selectedItemIds.includes(item.id);
                    const classNamePrefix = "managed-list-item";
                    return (<li
                        key={item.id}
                        onClick={(event) => handleItemSelect(item.id, event)}
                        className={`${classNamePrefix} ${isSelected ? classNamePrefix + "-selected" : ""}`}
                    >
                        <InlineForm
                            action={(formData) => updateItemAction(item.id, formData)}
                            initialDisplayValue={item.name}
                            keepInitialValueAsInput={true}
                        />
                        <button type="button" onClick={() => deleteItemAction(item.id)} className="delete-button">X</button>
                    </li>);
                })}
            </ul>
        </>
    )
};
