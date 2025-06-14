import { PacmanLoader } from "react-spinners"

import './styles/loadingState.css'

export const LoadingState = () => {
    return (
        <div className="loading-state">
            <PacmanLoader color="#f5f5f5" />
        </div>
    )
}
