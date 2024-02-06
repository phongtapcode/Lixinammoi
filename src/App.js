import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Random from "./pages/Random/Random";
import Edit from "./pages/Edit/Edit";
function App(){
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Random/>}/>
                    <Route path="/edit" element={<Edit/>}/>
                </Routes>
            </div>
        </Router>
    )
}
export default App