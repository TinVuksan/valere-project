import Dropdown from "./Dropdown";

const Navbar = () => {
    return (
        <nav>
            <div className="bg-blue-700">
                <p>This is a navba</p>
                <input type="text" placeholder="Search" />
                <Dropdown />
            </div>
        </nav>
    )
}

export default Navbar;