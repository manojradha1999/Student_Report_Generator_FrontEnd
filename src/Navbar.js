import { NavLink } from "react-router-dom";

function Navbar() {

        // Returns the Nav bar.
        return (
            <div>
                <NavLink to=""> Student / </NavLink>
                <NavLink to="/Subject"> Subject  / </NavLink>
                <NavLink to="/Report"> StudentReport / </NavLink>
                <h1> Student Marks </h1>
            </div>
        );
}
 
export default Navbar ;