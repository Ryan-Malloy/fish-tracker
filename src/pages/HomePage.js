import TestComponent from "../components/TestComponent"
import AdminForm from "../components/AdminForm"

const HomePage = () => {

  
  return (
    <div className="container">
        <h1>Home Page</h1>
        <div className="row">
          <div className="col">
            <a href="admin/login">Admin Login</a>
          </div>
          <div className="col">
            <a href="admin/dashboard">Admin Dashboard</a>
          </div>
        </div>

    </div>
  )
}

export default HomePage
